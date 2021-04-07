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
    'image.invalidExtension': 'The <strong><code>{#label}</code></strong> {#value.size} type must be one of the following: <strong><code>{#validExtensions}</code></strong>.',
    'image.invalidAspectRatio': 'The <strong><code>{#label}</code></strong> will be cropped as its ratio of <strong><code>{#aspectRatio}</code></strong> does not match the required ratio of <strong><code>{#validAspectRatio}</code></strong>.',
    'image.maxFileSize': 'The file size of <strong><code>{#label}</code></strong> exceeds the maximum of <strong><code>{#maxFileSize}</code></strong>.',
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
          return helpers.error('image.minWidth', { width: args.width });
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
          return helpers.error('image.maxWidth', { width: args.width });
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
          return helpers.error('image.minHeight', { height: args.height });
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
          return helpers.error('image.maxHeight', { height: args.height });
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
          return helpers.error('image.minDimensions', { width: args.width, height: args.height });
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
          return helpers.error('image.maxDimensions', { width: args.width, height: args.height });
        }

        return value;
      },
    },
    validExtensions: {
      method(extensions) {
        return this.$_addRule({ name: 'validExtensions', args: { extensions } });
      },
      args: [
        {
          name: 'extensions',
          ref: true,
          assert: value => Array.isArray(value) && value?.length > 0,
          message: 'must be an array',
        },
      ],
      validate(value, helpers, args) {
        if (
          value?.url &&
          !args.extensions.some(suffix =>
            value.url.toLowerCase().split('?')[0].endsWith(suffix)
          )
        ) {
          return helpers.error('image.invalidExtension', {
            validExtensions: args.extensions,
          });
        }

        return value;
      },
    },
    aspectRatio: {
      method(aspectRatio) {
        return this.$_addRule({ name: 'aspectRatio', args: { aspectRatio } });
      },
      args: [
        {
          name: 'aspectRatio',
          ref: true,
          assert: value => typeof value === 'string' && /^\d+:\d+$/.test(value),
          message: 'must be a valid string, e.g. "width:height",',
        },
      ],
      validate(value, helpers, args) {
        // See: https://en.wikipedia.org/wiki/Greatest_common_divisor.
        const greatestCommonDivisor = (a, b) => {
          return b ? greatestCommonDivisor(b, a % b) : a;
        };

        const getAspectRatio = (width, height)  => {
          if (isNaN(width) || isNaN(height)) return undefined;

          const divisor = greatestCommonDivisor(width, height);

          return `${ width / divisor }:${ height / divisor }`;
        };

        const aspectRatio = getAspectRatio(value?.width, value?.height);

        if (
          value?.width &&
          value?.height &&
          aspectRatio !== args.aspectRatio
        ) {
          return helpers.warn('image.invalidAspectRatio', {
            validAspectRatio: args.aspectRatio,
            aspectRatio,
          });
        }

        return value;
      },
    },
    maxFileSize: {
      method(maxFileSize) {
        return this.$_addRule({ name: 'maxFileSize', args: { maxFileSize } });
      },
      args: [
        {
          name: 'maxFileSize',
          ref: true,
          assert: value => typeof value === 'number' && !isNaN(value),
          message: 'must be a number',
        },
      ],
      validate(value, helpers, args) {
        if (value?.size > args.maxFileSize) {
          const sizeInKilobytes = args.maxFileSize / 1000;
          const sizeInMegabytes = args.maxFileSize / 1e+6;

          return helpers.error('image.maxFileSize', {
            maxFileSize:
              sizeInMegabytes < 1
                ? `${ Math.ceil(sizeInKilobytes) }kb`
                : `${ sizeInMegabytes.toFixed(2) }mb`,
          });
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
