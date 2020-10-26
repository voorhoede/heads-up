const cheerio = require('cheerio');
const fetch = require('node-fetch');
const robotsParser = require('robots-txt-parser')({ allowOnNeutral: false });
const xmlJs = require('xml-js');

function elementsToJson(elements) {
  return Array.from(elements).map(element => {
    return Object.keys(element.attribs).reduce((obj, attr) => {
      return { ...obj, [attr]: element.attribs[attr] };
    }, {});
  });
}

async function createHeadResponse(domain, url) {
  const dom = await fetch(url)
    .then(res => res.text())
    .then(dom => {
      const $ = cheerio.load(dom);

      return {
        title: $('head title').text(),
        lang: $('html').attr('lang'),
        link: $('link').get(),
        meta: $('meta').get(),
      };
    });

  return {
    domain: domain,
    url: url,
    title: dom.title,
    lang: dom.lang,
    link: elementsToJson(dom.link),
    meta: elementsToJson(dom.meta),
  };
}

function createSitemapResponse(url) {
  return fetch(url)
    .then(res => res.text())
    .then(text => {
      const json = xmlJs.xml2json(text);

      return xmlJs.json2xml(json, { spaces: 2 });
    })
    .catch(() => null);
}

function createRobotsResponse(domain) {
  return robotsParser.fetch(domain).then(result => {
    if (result.sitemaps) {
      delete result.sitemaps;
    }

    return Object.keys(result).map(key => ({
      name: key,
      ...result[key],
    }));
  });
}

function createSitemapUrlsResponse(domain) {
  return robotsParser.fetch(domain).then(result => {
    if (result.sitemaps) {
      return result.sitemaps;
    }
  });
}

exports.handler = async function(event) {
  const url = event.queryStringParameters.url;
  let body = null;

  if (!url) {
    body = { error: 'No URL provided.' };

    return {
      statusCode: 400,
      body: JSON.stringify(body),
    };
  }

  if (!url.startsWith('http')) {
    body = { error: 'Invalid URL, it should start with \'http\' or \'https\'.' };

    return {
      statusCode: 400,
      body: JSON.stringify(body),
    };
  }

  try {
    let sitemaps = [];
    const domain = new URL(url).origin;
    const urlIsCrawlable = await robotsParser.canCrawl(url);
    const sitemapUrls = await createSitemapUrlsResponse(domain);

    if (sitemapUrls && sitemapUrls.length) {
      const sitemapResponses = await Promise.all(
        sitemapUrls.map(url => createSitemapResponse(url))
      );

      sitemaps = sitemapUrls.map((url, index) => ({
        [url]: sitemapResponses[index],
      }));
    } else {
      sitemaps = await createSitemapResponse(`${ domain }/sitemap.xml`) || [];
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          urlIsCrawlable,
          head: await createHeadResponse(domain, url),
          robots: await createRobotsResponse(url),
          sitemaps,
          sitemapUrls,
        }
      ),
    };
  } catch (error) {
    const statusCode = error.status || 500;
    const body = { error: error.message };

    return {
      statusCode,
      body: JSON.stringify(body),
    };
  }
};
