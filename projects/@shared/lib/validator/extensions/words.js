/**
 * Splits a string into an array of words.
 *
 * @param {*} joi - Extended Joi instance.
 */
const words = joi => ({
  type: 'words',
  base: joi.string(),
  messages: {
    'words.base': '{{#label}} must have at least 1 word',
    'words.minWords': '{{#label}} must be at least {{#words}} words or more.',
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
        const trimmedValue = (value && value.length) ? value.trim() : value;
        const array = trimmedValue.length ? trimmedValue.split(' ') : trimmedValue;

        if (array && array.length > args.words) {
          return array;
        }

        return { value, warn: helpers.warn('words.minWords', { words: args.words }) };
      },
    },
  },
});

export default words;
