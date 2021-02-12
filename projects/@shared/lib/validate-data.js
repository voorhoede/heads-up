// Docs: https://joi.dev/api/?v=17.4.0#anyvalidatevalue-options
const JOI_VALIDATION_OPTIONS = {
  abortEarly: false,
  convert: false,
};

const validateData = (data, schema) => {
  if (!data.length) {
    return { errors: 'No data to validate' };
  }

  // Convert incoming data into schema data object.
  const schemaData = Object.assign({},
    ...data.map(data => ({
      [data.term]: data.value,
    }))
  );

  try {
    // Docs: https://joi.dev/api/?v=17.4.0#anyvalidate
    const { error, warning } = schema.validate(schemaData, JOI_VALIDATION_OPTIONS);
    // Return any errors and warnings.
    return { errors: error?.details, warnings: warning?.details };
  } catch (err) {
    console.log(err);
    return { errors: err };
  }
};

export default validateData;
