import Joi from '../../lib/validator';

export const schema = Joi.object({
  'shortname': Joi.string()
    .max(16)
    .required()
    .messages({
      'string.max': 'Avoid 16 characters or more.',
    }),

  'description': Joi.string()
    .max(1024)
    .allow(null)
    .messages({
      'string.max': 'Avoid 1024 characters or more.',
    }),

  'urls': Joi.array()
    .items(
      Joi.object({
        attributes: Joi.object().required(),
        url: Joi.string().required(),
      })
    )
    .allow(null),

  'image': Joi.image()
    .minDimensions(16, 16)
    .maxDimensions(64, 64)
    .allow(null),

  'input-encoding': Joi.string()
    .allow(null),
});

export const info = {
  'shortname': {
    info: 'A short name for the search engine. It must be <strong>16 or fewer characters</strong> of plain text, with no HTML or other markup.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },

  'description': {
    info: 'A brief description of the search engine. It must be <strong>1024 or fewer characters</strong> of plain text, with no HTML or other markup.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },

  'urls': {
    info: 'Describes the URL or URLs to use for the search. The template <code>attribute</code> indicates the base URL for the search query.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },

  'image': {
    info: 'URI of an icon for the search engine. When possible, include a 16×16 image of type <code>image/x-icon</code> (such as <code>/favicon.ico</code>) and a 64×64 image of type <code>image/jpeg</code> or <code>image/png</code>.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },

  'input-encoding': {
    info: 'The character encoding to use when submitting input to the search engine.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },
};
