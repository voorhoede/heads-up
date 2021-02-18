const openSearchMetaSchema = {
  'shortname': {
    required: true,
    message: {
      required: 'The shortname element is required.',
      'max-characters': 'Avoid 16 characters or more.',
    },
    meta: {
      info: 'A short name for the search engine. It must be <strong>16 or fewer characters</strong> of plain text, with no HTML or other markup.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
    },
    'max-characters': 16,
  },

  'description': {
    message: {
      'max-characters': 'Avoid 1024 characters or more.',
    },
    meta: {
      info: 'A brief description of the search engine. It must be <strong>1024 or fewer characters</strong> of plain text, with no HTML or other markup.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
    },
    'max-characters': 1024,
  },

  'urls': {
    message: {
      required: 'The url element is required.',
    },
    meta: {
      info: 'Describes the URL or URLs to use for the search. The template <code>attribute</code> indicates the base URL for the search query.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
    },
  },

  'image': {
    meta: {
      info: 'URI of an icon for the search engine. When possible, include a 16×16 image of type <code>image/x-icon</code> (such as <code>/favicon.ico</code>) and a 64×64 image of type <code>image/jpeg</code> or <code>image/png</code>.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
    },
  },

  'input-encoding': {
    meta: {
      info: 'The character encoding to use when submitting input to the search engine.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
    },
  },
};

export default openSearchMetaSchema;
