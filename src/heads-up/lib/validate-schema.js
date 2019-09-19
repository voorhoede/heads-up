import use from './use'

export default function validateSchema({ schema, key, value }) {
  const valueTrimmed = (value && value.length) ? value.trim() : value
  let errors = []

  // Required
  if (schema[key].required && !valueTrimmed) {
    errors.push({
      message: schema[key].message.required,
      key
    })
  }

  if (!value) {
    return errors
  }

  // Enum
  if (schema[key].enum && schema[key].enum.length) {
    if (!schema[key].enum.includes(valueTrimmed)) {
      errors.push({
        message: schema[key].message.enum,
        key
      })
    }
  }

  // Match
  if (schema[key]['match'] && !valueTrimmed.match(schema[key]['match'])) {
    errors.push({
      message: schema[key].message.match,
      key
    })
  }

  // Length
  if (schema[key]['length']) {
    if (!(valueTrimmed.length >= schema[key]['length'].min && valueTrimmed.length <= schema[key]['length'].max)) {
      errors.push({
        message: schema[key].message['length'],
        key
      })
    }
  }

  // Use
  if (schema[key].use && schema[key].use.length) {
    schema[key].use.forEach((item, index) => {
      if (!use[item](valueTrimmed)) {
        errors.push({
          message: schema[key].message.use[index],
          key
        })
      }
    })
  }

  if (errors.length) {
    return errors
  }
  return null
}
