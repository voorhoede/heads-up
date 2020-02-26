// import use from './use'

// @todo: refactor function to reduce cognitive complexity
// eslint-disable-next-line sonarjs/cognitive-complexity
export default function validateErrorSchema({ schema, key, value }) {
  const valueTrimmed = (value && value.length) ? value.trim() : value
  let errors = []

  // Required
  if (schema[key].required && !valueTrimmed) {
    errors.push({
      message: schema[key].message.required
    })
  }

  // Value
  if (!value && !schema[key].required) {
    return null
  }

  if (errors.length) {
    return errors
  }
  return null
}
