const { parse } = require('tldts');
const fetch = require('node-fetch');
const robotsParser = require('robots-txt-parser')({ allowOnNeutral: false });
const scrape = require('html-metadata');
const xmlJs = require('xml-js');

exports.handler = async function(event) {
  const url = event.queryStringParameters.url;
  let body = null;

  if (!url) {
    body = { error: 'No URL provided.' }

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
    const { domain } = parse(url);
    const options = { url, headers: { 'User-Agent': 'webscraper' } };
    const metadata = await scrape(options);

    const urlIsCrawlable = await robotsParser.canCrawl(url);
    const robotsTxt = await robotsParser.fetch(domain).then(result => {
      if (result.sitemaps) {
        delete result.sitemaps;
      }

      return Object.keys(result).map(key => ({
        name: key,
        ...result[key]
      }));
    });

    const sitemap = await fetch(`https://${domain}/sitemap.xml`)
      .then(res => res.text())
      .then(text => {
        const json = xmlJs.xml2json(text);
        // Convert to JSON first to set a fixed indentation
        // even if source code was minified.
        return xmlJs.json2xml(json, { spaces: 2 });
      })
      .catch(() => null);

    return {
      statusCode: 200,
      body: JSON.stringify({
        urlIsCrawlable,
        head: metadata,
        robots: robotsTxt,
        sitemap,
      }),
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
