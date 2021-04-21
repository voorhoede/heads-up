import Joi from '../../lib/validator';

export const schema = Joi.object({
  'twitter:card': Joi.string().valid(...[ 'app', 'player', 'summary_large_image', 'summary' ]),

  'twitter:site:id': Joi.number(),
  'twitter:site': Joi.string().pattern(/^@/).max(16).messages({
    'string.pattern.base': 'Twitter usernames must start with a: <strong>@</strong>.',
    'string.max': 'Twitter usernames can\'t be longer than <strong>15</strong> characters (excluding the: <strong>@</strong>).',
  }),

  'twitter:creator:id': Joi.number(),
  'twitter:creator': Joi.string().pattern(/^@/).max(16).messages({
    'string.pattern.base': 'Twitter usernames must start with a: <strong>@</strong>.',
    'string.max': 'Twitter usernames can\'t be longer than <strong>15</strong> characters (excluding the: <strong>@</strong>).',
  }),

  'twitter:description': Joi.string().disallow(Joi.ref('twitter:title')).max(200).messages({
    'any.invalid': '<strong><code>"twitter:description"</code></strong> should not be identical to <strong><code>"twitter:title"</code></strong>.',
  }),

  'twitter:title': Joi.string().max(70),

  'twitter:image': Joi.image()
    .validExtensions([ '.jpg', '.jpeg', '.png', '.webp', '.gif' ])
    .maxFileSize(5 * 1e+6) // 5mb
    .when('twitter:card', {
      is: 'summary',
      then: Joi.image().maxDimensions(4096, 4096).minDimensions(144, 144).aspectRatio('1:1'),
    })
    .when('twitter:card', {
      is: 'summary_large_image',
      then: Joi.image().maxDimensions(4096, 4096).minDimensions(300, 157).aspectRatio('2:1'),
    })
    .when('twitter:card', {
      is: 'player',
      then: Joi.image().minPixelCount(68600)
        .when('og:image', {
          not: Joi.image().required(),
          then: Joi.image().required(),
        })
        .messages({
          'any.required': 'One of these properties <strong><code>[twitter:image, og:image]</code></strong> is required.',
        }),
    }),

  'twitter:image:alt': Joi.string().max(420),

  'twitter:player': Joi.string().uri({ scheme: 'https' })
    .when('twitter:card', {
      is: 'player',
      then: Joi.string().required(),
    }),

  'twitter:player:width': Joi.number()
    .when('twitter:card', {
      is: 'player',
      then: Joi.number().required(),
    }),

  'twitter:player:height': Joi.number()
    .when('twitter:card', {
      is: 'player',
      then: Joi.number().required(),
    }),

  'twitter:player:stream': Joi.string().uri(),

  'twitter:app:name:iphone': Joi.string(),

  'twitter:app:id:iphone': Joi.number()
    .when('twitter:card', {
      is: 'app',
      then: Joi.number().required(),
    }),

  'twitter:app:url:iphone': Joi.string().uri(),

  'twitter:app:name:ipad': Joi.string(),

  'twitter:app:id:ipad': Joi.number()
    .when('twitter:card', {
      is: 'app',
      then: Joi.number().required(),
    }),

  'twitter:app:url:ipad': Joi.string().uri(),

  'twitter:app:name:googleplay': Joi.string(),

  'twitter:app:id:googleplay': Joi.number()
    .when('twitter:card', {
      is: 'app',
      then: Joi.number().required(),
    }),

  'twitter:app:url:googleplay': Joi.string().uri(),

  'twitter:app:country': Joi.string(),

  'og:title': Joi.string().max(70),
  'og:type': Joi.string(),

  'og:image': Joi.image()
    .validExtensions([ '.jpg', '.jpeg', '.png', '.webp', '.gif' ])
    .maxFileSize(5 * 1e+6) // 5mb
    .when('twitter:card', {
      is: 'summary',
      then: Joi.image().maxDimensions(4096, 4096).minDimensions(144, 144).aspectRatio('1:1'),
    })
    .when('twitter:card', {
      is: 'summary_large_image',
      then: Joi.image().maxDimensions(4096, 4096).minDimensions(300, 157).aspectRatio('2:1'),
    })
    .when('twitter:card', {
      is: 'player',
      then: Joi.image().minPixelCount(68600)
        .when('twitter:image', {
          not: Joi.image().required(),
          then: Joi.image().required(),
        })
        .messages({
          'any.required': 'One of these properties <strong><code>[twitter:image, og:image]</code></strong> is required.',
        }),
    }),

  'og:url': Joi.string().uri(),

  'og:description': Joi.string().disallow(Joi.ref('twitter:title')).max(200).messages({
    'any.invalid': '<strong><code>"og:description"</code></strong> should not be identical to <strong><code>"twitter:title"</code></strong>.',
  }),
})
  .or('twitter:card', 'og:type')
  .or('twitter:card', 'og:title')
  .or('twitter:card', 'og:description')
  .or('twitter:site', 'twitter:site:id')
  .or('twitter:title', 'og:title')
  .messages({
    'any.only': '<strong><code>{#label}</code></strong> must be one of these: <strong><code>{#valids}</code></strong>.',
    'any.required': '<strong><code>{#label}</code></strong> is required.',
    'number.base': '<strong><code>{#label}</code></strong> must be a number.',
    'object.missing': 'One of these properties <strong><code>{#peers}</code></strong> is required.',
    'object.unknown': '<strong><code>{#label}</code></strong> is an unknown property, for more information, <a href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup" rel="noopener" target="_blank">refer to the docs</a>.',
    'string.base': '<strong><code>{#label}</code></strong> must be a string.',
    'string.max': '<strong><code>{#label}</code></strong> has a maximum length of <strong>{#limit}</strong> characters.',
    'string.uri': '<strong><code>"{#value}"</code></strong> is not a valid URL.',
    'string.uriCustomScheme': '<strong><code>{#label}</code></strong> is not a valid HTTPS URL.',
  });

export const info = {
  'twitter:card': {
    info: 'The <code>"twitter:card"</code> element defines the card type. If an <code>"og:type"</code>, <code>"og:title"</code> and <code>"og:description"</code> exist in the markup but <code>"twitter:card"</code> is absent, then a summary card may be rendered.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards',
  },

  'twitter:site': {
    info: 'The <code>"twitter:site"</code> element defines the @username of website. Either <code>"twitter:site"</code> or <code>"twitter:site:id"</code> is required.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'twitter:site:id': {
    info: 'The <code>"twitter:site:id"</code> element defines the @username of website. Either <code>"twitter:site"</code> or <code>"twitter:site:id"</code> is required.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'twitter:creator': {
    info: 'The <code>"twitter:creator"</code> element defines the @username of content creator.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'twitter:creator:id': {
    info: 'The <code>"twitter:creator:id"</code> element defines the Twitter user ID of content creator.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'twitter:description': {
    info: 'The <code>"twitter:description"</code> element defines the description of content.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'twitter:title': {
    info: 'The <code>"twitter:title"</code> element defines the title of content.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'twitter:image': {
    info: 'The <code>"twitter:image"</code> element defines the URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'twitter:image:alt': {
    info: 'The <code>"twitter:image:alt"</code> element defines a text description of the image conveying the essential nature of an image to users who are visually impaired.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'twitter:player': {
    info: 'The <code>"twitter:player"</code> element defines the HTTPS URL of player iframe.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card',
  },

  'twitter:player:width': {
    info: 'The <code>"twitter:player:width"</code> element defines the width of iframe in pixels.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card',
  },

  'twitter:player:height': {
    info: 'The <code>"twitter:player:height"</code> element defines the height of iframe in pixels.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card',
  },

  'twitter:player:stream': {
    info: 'The <code>"twitter:player:stream"</code> element defines the URL to raw video or audio stream.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card',
  },

  'twitter:app:name:iphone': {
    info: 'The <code>"twitter:app:name:iphone"</code> element defines the name of your iPhone app.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
  },

  'twitter:app:id:iphone': {
    info: 'The <code>"twitter:app:id:iphone"</code> element defines your app ID in the iTunes App Store (Note: NOT your bundle ID).',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
  },

  'twitter:app:url:iphone': {
    info: 'The <code>"twitter:app:url:iphone"</code> element defines your app’s custom URL scheme (you must include ”://” after your scheme name).',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
  },

  'twitter:app:id:ipad': {
    info: 'The <code>"twitter:app:id:ipad"</code> element defines your app ID in the iTunes App Store.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
  },

  'twitter:app:name:ipad': {
    info: 'The <code>"twitter:app:name:ipad"</code> element defines the name of your iPad optimized app.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
  },

  'twitter:app:url:ipad': {
    info: 'The <code>"twitter:app:url:ipad"</code> element defines your app’s custom URL scheme.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
  },

  'twitter:app:name:googleplay': {
    info: 'The <code>"twitter:app:name:googleplay"</code> element defines the name of your Android app.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
  },

  'twitter:app:id:googleplay': {
    info: 'The <code>"twitter:app:id:googleplay"</code> element defines your app ID in the Google Play Store.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
  },

  'twitter:app:url:googleplay': {
    info: 'The <code>"twitter:app:url:googleplay"</code> element defines your app’s custom URL scheme.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
  },

  'twitter:app:country': {
    info: 'The <code>"twitter:app:country"</code> element defines your app’s store country.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card',
  },

  'og:title': {
    info: 'The <code>"og:title"</code> element is used as a fallback if <code>"twitter:title"</code> is not present.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'og:type': {
    info: 'The <code>"og:type"</code> element is used as a fallback if <code>"twitter:card"</code> is not present.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'og:image': {
    info: 'The <code>"og:image"</code> element is used as a fallback if <code>"twitter:image"</code> is not present.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'og:url': {
    info: 'The <code>"og:url"</code> element defines the canonical URL of your object.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },

  'og:description': {
    info: 'The <code>"og:description"</code> element is used as a fallback if <code>"twitter:description"</code> is not present.',
    link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup',
  },
};
