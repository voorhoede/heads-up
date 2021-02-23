import getImageDimensions from './get-image-dimensions';

// Docs: https://joi.dev/api/?v=17.4.0#anyvalidatevalue-options
const JOI_VALIDATION_OPTIONS = {
  abortEarly: false,
  convert: false,
};

/**
 * Transforms the data array into an object that Joi can validate.
 *
 * @param {Array} data
 */
const transformData = data => {
  const array = data
    .map(async item => {
      const { type, image } = item;
      if (type === 'image') {
        /* Because Joi Extensions cannot be async (yet): https://github.com/sideway/joi/issues/1194)
        we get the image dimensions here and add them to the data that wil be validated.
        ¯\_(ツ)_/¯ */
        const { width, height } = await getImageDimensions(image.url);

        return {
          ...item,
          value: { url: image.url, width, height },
        };
      }

      return item;
    });

  return Promise.all(array)
    .then(array => array.map(item => ({ [item.term]: item.value })))
    .then(array => (Object.assign({}, ...array)));
};

/**
 * Validate data with given schema and return the results.
 *
 * @param {Object} data
 * @param {Object} schema
 */
const validateDataWithSchema = (data, schema) => {
  try {
    // Docs: https://joi.dev/api/?v=17.4.0#anyvalidate
    const { error, warning } = schema.validate(data, JOI_VALIDATION_OPTIONS);
    // Return any errors and warnings.
    return { errors: error?.details, warnings: warning?.details };
  } catch (err) {
    return { errors: err };
  }
};

const validate = (data, schema) => {
  if (!data.length) {
    return { errors: 'No data to validate' };
  }

  return transformData(data)
    .then(data => validateDataWithSchema(data, schema))
    .catch(err => console.log(err));
};

export default validate;
