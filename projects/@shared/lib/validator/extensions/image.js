/**
 * Validate image sizes and dimensions.
 *
 * @param {*} joi - Extended Joi instance.
 */
const image = joi => ({
  type: 'image',
  base: joi.object(),
  messages: {
    'image.minWidth': 'The <strong><code>{#label}</code></strong> must be at least <strong>{#width}</strong>px wide.',
    'image.maxWidth': 'The <strong><code>{#label}</code></strong> can\'t be wider than <strong>{#width}</strong>px.',
    'image.minHeight': 'The <strong><code>{#label}</code></strong> must be at least <strong>{#height}</strong>px high.',
    'image.maxHeight': 'The <strong><code>{#label}</code></strong> can\'t be higher than <strong>{#height}</strong>.',
    'image.minDimensions': 'The <strong><code>{#label}</code></strong> can\'t be smaller than <strong>{#width}x{#height}</strong>px.',
    'image.maxDimensions': 'The <strong><code>{#label}</code></strong> can\'t be bigger than <strong>{#width}x{#height}</strong>px.',
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
        if (value?.width < args.width) {
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
        if (value?.width < args.width) {
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
        if (value?.height < args.height) {
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
        console.log(value);
        if (value?.height > args.height) {
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
