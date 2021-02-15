import validateCountryCodes from '../../country-codes';

/**
 * Checks if a string is a valid country code.
 *
 * @param {*} joi - Extended Joi instance.
 */
const language = joi => ({
  type: 'language',
  base: joi.string(),
  messages: {
    'language.base': 'The {{#label}} value should meet the bcp47 standards.',
  },
  coerce(value) {
    if (value) {
      return { value: value.trim() };
    }
  },
  validate(value, helpers) {
    if (!validateCountryCodes().includes(value)) {
      return { value, errors: helpers.error('language.base') };
    }
  },
});

export default language;
