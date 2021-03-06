import countryCodes from '../../country-codes';

/**
 * Checks if a string is a valid country code.
 *
 * @param {*} joi - Extended Joi instance.
 */
const language = joi => ({
  type: 'language',
  base: joi.string(),
  messages: {
    'language.countryCode': 'The {{#label}} value should meet the bcp47 standards.',
  },
  rules: {
    countryCode: {
      method() {
        return this.$_addRule({ name: 'countryCode' });
      },
      validate(value, helpers) {
        const validCode = countryCodes.includes(value);
        if (!validCode) {
          return helpers.error('language.countryCode');
        }

        return value;
      },
    },
  },
});

export default language;
