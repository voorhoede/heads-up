const scrape = require('html-metadata')

exports.handler = async function(event) {
  const url = event.queryStringParameters.url

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        { statusCode: 400, error: 'No URL provided.' },
        null,
        2
      )
    }
  }

  if (!url.startsWith('http') || !url.startsWith('https')) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        { statusCode: 400, error: "Invalid URL, it should start with 'http' or 'https'." },
        null,
        2
      )
    }
  }

  try {
    const options = {
      url,
      headers: { 'User-Agent': 'webscraper' }
    }

    const metadata = await scrape(options)

    return {
      statusCode: 200,
      body: JSON.stringify({ ...metadata }, null, 2)
    }
  } catch (error) {
    const statusCode = error.status || 500

    return {
      statusCode,
      body: JSON.stringify(
        { statusCode, error: error.message },
        null,
        2
      )
    }
  }
}
