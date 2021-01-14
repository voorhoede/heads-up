const cheerio = require('cheerio');
const fetch = require('node-fetch');
const robotsParser = require('robots-txt-parser')({ allowOnNeutral: false });
const sitemap = require('./sitemap');
const WAE = require('web-auto-extractor').default;

const fetchDom = url => fetch(url).then(res => res.text());

function elementsToJson(elements) {
  return Array.from(elements).map(element => {
    return Object.keys(element.attribs).reduce((obj, attr) => {
      return { ...obj, [attr]: element.attribs[attr] };
    }, {});
  });
}

function createHeadResponse(domain, url, dom) {
  const $ = cheerio.load(dom);

  return {
    domain: domain,
    url: url,
    title: $('head title').text(),
    lang: $('html').attr('lang'),
    link: elementsToJson($('link').get()),
    meta: elementsToJson($('meta').get()),
  };
}

function createStructuredDataResponse(dom) {
  const { metatags, ...structuredData } = new WAE().parse(dom);
  return structuredData;
}

function createRobotsResponse(url) {
  return robotsParser.fetch(url).then(result => {
    if (result.sitemaps) {
      delete result.sitemaps;
    }

    return Object.keys(result).map(key => ({
      name: key,
      ...result[key],
    }));
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
    const dom = await fetchDom(url);
    const domain = new URL(url).origin;
    const sitemapData = await sitemap(domain);
    const urlIsCrawlable = await robotsParser.canCrawl(url);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          urlIsCrawlable,
          head: createHeadResponse(domain, url, dom),
          structuredData: createStructuredDataResponse(dom),
          robots: await createRobotsResponse(url),
          ...sitemapData,
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
