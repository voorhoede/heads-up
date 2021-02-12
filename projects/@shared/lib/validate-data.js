// Docs: https://joi.dev/api/?v=17.4.0#anyvalidatevalue-options
const JOI_VALIDATION_OPTIONS = {
  abortEarly: false,
  convert: false,
};

const validateData = (data, schema) => {
  if (!data.length) { return; }

  // Convert incoming data into schema data object.
  const schemaData = Object.assign({},
    ...data.map(data => ({
      [data.term]: data.value,
    }))
  );

  try {
    // Docs: https://joi.dev/api/?v=17.4.0#anyvalidate
    const { error, warning } = schema.validate(schemaData, JOI_VALIDATION_OPTIONS);
    let errors = null;
    let warnings = null;

    if (error) { errors = error.details; }
    if (warning) { warnings = warning.details; }

    // Return any errors and warnings.
    return { errors, warnings };
  } catch (errors) {
    console.log(errors);
  }
};

export default validateData;
