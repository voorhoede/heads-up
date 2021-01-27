const facebookSchema = {
  'og:title': {
    required: true,
    message: {
      required: 'This property is required according to Facebook\'s developers documentation.',
    },
    meta: {
      info: 'The title of your article without any branding such as your site name.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/',
    },
  },

  'og:image': {
    required: true,
    message: {
      required: 'This property is required according to Facebook\'s developers documentation.',
      'image-min-size': 'Avoid images smaller than 600x600 or less.',
    },
    'image-min-size': {
      height: 600,
      width: 600,
    },
    meta: {
      info: 'The URL of the image that appears when someone shares the content to Facebook. Check out Facebook\'s <a target="_blank" href="https://developers.facebook.com/docs/sharing/best-practices#images">best practices guide</a> to learn how to specify a high quality preview image. To update an image after it\'s been published, use a new URL for the new image. <strong>Images are cached based on the URL and won\'t be updated unless the URL changes.</strong>',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/',
    },
  },

  'og:url': {
    required: true,
    message: {
      required: 'This property is required according to Facebook\'s developers documentation.',
    },
    meta: {
      info: 'The <a target="_blank" href="https://developers.facebook.com/docs/sharing/webmasters/getting-started/versioned-link">canonical URL</a> for your page. This should be the undecorated URL, without session variables, user identifying parameters, or counters. Likes and Shares for this URL will aggregate at this URL. For example, mobile domain URLs should point to the desktop version of the URL as the canonical URL to aggregate Likes and Shares across different versions of the page.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/',
    },
  },

  'fb:app_id': {
    required: true,
    message: {
      required: 'This property is required according to Facebook\'s developers documentation.',
    },
    meta: {
      info: 'In order to use <a target="_blank" href="https://developers.facebook.com/docs/sharing/referral-insights">Facebook Insights</a> you must add the app ID to your page. Insights lets you view analytics for traffic to your site from Facebook. Find the app ID in your <a target="_blank" href="https://developers.facebook.com/apps/redirect/dashboard">App Dashboard</a>.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/',
    },
  },

  'og:description': {
    required: true,
    message: {
      required: 'This property is required according to Facebook\'s developers documentation.',
    },
    meta: {
      info: 'A brief description of the content, usually between 2 and 4 sentences. This will displayed below the title of the post on Facebook.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/',
    },
  },

  'og:type': {
    meta: {
      info: 'The type of media of your content. This tag impacts how your content shows up in News Feed. If you don\'t specify a type,the default is <code>website</code>. Each URL should be a single object, so multiple <code>og:type</code> values are not possible.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/',
    },
  },

  'og:locale': {
    meta: {
      info: 'The locale of the resource. Defaults to <code>en_US</code>. You can also use <code>og:locale:alternate</code> if you have other available language translations available.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/',
    },
  },

  'og:video': {
    meta: {
      info: 'The URL for the video. If you want the video to play in-line in News Feed, you should use the https:// URL if possible.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
    },
  },

  'og:video:url': {
    meta: {
      info: 'Equivalent to og:video',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
    },
  },

  'og:video:secure_url': {
    meta: {
      info: 'Secure URL for the video. Include this even if you set the secure URL in og:video.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
    },
  },

  'og:video:type': {
    meta: {
      info: 'MIME type of the video. Either application/x-shockwave-flash or video/mp4.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
    },
  },

  'og:video:width': {
    meta: {
      info: 'Width of video in pixels. This property is required for videos.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
    },
  },

  'og:video:height': {
    meta: {
      info: 'Height of video in pixels. This property is required for videos.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
    },
  },

  'og:image:url': {
    meta: {
      info: 'Equivalent to <code>og:image</code>',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
    },
  },

  'og:image:secure_url': {
    meta: {
      info: '\'https://\' URL for the image',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
    },
  },

  'og:image:type': {
    meta: {
      info: 'MIME type of the image. One of <code>image/jpeg</code>, <code>image/gif</code> or <code>image/png</code>',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
    },
  },

  'og:image:width': {
    meta: {
      info: 'Width of image in pixels. Specify height and width for your image to ensure that the image loads properly the first time it\'s shared.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
    },
  },

  'og:image:height': {
    meta: {
      info: 'Height of image in pixels. Specify height and width for your image to ensure that the image loads properly the first time it\'s shared.',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/#media',
    },
  },
};

export default facebookSchema;
