import Joi from '../../lib/validator';
import supportedEncodings from './supported-encodings';

export const schema = Joi.object({
  'shortname': Joi.string().max(16).required().pattern(/<[^>]*>/, { invert: true }),

  'description': Joi.string().max(1024).pattern(/<[^>]*>/, { invert: true }),

  'input-encoding': Joi.string().valid(...supportedEncodings),
  'output-encoding': Joi.string().valid(...supportedEncodings),

  'urls': Joi.array()
    .items(
      Joi.object({
        attributes: Joi.object({
          indexOffset: Joi.string(),
          pageOffset: Joi.string(),
          rel: Joi.string(),
          template: Joi.string().required(),
          type: Joi.string().required(),
        }).required(),
        url: Joi.string().required(),
      })
    ),

  'image': Joi.image()
    .validExtensions([ '.jpg', '.jpeg', '.png', '.ico' ])
    .minDimensions(16, 16)
    .maxDimensions(64, 64),
}).messages({
  'any.only': 'The value of <strong><code>{#label}</code></strong> must conform to the <a href="https://www.w3.org/TR/2004/REC-xml-20040204/#charencoding" rel="noopener" target="_blank">XML 1.0 Character Encodings</a>, as specified by the <a href="https://www.iana.org/assignments/character-sets/character-sets.xhtml" rel="noopener" target="_blank">IANA Character Set Assignments</a>.',
  'any.required': '<strong><code>{#label}</code></strong> is required.',
  'object.unknown': '<strong><code>{#label}</code></strong> is an unknown property.',
  'string.base': 'The <strong><code>{#label}</code></strong> element must appear exactly once.',
  'string.max': '<strong><code>{#label}</code></strong> has a maximum length of <strong>{#limit}</strong> characters.',
  'string.pattern.invert.base': 'The value of <strong><code>{#label}</code></strong> must be plain text, it cannot contain HTML or any other markup.',
});

export const info = {
  'shortname': {
    info: 'Contains a brief human-readable title that identifies the search engine. It must be <strong>16</strong> or fewer characters of plain text, with no HTML or other markup.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },

  'description': {
    info: 'Contains a human-readable text description of the search engine. It must be <strong>1024</strong> or fewer characters of plain text, with no HTML or other markup.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },

  'input-encoding': {
    info: 'Contains a string that indicates that the search engine supports search requests encoded with the specified character encoding.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },

  'output-encoding': {
    info: 'Contains a string that indicates that the search engine supports search responses encoded with the specified character encoding.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },

  'urls': {
    info: 'Describes an interface by which a client can make requests for an external resource, such as search results, search suggestions, or additional description documents. The <strong><code>"template"</code></strong> attribute indicates the base URL for the search query.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },

  'image': {
    info: 'Contains a URL that identifies the location of an image that can be used in association with the search content. When possible, include a <strong>16×16</strong> image of type <strong><code>"image/x-icon"</code></strong> (such as <strong><code>"/favicon.ico"</code></strong>) and a <strong>64×64</strong> image of type <strong><code>"image/jpeg"</code></strong> or <strong><code>"image/png"</code></strong>.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },
};
