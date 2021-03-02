import Joi from '../../lib/validator';

export const schema = Joi.object({
  'og:title': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required for rich links on Slack.',
    }),

  'og:type': Joi.string()
    .allow(''),

  'og:description': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required for rich links on Slack.',
    }),

  'og:site_name': Joi.string()
    .allow(''),

  'og:image': Joi.image()
    .required()
    .messages({
      'string.empty': 'This property is required for rich links on Slack.',
    }),

  'og:url': Joi.string()
    .required()
    .messages({
      'string.empty': 'This property is required for rich links on Slack.',
    }),

  'twitter:label1': Joi.string()
    .allow(''),

  'twitter:data1': Joi.string()
    .allow(''),

  'twitter:label2': Joi.string()
    .allow(''),

  'twitter:data2': Joi.string()
    .allow(''),
});

export const info = {
  'og:title': {
    info: 'The <code>og:title</code> element defines the title of your rich link.',
    link: 'https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254',
  },

  'og:type': {
    info: 'The <code>og:type</code> element defines the type of content, whether it’s an article, video, or rich media.',
    link: 'https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254',
  },

  'og:description': {
    info: 'The <code>og:description</code> element defines the description of your rich link.',
    link: 'https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254',
  },

  'og:site_name': {
    info: 'The <code>og:site_name</code> element defines the name which should be displayed for the overall site. e.g., "IMDb".',
    link: 'https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254',
  },

  'og:image': {
    info: 'The <code>og:image</code> element defines the image of your rich link.',
    link: 'https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254',
  },

  'og:url': {
    info: 'The <code>og:url</code> element defines the canonical URL of your rich link.',
    link: 'https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254',
  },

  'twitter:label1': {
    info: 'The <code>twitter:label1</code> needs to be paired with <code>twitter:data1</code>. They can be used to display prices, inventory, categories in a nicely formatted way. Those data fields will work on any Twitter card type in Slack, even though Twitter itself will ignore them in all but Product type.',
    link: 'https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254',
  },

  'twitter:data1': {
    info: 'The <code>twitter:data1</code> needs to be paired with <code>twitter:label1</code>. They can be used to display prices, inventory, categories in a nicely formatted way. Those data fields will work on any Twitter card type in Slack, even though Twitter itself will ignore them in all but Product type.',
    link: 'https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254',
  },

  'twitter:label2': {
    info: 'The <code>twitter:label2</code> needs to be paired with <code>twitter:data2</code>. They can be used to display prices, inventory, categories in a nicely formatted way. Those data fields will work on any Twitter card type in Slack, even though Twitter itself will ignore them in all but Product type.',
    link: 'https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254',
  },

  'twitter:data2': {
    info: 'The <code>twitter:data2</code> needs to be paired with <code>twitter:label2</code>. They can be used to display prices, inventory, categories in a nicely formatted way. Those data fields will work on any Twitter card type in Slack, even though Twitter itself will ignore them in all but Product type.',
    link: 'https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254',
  },
};
