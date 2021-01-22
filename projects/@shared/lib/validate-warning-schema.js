import uniqueSchemaValidations from './unique-schema-validations';
import getImageDimensions from './get-image-dimensions';

export default async function validateWarningSchema({ schema, key, value, attrs }) {
  const valueTrimmed = (value && value.length) ? value.trim() : value;
  let warnings = [];

  // Skip if key is not present in schema.
  if (!schema[key]) {
    return;
  }

  // Descriptive
  if (schema[key]['descriptive-words'] &&
      valueTrimmed.split(' ').length > 0 &&
      valueTrimmed.split(' ').length < schema[key]['descriptive-words']) {
    warnings.push({
      message: schema[key].message['descriptive-words'],
    });
  }

  // Max characters
  if (schema[key]['max-characters'] &&
      valueTrimmed.length > schema[key]['max-characters']) {
    warnings.push({
      message: schema[key].message['max-characters'],
    });
  }

  // Image sizing
  if (schema[key]['image-min-size'] || schema[key]['image-max-size']) {
    await getImageDimensions(valueTrimmed)
      .then(({ width, height }) => {
        if (
          schema[key]['image-min-size'] &&
          (width < schema[key]['image-min-size'].width ||
          height < schema[key]['image-min-size'].height)
        ) {
          warnings.push({
            message: schema[key].message['image-min-size'],
          });
        }

        if (
          schema[key]['image-max-size'] &&
          (width > schema[key]['image-max-size'].width ||
          height > schema[key]['image-max-size'].height)
        ) {
          warnings.push({
            message: schema[key].message['image-max-size'],
          });
        }
      });
  }

  // unique-schema-validations.js check on warnings
  if (schema[key].warning && schema[key].warning.length) {
    schema[key].warning.forEach(item => {
      if (!uniqueSchemaValidations[item](valueTrimmed, attrs)) {
        warnings.push({
          message: schema[key].message.warning[item],
        });
      }
    });
  }

  if (warnings.length) {
    return warnings;
  }

  return null;
}
