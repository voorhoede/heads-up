const whatsappSchema = {
  'og:title': {
    required: true,
    message: {
      required: 'This property is required for rich links on WhatsApp.',
      'max-characters': 'Avoid 35 characters or more.',
    },
    meta: {
      info: 'The <code>og:title</code> element defines the title of your rich link.',
    },
    'max-characters': 35,
  },

  'og:image': {
    required: true,
    message: {
      required: 'This property is required for rich links on WhatsApp.',
      'image-min-size': 'Avoid images smaller than 300x200 or less.',
    },
    'image-min-size': {
      height: 200,
      width: 300,
    },
    meta: {
      info: 'The <code>og:image</code> element defines the image of your rich link.',
    },
  },

  'og:description': {
    required: true,
    message: {
      required: 'This property is required for rich links on WhatsApp.',
      'max-characters': 'Avoid 155 characters or more.',
    },
    meta: {
      info: 'The <code>og:description</code> element defines the description of your rich link.',
    },
    'max-characters': 155,
  },

  'og:url': {
    required: true,
    message: {
      required: 'This property is required for rich links on WhatsApp.',
    },
    meta: {
      info: 'The <code>og:url</code> element defines the url of your rich link.',
    },
  },

  'og:type': {
    meta: {
      info: 'The <code>og:type</code> element defines the type of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.',
    },
  },
};

export default whatsappSchema;
