// source: https://developers.google.com/search/docs/advanced/crawling/special-tags
const DEFAULT_ROBOT_VALUES = [ 'index', 'follow' ];
const VALID_GOOGLE_SETTINGS = [ 'nositelinkssearchbox', 'notranslate', 'nopagereadaloud' ];
const VALID_ROBOT_VALUES = [
  'all',
  'follow',
  'index',
  'max-image-preview',
  'max-snippet',
  'max-video-preview',
  'noarchive',
  'nocache',
  'nofollow',
  'noimageindex',
  'noindex',
  'none',
  'noodp',
  'noodyp',
  'nosnippet',
  'noydir',
  'unavailable_after',
];

function hasValidGoogleSettings(value) {
  return VALID_GOOGLE_SETTINGS.includes(value);
}

function hasValidRobotValues(value) {
  const arrayOfValues = value.replace(/ /g, '').split(',');

  return arrayOfValues.every(value => {
    return VALID_ROBOT_VALUES.includes(value);
  });
}

function hasDefaultRobotValues(value) {
  const arrayOfValues = value.replace(/ /g, '').split(',');

  return arrayOfValues.some(value => {
    return DEFAULT_ROBOT_VALUES.includes(value);
  });
}

/**
 * Search, crawling and advanced SEO related validation.
 *
 * @param {*} joi - Extended Joi instance.
 */
const search = joi => ({
  type: 'search',
  base: joi.string(),
  messages: {
    'search.invalidSetting': 'This is not a valid tag value that Google understands.',
    'search.invalidRobots': 'One or more values are not valid to control the behavior of search engine crawling and indexing.',
    'search.defaultRobots': '"index" and "follow" are default values and don\'t need to be specified.',
  },
  rules: {
    robots: {
      method() {
        return this.$_addRule({ name: 'robots' });
      },
      validate(value, helpers) {
        if (!hasValidRobotValues(value)) {
          return helpers.error('search.invalidRobots');
        }

        if (hasDefaultRobotValues(value)) {
          return { value, warn: helpers.warn('search.defaultRobots') };
        }

        return value;
      },
    },
    googleSetting: {
      method() {
        return this.$_addRule({ name: 'googleSetting' });
      },
      validate(value, helpers) {
        if (!hasValidGoogleSettings(value)) {
          return helpers.error('search.invalidSetting');
        }

        return value;
      },
    },
  },
});

export default search;
