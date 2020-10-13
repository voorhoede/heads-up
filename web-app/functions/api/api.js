exports.handler = async function(event) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'Hi.' }, null, 2)
    }
  } catch (error) {
    console.log(error)

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }, null, 2)
    }
  }
}
