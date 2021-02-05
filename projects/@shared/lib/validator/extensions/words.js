/**
 * Splits a string into an array of words.
 *
 * @param {*} joi - Extended Joi instance.
 */
const words = joi => ({
  type: 'words',
  base: joi.array(),
  messages: {
    'words.base': '{{#label}} must have at least 1 value',
    'words.minWords': '{{#label}} must be at least {{#words}} words or more.',
  },
  coerce(value) {
    const trimmedValue = (value && value.length) ? value.trim() : value;
    return { value: trimmedValue.length ? trimmedValue.split(' ') : trimmedValue };
  },
  validate(value, helpers) {
    // Base validation regardless of the rules applied.
    if (value && value.length <= 1) {
      return { value, errors: helpers.error('words.base') };
    }
  },
  rules: {
    minWords: {
      alias: 'min',
      method(words) {
        return this.$_addRule({ name: 'minWords', args: { words } });
      },
      args: [
        {
          name: 'words',
          ref: true,
          assert: value => typeof value === 'number' && !isNaN(value),
          message: 'must be a number',
        },
      ],
      validate(value, helpers, args) {
        if (value && value.length < args.words) {
          return helpers.warn('words.minWords', { words: args.words });
        }
      },
    },
  },
});

export default words;
