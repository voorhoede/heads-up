const scrape = require('html-metadata');

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
    const options = {
      url,
      headers: { 'User-Agent': 'webscraper' },
    };
    const metadata = await scrape(options);

    return {
      statusCode: 200,
      body: JSON.stringify(metadata),
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
