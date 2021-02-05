const validateSchema = (data, schema) => {
  if (!data.length) { return; }
  let errors = null;
  let warnings = null;

  const schemaData = Object.assign({},
    ...data.map(data => ({
      [data.term]: data.value,
    }))
  );

  try {
    const { error, warning } = schema.validate(schemaData);

    if (error) { errors = error.details; }
    if (warning) { warnings = warning.details; }

    return { errors, warnings };
  } catch (errors) {
    console.log(errors);
  }
};

export default validateSchema;
