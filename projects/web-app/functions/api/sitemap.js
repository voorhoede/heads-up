const fetch = require('node-fetch');
const xml2js = require('xml2js');
const robotsParser = require('robots-txt-parser')({ allowOnNeutral: false });

const isXml = url => /.xml$/.test(url);
const objectMap = (obj, fn) => Object.fromEntries(
  Object.entries(obj).map(
    ([ k, v ], i) => [ k, fn(v, k, i) ]
  )
);

function formatSitemapData(data) {
  return data.map(item => {
    const { loc, ...data } = item;

    if (Object.keys(item).length === 1 && Object.keys(item)[0] === 'loc') {
      return loc;
    }

    return { loc, data };
  });
}

async function createSitemapResponse(url) {
  let content = await fetch(url)
    .then(res => res.text())
    .catch(() => null);

  if (isXml(url)) {
    content = await xml2js.parseStringPromise(content, {
      emptyTag: null,
      explicitArray: false,
      explicitRoot: false,
      ignoreAttrs: true,
      normalizeTags: true,
      trim: true,
    });
  }

  return content;
}

function createSitemapUrlsResponse(domain) {
  return robotsParser.fetch(domain).then(result => {
    if (result.sitemaps) {
      return result.sitemaps;
    }
  });
}

module.exports = async function sitemap(domain) {
  let sitemaps = [];
  const sitemapUrls = await createSitemapUrlsResponse(domain);

  if (sitemapUrls && sitemapUrls.length) {
    const sitemapResponses = await Promise.all(
      sitemapUrls.map(url => createSitemapResponse(url))
    );

    sitemaps = sitemapUrls.map((url, index) => {
      const sitemapResponse = sitemapResponses[index];

      if (!sitemapResponse) {
        return {
          sitemapData: null,
          sitemapUrl: url,
        };
      }

      return {
        sitemapData: objectMap(sitemapResponse, v => formatSitemapData(v)),
        sitemapUrl: url,
      };
    });
  }

  return {
    sitemaps,
    sitemapUrls,
  };
};
