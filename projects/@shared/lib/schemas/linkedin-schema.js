const linkedinSchema = {
  'og:title': {
    required: true,
    message: {
      required: 'This property is required according to LinkedIn Help.',
      'max-characters': 'Avoid 150 characters or more.',
    },
    meta: {
      info: 'The <code>og:title</code> element defines the title of your object.',
      link: 'https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin',
    },
    'max-characters': 150,
  },

  'og:type': {
    required: true,
    message: {
      required: 'This property is required according to LinkedIn Help.',
    },
    meta: {
      info: 'The <code>og:type</code> element defines the type of content, whether it’s an article, video, or rich media.',
      link: 'https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin',
    },
  },

  'og:image': {
    required: true,
    message: {
      required: 'This property is required according to LinkedIn Help.',
      'image-min-size': 'Avoid images smaller than 1200x627 or less.',
    },
    'image-min-size': {
      height: 627,
      width: 1200,
    },
    meta: {
      info: 'The <code>og:image</code> element defines an image URL which should represent your object.',
      link: 'https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin',
    },
  },

  'og:description': {
    required: true,
    message: {
      required: 'This property is required according to LinkedIn Help.',
    },
    meta: {
      info: 'The <code>og:description</code> element defines a brief description of the content.',
      link: 'https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin',
    },
  },

  'og:url': {
    required: true,
    message: {
      required: 'This property is required according to LinkedIn Help.',
    },
    meta: {
      info: 'The <code>og:url</code> element defines the canonical URL of your object.',
      link: 'https://www.linkedin.com/help/linkedin/answer/46687/making-your-website-shareable-on-linkedin',
    },
  },
};

export default linkedinSchema;
