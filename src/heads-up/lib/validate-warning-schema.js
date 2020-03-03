// eslint-disable-next-line sonarjs/cognitive-complexity
export default function validateWarningSchema({ schema, key, value }) {
  const valueTrimmed = (value && value.length) ? value.trim() : value
  let warnings = []

  // Descriptive
  if (schema[key]['descriptive-words'] && 
      valueTrimmed.split(' ').length > 0  && 
      valueTrimmed.split(' ').length < schema[key]['descriptive-words']) {
    warnings.push({
      message: schema[key].message['descriptive-words'],
    })
  }

  if (warnings.length) {
    return warnings
  }
  return null
}
