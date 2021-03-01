import Joi from '../../lib/validator';

export const schema = Joi.object({
  'og:title': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required according to Facebook\'s developers documentation.',
    }),

  'og:image': Joi.image()
    .maxDimensions(600, 600)
    .required()
    .messages({
      'string.empty': 'This property is required according to Facebook\'s developers documentation.',
    }),

  'og:url': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required according to Facebook\'s developers documentation.',
    }),

  'fb:app_id': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required according to Facebook\'s developers documentation.',
    }),

  'og:description': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required according to Facebook\'s developers documentation.',
    }),

  'fb:pages': Joi.string().allow(''),

  'og:type': Joi.string().allow(''),

  'og:locale': Joi.string().allow(''),

  'og:video': Joi.string().allow(''),

  'og:video:url': Joi.string().allow(''),

  'og:video:secure_url': Joi.string().allow(''),

  'og:video:type': Joi.string().allow(''),

  'og:video:width': Joi.string().allow(''),

  'og:video:height': Joi.string().allow(''),

  'og:image:url': Joi.image()
    .maxDimensions(600, 600)
    .allow(''),

  'og:image:secure_url': Joi.string().allow(''),

  'og:image:type': Joi.string().allow(''),

  'og:image:width': Joi.string().allow(''),

  'og:image:height': Joi.string().allow(''),
});

export const info = {
  'og:title': {
    info: 'The title of your article without any branding such as your site name.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/',
  },

  'og:image': {
    info: 'The URL of the image that appears when someone shares the content to Facebook. Check out Facebook\'s <a target="_blank" href="https://developers.facebook.com/docs/sharing/best-practices#images">best practices guide</a> to learn how to specify a high quality preview image. To update an image after it\'s been published, use a new URL for the new image. <strong>Images are cached based on the URL and won\'t be updated unless the URL changes.</strong>',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/',
  },

  'og:url': {
    info: 'The <a target="_blank" href="https://developers.facebook.com/docs/sharing/webmasters/getting-started/versioned-link">canonical URL</a> for your page. This should be the undecorated URL, without session variables, user identifying parameters, or counters. Likes and Shares for this URL will aggregate at this URL. For example, mobile domain URLs should point to the desktop version of the URL as the canonical URL to aggregate Likes and Shares across different versions of the page.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/',
  },

  'fb:app_id': {
    info: 'In order to use <a target="_blank" href="https://developers.facebook.com/docs/sharing/referral-insights">Facebook Insights</a> you must add the app ID to your page. Insights lets you view analytics for traffic to your site from Facebook. Find the app ID in your <a target="_blank" href="https://developers.facebook.com/apps/redirect/dashboard">App Dashboard</a>.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/',
  },

  'og:description': {
    info: 'A brief description of the content, usually between 2 and 4 sentences. This will displayed below the title of the post on Facebook.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/',
  },

  'og:type': {
    info: 'The type of media of your content. This tag impacts how your content shows up in News Feed. If you don\'t specify a type,the default is <code>website</code>. Each URL should be a single object, so multiple <code>og:type</code> values are not possible.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/',
  },

  'og:locale': {
    info: 'The locale of the resource. Defaults to <code>en_US</code>. You can also use <code>og:locale:alternate</code> if you have other available language translations available.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/',
  },

  'og:video': {
    info: 'The URL for the video. If you want the video to play in-line in News Feed, you should use the https:// URL if possible.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
  },

  'og:video:url': {
    info: 'Equivalent to og:video',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
  },

  'og:video:secure_url': {
    info: 'Secure URL for the video. Include this even if you set the secure URL in og:video.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
  },

  'og:video:type': {
    info: 'MIME type of the video. Either application/x-shockwave-flash or video/mp4.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
  },

  'og:video:width': {
    info: 'Width of video in pixels. This property is required for videos.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
  },

  'og:video:height': {
    info: 'Height of video in pixels. This property is required for videos.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
  },

  'og:image:url': {
    info: 'Equivalent to <code>og:image</code>',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
  },

  'og:image:secure_url': {
    info: '\'https://\' URL for the image',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
  },

  'og:image:type': {
    info: 'MIME type of the image. One of <code>image/jpeg</code>, <code>image/gif</code> or <code>image/png</code>',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
  },

  'og:image:width': {
    info: 'Width of image in pixels. Specify height and width for your image to ensure that the image loads properly the first time it\'s shared.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
  },

  'og:image:height': {
    info: 'Height of image in pixels. Specify height and width for your image to ensure that the image loads properly the first time it\'s shared.',
    link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
  },
};
