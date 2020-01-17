import use from './use'

// @todo: refactor function to reduce cognitive complexity
// eslint-disable-next-line sonarjs/cognitive-complexity
export default function validateSchema({ schema, key, value, attrs }) {
  const valueTrimmed = (value && value.length) ? value.trim() : value
  let errors = []

  // Required
  if (schema[key].required && !valueTrimmed) {
    errors.push({
      message: schema[key].message.required
    })
  }

  if (!value && !schema[key].required) {
    return null
  }

  // Enum
  if (schema[key].enum && schema[key].enum.length && !schema[key].enum.includes(valueTrimmed)) {
    errors.push({
      message: schema[key].message.enum
    })
  }

  // Match
  if (schema[key]['match'] && !valueTrimmed.match(schema[key]['match'])) {
    errors.push({
      message: schema[key].message.match,
    })
  }

  // Length
  if (schema[key]['length'] && valueTrimmed.length > schema[key]['length'].max) {
    errors.push({
      message: schema[key].message['length'],
      length: valueTrimmed.length - schema[key]['length'].max
    })
  }

  // Use
  if (schema[key].use && schema[key].use.length) {
    schema[key].use.forEach(item => {
      if (!use[item](valueTrimmed, attrs)) {
        errors.push({
          message: schema[key].message.use[item],
        })
      }
    })
  }

  if (errors.length) {
    return errors
  }
  return null
}
