import Joi from '../../lib/validator';

export const schema = Joi.object({
  'og:title':Joi.string()
    .max(150)
    .required()
    .messages({
      'string.max': 'Try to limit the description to 150 characters.',
      'string.empty': 'This property is required according to LinkedIn Help.',
    }),

  'og:type': Joi.string()
    .allow(''),

  'og:image': Joi.image()
    .minDimensions(1200, 627)
    .required()
    .messages({
      'string.empty': 'This property is required according to LinkedIn Help.',
    }),

  'og:description': Joi.string()
    .min(100)
    .required()
    .messages({
      'string.min': 'The description should be at least 100 characters long.',
      'string.empty': 'This property is required according to LinkedIn Help.',
    }),

  'og:url': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required according to LinkedIn Help.',
    }),
});

export const info = {
  'og:title': {
    info: 'The <code>og:title</code> element defines the title of your object.',
    link: 'https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin',
  },

  'og:type': {
    info: 'The <code>og:type</code> element defines the type of content, whether it’s an article, video, or rich media.',
    link: 'https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin',
  },

  'og:image': {
    info: 'The <code>og:image</code> element defines an image URL which should represent your object.',
    link: 'https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin',
  },

  'og:description': {
    info: 'The <code>og:description</code> element defines a brief description of the content.',
    link: 'https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin',
  },

  'og:url': {
    info: 'The <code>og:url</code> element defines the canonical URL of your object.',
    link: 'https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin',
  },
};
