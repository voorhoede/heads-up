import use from './use'

// @todo: refactor function to reduce cognitive complexity
// eslint-disable-next-line sonarjs/cognitive-complexity
export default function validateWarningSchema({ schema, key, value, attrs }) {
  const valueTrimmed = (value && value.length) ? value.trim() : value
  let warnings = []

  // Enum
  if (schema[key].enum && schema[key].enum.length && !schema[key].enum.includes(valueTrimmed)) {
    warnings.push({
      message: schema[key].message.enum
    })
  }

  // Length
  if (schema[key]['length'] && valueTrimmed.length > schema[key]['length'].max) {
    warnings.push({
      message: schema[key].message['length'],
    })
  }

  // Descriptive
  if (schema[key]['descriptive-words'] && 
      valueTrimmed.split(' ').length > 0  && 
      valueTrimmed.split(' ').length < schema[key]['descriptive-words']) {
    warnings.push({
      message: schema[key].message['descriptive-words'],
    })
  }

  // Use
  // if use exists and has at least 1 entry
  if (schema[key].use && schema[key].use.length) {
    // loop over items of use in schema
    schema[key].use.forEach(item => {
      // if not true
      if (!use[item](valueTrimmed, attrs)) {
        warnings.push({
          message: schema[key].message.use[item],
        })
      }
    })
  }

  if (warnings.length) {
    return warnings
  }
  return null
}
