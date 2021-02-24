import Joi from '../../lib/validator';

export const schema = Joi.object({
  'og:title': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required according to the Open Graph protocol.',
    }),

  'og:type': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required according to the Open Graph protocol.',
    }),

  'og:image': Joi.image()
    .required()
    .messages({
      'string.empty': 'This property is required according to the Open Graph protocol.',
    }),

  'og:url': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required according to the Open Graph protocol.',
    }),

  'og:description': Joi.string()
    .allow(''),

  'og:locale': Joi.string()
    .allow(''),

  'og:site_name': Joi.string()
    .allow(''),

  'og:video': Joi.string()
    .allow(''),

  'og:image:url': Joi.image()
    .allow(''),

  'og:image:secure_url': Joi.string()
    .allow(''),

  'og:image:type': Joi.string()
    .allow(''),

  'og:image:width': Joi.string()
    .allow(''),

  'og:image:height': Joi.string()
    .allow(''),

  'og:image:alt': Joi.string()
    .allow(''),

  'og:video:url': Joi.string()
    .allow(''),

  'og:video:secure_url': Joi.string()
    .allow(''),

  'og:video:type': Joi.string()
    .allow(''),

  'og:video:width': Joi.string()
    .allow(''),

  'og:video:height': Joi.string()
    .allow(''),

  'og:video:alt': Joi.string()
    .allow(''),
});


export const info = {
  'og:title': {
    info: 'The <code>og:title</code> element defines the title of your object as it should appear within the graph.',
    link: 'https://ogp.me/',
  },

  'og:type': {
    info: 'The <code>og:type</code> element defines the type of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.',
    link: 'https://ogp.me/',
  },

  'og:image': {
    info: 'The <code>og:image</code> element defines an image URL which should represent your object within the graph.',
    link: 'https://ogp.me/',
  },

  'og:url': {
    info: 'The <code>og:url</code> element defines the canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/"',
    link: 'https://ogp.me/',
  },

  'og:description': {
    info: 'The <code>og:description</code> element defines a one to two sentence description of your object.',
    link: 'https://ogp.me/',
  },

  'og:locale': {
    info: 'The <code>og:locale</code> element defines the locale these tags are marked up in. Of the format language_TERRITORY. Default is en_US.',
    link: 'https://ogp.me/',
  },

  'og:site_name': {
    info: 'The <code>og:site_name</code> element defines if your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb".',
    link: 'https://ogp.me/',
  },

  'og:video': {
    info: 'The <code>og:site_name</code> element defines a URL to a video file that complements this object.',
    link: 'https://ogp.me/',
  },

  'og:image:url': {
    info: 'Identical to <code>og:image</code> property. The <code>og:image:url</code> is an optional structured property for <code>og:image</code>.',
    link: 'https://ogp.me/',
  },

  'og:image:secure_url': {
    info: 'An alternate url to use if the webpage requires HTTPS. The <code>og:image:secure_url</code> is an optional structured property for <code>og:image</code>.',
    link: 'https://ogp.me/',
  },

  'og:image:type': {
    info: 'A MIME type for this image. The <code>og:image:type</code> is an optional structured property for <code>og:image</code>.',
    link: 'https://ogp.me/',
  },

  'og:image:width': {
    info: 'The number of pixels wide. The <code>og:image:width</code> is an optional structured property for <code>og:image</code>.',
    link: 'https://ogp.me/',
  },

  'og:image:height': {
    info: 'The number of pixels high. The <code>og:image:height</code> is an optional structured property for <code>og:image</code>.',
    link: 'https://ogp.me/',
  },

  'og:image:alt': {
    info: 'A description of what is in the image (not a caption). If the page specifies an og:image it should specify og:image:alt. The <code>og:image:alt</code> is an optional structured property for <code>og:image</code>.',
    link: 'https://ogp.me/',
  },

  'og:video:url': {
    info: 'Identical to <code>og:video</code> property. The <code>og:video:url</code> is an optional structured property for <code>og:video</code>.',
    link: 'https://ogp.me/',
  },

  'og:video:secure_url': {
    info: 'An alternate url to use if the webpage requires HTTPS. The <code>og:video:secure_url</code> is an optional structured property for <code>og:video</code>.',
    link: 'https://ogp.me/',
  },

  'og:video:type': {
    info: 'A MIME type for this video. The <code>og:video:type</code> is an optional structured property for <code>og:video</code>.',
    link: 'https://ogp.me/',
  },

  'og:video:width': {
    info: 'The number of pixels wide. The <code>og:video:width</code> is an optional structured property for <code>og:video</code>.',
    link: 'https://ogp.me/',
  },

  'og:video:height': {
    info: 'The number of pixels high. The <code>og:video:height</code> is an optional structured property for <code>og:video</code>.',
    link: 'https://ogp.me/',
  },

  'og:video:alt': {
    info: 'A description of what is in the image (not a caption). If the page specifies an og:image it should specify og:image:alt. The <code>og:image:alt</code> is an optional structured property for <code>og:image</code>.',
    link: 'https://ogp.me/',
  },
};
