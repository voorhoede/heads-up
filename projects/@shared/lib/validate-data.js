// Docs: https://joi.dev/api/?v=17.4.0#anyvalidatevalue-options
const JOI_VALIDATION_OPTIONS = {
  abortEarly: false,
  convert: false,
};

const validateSchema = (data, schema) => {
  if (!data.length) { return; }
  let errors = null;
  let warnings = null;

  // Convert incoming data into schema data object.
  const schemaData = Object.assign({},
    ...data.map(data => ({
      [data.term]: data.value,
    }))
  );

  try {
    // Docs: https://joi.dev/api/?v=17.4.0#anyvalidate
    console.log(schema.validate(schemaData, JOI_VALIDATION_OPTIONS));
    const { error, warning } = schema.validate(schemaData, JOI_VALIDATION_OPTIONS);

    if (error) { errors = error.details; }
    if (warning) { warnings = warning.details; }

    // Return any errors and warnings.
    return { errors, warnings };
  } catch (errors) {
    console.log(errors);
  }
};

export default validateSchema;
