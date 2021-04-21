import Joi from '../../lib/validator';

export const schema = Joi.object({
  'twitter:card': Joi.string(),

  'twitter:site:id': Joi.number(),
  'twitter:site': Joi.string().pattern(/^@/).max(16).messages({
    'string.pattern.base': 'Twitter usernames must start with a <code>"@"</code>.',
    'string.max': 'Twitter usernames can\'t be longer than 15 characters (excluding the "@").',
  }),

  'twitter:creator:id': Joi.number(),
  'twitter:creator': Joi.string().pattern(/^@/).max(16).messages({
    'string.pattern.base': 'Twitter usernames must start with a <code>"@"</code>.',
    'string.max': 'Twitter usernames can\'t be longer than 15 characters (excluding the "@").',
  }),

  'twitter:description': Joi.string().max(200).messages({
    'string.max': '<code>"twitter:description"</code> has a maximum of 200 characters.',
  }),

  'twitter:title': Joi.string().max(70).messages({
    'string.max': '<code>"twitter:title"</code> has a maximum of 70 characters.',
  }),

  'twitter:image': Joi.image().minDimensions(144, 144).maxDimensions(4096, 4096),
  'twitter:image:alt': Joi.string().max(420).messages({
    'string.max': '<code>"twitter:image:alt"</code> has a maximum of 420 characters.',
  }),

  'twitter:player': Joi.string(),
  'twitter:player:width': Joi.number(),
  'twitter:player:height': Joi.number(),
  'twitter:player:stream': Joi.string(),

  'twitter:app:name:iphone': Joi.string(),
  'twitter:app:id:iphone': Joi.number(),
  'twitter:app:url:iphone': Joi.string(),

  'twitter:app:name:ipad': Joi.string(),
  'twitter:app:id:ipad': Joi.number(),
  'twitter:app:url:ipad': Joi.string(),

  'twitter:app:name:googleplay': Joi.string(),
  'twitter:app:id:googleplay': Joi.number(),
  'twitter:app:url:googleplay': Joi.string(),

  'og:title': Joi.string(),
  'og:type': Joi.string(),
  'og:image': Joi.image().minDimensions(144, 144).maxDimensions(4096, 4096),
  'og:url': Joi.string(),
  'og:description': Joi.string(),
})
  .or('twitter:card', 'og:type')
  .or('twitter:card', 'og:title')
  .or('twitter:card', 'og:description')
  .or('twitter:site', 'twitter:site:id')
  .or('twitter:description', 'og:description')
  .or('twitter:title', 'og:title')
  .or('twitter:image', 'og:image')
  .messages({
    'object.missing': 'One of these properties <code>{#peers}</code> are required.',
    'object.unknown': '<code>{#label}</code> is an unknown property, for more information, <a href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup" rel="noopener" target="_blank">refer to the docs</a>.',
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
