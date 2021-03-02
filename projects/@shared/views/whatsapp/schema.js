import Joi from '../../lib/validator';

export const schema = Joi.object({
  'og:title': Joi.string()
    .max(65)
    .required()
    .messages({
      'string.max': 'Avoid 65 characters or more.',
      'string.empty': 'This property is required for rich links on WhatsApp.',
    }),

  'og:image': Joi.image()
    .minDimensions(200, 300)
    .required()
    .messages({
      'any.required': 'This property is required for rich links on WhatsApp.',
    }),

  'og:description': Joi.string()
    .max(155)
    .required()
    .messages({
      'string.max': 'Avoid 155 characters or more.',
      'any.required': 'This property is required for rich links on WhatsApp.',
    }),

  'og:url': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required for rich links on WhatsApp.',
    }),

  'og:type': Joi.string()
    .allow(''),
});

export const info = {
  'og:title': {
    info: 'The <code>og:title</code> element defines the title of your rich link.',
  },

  'og:image': {
    info: 'The <code>og:image</code> element defines the image of your rich link.',
  },

  'og:description': {
    info: 'The <code>og:description</code> element defines the description of your rich link.',
  },

  'og:url': {
    info: 'The <code>og:url</code> element defines the canonical URL of your rich link.',
  },

  'og:type': {
    info: 'The <code>og:type</code> element defines the type of content, whether it’s an article, video, or rich media.',
  },
};
