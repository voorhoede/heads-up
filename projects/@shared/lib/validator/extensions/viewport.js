const viewportContentCheck = {
  'width': /(^[1-9][0-9]*$)|(^device-width$)/,
  'height': /(^[1-9][0-9]*$)|(^device-height$)/,
  'initial-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
  'maximum-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
  'minimum-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
  'user-scalable': /(yes|no)/,
  'viewport-fit': /(auto|contain|cover)/,
};

const ZOOM_BLOCKING_ATTRIBUTES = [
  'maximum-scale',
  'minimum-scale',
  'user-scalable',
];

function hasValidViewportContent(value) {
  const arrayOfValues = value.replace(' ', '').split(',');

  return arrayOfValues.every(entry => {
    const [ entryKey, entryValue ] = entry.split('=');
    return entryKey in viewportContentCheck && viewportContentCheck[entryKey].test(entryValue);
  });
}

function hasValidViewportKeys(value) {
  const arrayOfValues = value.replace(' ', '').split(',');
  const validViewportKeys = Object.keys(viewportContentCheck);

  return arrayOfValues.every(entry => {
    const entryKey = entry.split('=')[0];
    return validViewportKeys.includes(entryKey);
  });
}

function hasZoomBlockingViewportContent(value) {
  const arrayOfValues = value.replace(' ', '').split(',');

  return arrayOfValues.some(entry => {
    const entryKey = entry.split('=')[0];
    return ZOOM_BLOCKING_ATTRIBUTES.includes(entryKey);
  });
}

/**
 * Checks if a string contains valid viewport settings for size and scale.
 *
 * @param {*} joi - Extended Joi instance.
 */
const viewport = joi => ({
  type: 'viewport',
  base: joi.string(),
  messages: {
    'viewport.content': 'The content of the viewport meta tag is invalid.',
    'viewport.keys': 'The keys of the viewport meta tag are invalid.',
    'viewport.zoomBlocking': 'The <code>user-scalable</code>, <code>maximum-scale</code>, and <code>minimum-scale</code> can block the user from zooming an a page.',
  },
  validate(value, helpers) {
    if (!hasValidViewportKeys(value)) {
      return helpers.error('viewport.keys');
    }

    if (!hasValidViewportContent(value)) {
      return { value, warnings: helpers.warn('viewport.content') };
    }

    if (hasZoomBlockingViewportContent(value)) {
      return { value, warnings: helpers.warn('viewport.zoomBlocking') };
    }

    return value;
  },
});

export default viewport;
