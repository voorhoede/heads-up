import use from './use'

export default function validateSchema({ schema, key, value, head }) {
  let errors = []

  if (schema[key].required && !value) {
    errors.push({
      message: schema[key].message.required,
      key
    })
  }

  if (!value) {
    return errors
  }

  if (schema[key].use && schema[key].use.length) {
    schema[key].use.forEach((item, index) => {
      if (!use[item](value)) {
        errors.push({
          message: schema[key].message.use[index],
          key
        })
      }
    })
  }

  if (errors.length > 0) {
    return errors
  }
  return null
}
