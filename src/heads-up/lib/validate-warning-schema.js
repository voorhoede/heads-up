import use from './use'

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function validateWarningSchema({ schema, key, value, attrs }) {
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

    // Use.js check on warnings
  if (schema[key].warning && schema[key].warning.length) {
    schema[key].warning.forEach(item => {
      if (!use[item](valueTrimmed, attrs)) {
        warnings.push({
          message: schema[key].message.warning[item],
        })
      }
    })
  }

  if (warnings.length) {
    return warnings
  }
  return null
}
