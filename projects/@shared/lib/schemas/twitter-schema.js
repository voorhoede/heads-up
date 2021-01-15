const twitterSchema = {
  'twitter:card': {
    required: true,
    message: {
      required: 'This property is required according to the Twitter documentation.',
    },
    meta: {
      info: 'The <code>twitter:card</code> element defines the card type. If an <code>og:type</code>, <code>og:title</code> and <code>og:description</code> exist in the markup but <code>twitter:card</code> is absent, then a summary card may be rendered.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards',
    },
  },

  'twitter:site': {
    required: true,
    message: {
      required: 'This property is required according to the Twitter documentation.',
    },
    meta: {
      info: 'The <code>twitter:site</code> element defines the @username of website. Either <code>twitter:site</code> or <code>twitter:site:id</code> is required.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
    },
  },

  'twitter:site:id': {
    required: true,
    message: {
      required: 'This property is required according to the Twitter documentation.',
    },
    meta: {
      info: 'The <code>twitter:site:id</code> element defines the @username of website. Either <code>twitter:site</code> or <code>twitter:site:id</code> is required.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
    },
  },

  'twitter:creator': {
    meta: {
      info: 'The <code>twitter:creator</code> element defines the @username of content creator.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
    },
  },

  'twitter:creator:id': {
    meta: {
      info: 'The <code>twitter:creator:id</code> element defines the Twitter user ID of content creator.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
    },
  },

  'twitter:description': {
    required: true,
    message: {
      required: 'This property is required according to the Twitter documentation.',
      'max-characters': 'Avoid 200 characters or more.',
    },
    meta: {
      info: 'The <code>twitter:description</code> element defines the description of content.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
    },
    'max-characters': 200,
  },

  'twitter:title': {
    required: true,
    message: {
      required: 'This property is required according to the Twitter documentation.',
      'max-characters': 'Avoid 70 characters or more.',
    },
    meta: {
      info: 'The <code>twitter:title</code> element defines the title of content.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
    },
    'max-characters': 70,
  },

  'twitter:image': {
    required: true,
    message: {
      required: 'This property is required according to the Twitter documentation.',
    },
    meta: {
      info: 'The <code>twitter:image</code> element defines the URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
    },
  },

  'twitter:image:alt': {
    required: true,
    message: {
      required: 'This property is required according to the Twitter documentation.',
      'max-characters': 'Avoid 420 characters or more.',
    },
    meta: {
      info: 'The <code>twitter:image:alt</code> element defines a text description of the image conveying the essential nature of an image to users who are visually impaired.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
    },
    'max-characters': 420,
  },

  'twitter:player': {
    meta: {
      info: 'The <code>twitter</code> element defines the HTTPS URL of player iframe.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card',
    },
  },

  'twitter:player:width': {
    meta: {
      info: 'The <code>twitter</code> element defines the width of iframe in pixels.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card',
    },
  },

  'twitter:player:height': {
    meta: {
      info: 'The <code>twitter</code> element defines the height of iframe in pixels.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card',
    },
  },

  'twitter:player:stream': {
    meta: {
      info: 'The <code>twitter</code> element defines the URL to raw video or audio stream.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card',
    },
  },

  'twitter:app:id:iphone': {
    meta: {
      info: 'The <code>twitter</code> element defines your app ID in the iTunes App Store (Note: NOT your bundle ID).',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
    },
  },

  'twitter:app:id:ipad': {
    meta: {
      info: 'The <code>twitter</code> element defines your app ID in the iTunes App Store.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
    },
  },

  'twitter:app:id:googleplay': {
    meta: {
      info: 'The <code>twitter</code> element defines your app ID in the Google Play Store.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
    },
  },

  'twitter:app:url:iphone': {
    meta: {
      info: 'The <code>twitter</code> element defines your app’s custom URL scheme (you must include ”://” after your scheme name).',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
    },
  },

  'twitter:app:url:ipad': {
    meta: {
      info: 'The <code>twitter</code> element defines your app’s custom URL scheme.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
    },
  },

  'twitter:app:url:googleplay': {
    meta: {
      info: 'The <code>twitter</code> element defines your app’s custom URL scheme.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
    },
  },

  'twitter:app:country': {
    meta: {
      info: 'The <code>twitter</code> element defines ',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
    },
  },

  'twitter:app:name:iphone': {
    meta: {
      info: 'The <code>twitter</code> element defines the name of your iPhone app.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
    },
  },

  'twitter:app:name:ipad': {
    meta: {
      info: 'The <code>twitter</code> element defines the name of your iPad optimized app.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
    },
  },

  'twitter:app:name:googleplay': {
    meta: {
      info: 'The <code>twitter</code> element defines the name of your Android app.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
    },
  },
};

export default twitterSchema;
