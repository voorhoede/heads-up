/**
 * Validate image sizes and dimensions.
 *
 * @param {*} joi - Extended Joi instance.
 */
const image = joi => ({
  type: 'image',
  base: joi.object(),
  messages: {
    'image.minWidth': '{{#label}} must be at least {{#width}}px wide.',
    'image.maxWidth': '{{#label}} must be no more than {{#width}}px wide.',
    'image.minHeight': '{{#label}} must be at least {{#height}}px high.',
    'image.maxHeight': '{{#label}} must be no more than {{#height}}px high.',
    'image.minDimensions': '{{#label}} should avoid images smaller than {{#width}}x{{#height}} or less.',
    'image.maxDimensions': '{{#label}} should avoid images larger than {{#width}}x{{#height}} or more.',
  },
  rules: {
    minWidth: {
      method(width) {
        return this.$_addRule({ name: 'minWidth', args: { width } });
      },
      args: [
        {
          name: 'width',
          ref: true,
          assert: value => typeof value === 'number' && !isNaN(value),
          message: 'must be a number',
        },
      ],
      validate(value, helpers, args) {
        if (value?.width && value.width < args.width) {
          return { value, warn: helpers.warn('image.minWidth', { width: args.width }) };
        }

        return value;
      },
    },
    maxWidth: {
      method(width) {
        return this.$_addRule({ name: 'maxWidth', args: { width } });
      },
      args: [
        {
          name: 'width',
          ref: true,
          assert: value => typeof value === 'number' && !isNaN(value),
          message: 'must be a number',
        },
      ],
      validate(value, helpers, args) {
        if (value?.width && value.width > args.width) {
          return { value, warn: helpers.warn('image.maxWidth', { width: args.width }) };
        }

        return value;
      },
    },
    minHeight: {
      method(height) {
        return this.$_addRule({ name: 'minHeight', args: { height } });
      },
      args: [
        {
          name: 'height',
          ref: true,
          assert: value => typeof value === 'number' && !isNaN(value),
          message: 'must be a number',
        },
      ],
      validate(value, helpers, args) {
        if (value?.height && value.height < args.height) {
          return { value, warn: helpers.warn('image.minHeight', { height: args.height }) };
        }

        return value;
      },
    },
    maxHeight: {
      method(height) {
        return this.$_addRule({ name: 'maxHeight', args: { height } });
      },
      args: [
        {
          name: 'height',
          ref: true,
          assert: value => typeof value === 'number' && !isNaN(value),
          message: 'must be a number',
        },
      ],
      validate(value, helpers, args) {
        if (value?.height && value.height > args.height) {
          return { value, warn: helpers.warn('image.maxHeight', { height: args.height }) };
        }

        return value;
      },
    },
    minDimensions: {
      method(width, height) {
        return this.$_addRule({ name: 'minDimensions', args: { width, height } });
      },
      args: [
        {
          name: 'width',
          ref: true,
          assert: value => typeof value === 'number' && !isNaN(value),
          message: 'must be a number',
        },
        {
          name: 'height',
          ref: true,
          assert: value => typeof value === 'number' && !isNaN(value),
          message: 'must be a number',
        },
      ],
      validate(value, helpers, args) {
        if (value?.height && value?.width && (value.height < args.height || value.width < args.width)) {
          return { value, warn: helpers.warn('image.minDimensions', { width: args.width, height: args.height }) };
        }

        return value;
      },
    },
    maxDimensions: {
      method(width, height) {
        return this.$_addRule({ name: 'maxDimensions', args: { width, height } });
      },
      args: [
        {
          name: 'width',
          ref: true,
          assert: value => typeof value === 'number' && !isNaN(value),
          message: 'must be a number',
        },
        {
          name: 'height',
          ref: true,
          assert: value => typeof value === 'number' && !isNaN(value),
          message: 'must be a number',
        },
      ],
      validate(value, helpers, args) {
        if (value?.height && value?.width && (value.height > args.height || value.width > args.width)) {
          return { value, warn: helpers.warn('image.maxDimensions', { width: args.width, height: args.height }) };
        }

        return value;
      },
    },
    isRequired: {
      alias: 'required',
      method() {
        return this.$_addRule({ name: 'isRequired' });
      },
      validate(value, helpers) {
        if (!value?.height && !value?.width && helpers.schema.$_getRule('isRequired')) {
          return helpers.error('any.required');
        }

        return value;
      },
    },
  },
});

export default image;
