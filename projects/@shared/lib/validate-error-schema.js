import uniqueSchemaValidations from './unique-schema-validations';

// @todo: refactor function to reduce cognitive complexity
// eslint-disable-next-line sonarjs/cognitive-complexity
export default function validateSchema({ schema, key, value, attrs }) {
  const valueTrimmed = (value && value.length) ? value.trim() : value;
  let errors = [];

  // Skip if key is not present in schema.
  if (!schema[key]) {
    return;
  }

  // Required
  if (schema[key].required && !valueTrimmed) {
    errors.push({
      message: schema[key].message.required,
    });
  }

  // Enum
  // @todo: remove this when error- and warning validations are working
  if (schema[key].enum && schema[key].enum.length && !schema[key].enum.includes(valueTrimmed)) {
    errors.push({
      message: schema[key].message.enum,
    });
  }

  // Match
  if (schema[key]['match'] && !valueTrimmed.match(schema[key]['match'])) {
    errors.push({
      message: schema[key].message.match,
    });
  }

  // Length
  if (schema[key]['length'] && valueTrimmed.length > schema[key]['length'].max) {
    errors.push({
      message: schema[key].message['length'],
      length: valueTrimmed.length - schema[key]['length'].max,
    });
  }

  // unique-schema-validations.js check on errors
  if (schema[key].error && schema[key].error.length) {
    schema[key].error.forEach(item => {
      if (!uniqueSchemaValidations[item](valueTrimmed, attrs)) {
        errors.push({
          message: schema[key].message.error[item],
        });
      }
    });
  }

  if (errors.length) {
    return errors;
  }

  return null;
}
