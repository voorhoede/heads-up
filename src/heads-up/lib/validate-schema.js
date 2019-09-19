import use from './use'

export default function validateSchema({ schema, key, value, head }) {
  const valueTrimmed = value.length ? value.trim() : value
  let errors = []

  if (schema[key].required && !valueTrimmed) {
    errors.push({
      message: schema[key].message.required,
      key
    })
  }

  if (!value) {
    return errors
  }

  if (schema[key].enum && schema[key].enum.length) {
    if (!schema[key].enum.includes(valueTrimmed)) {
      errors.push({
        message: schema[key].message.enum,
        key
      })
    }
  }

  if (schema[key]['length']) {
    if (!(valueTrimmed.length >= schema[key]['length'].min && valueTrimmed.length <= schema[key]['length'].max)) {
      errors.push({
        message: schema[key].message['length'],
        key
      })
    }
  }

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
