import Joi from '../../lib/validator';

export const schema = Joi.object({
  'title': Joi.words()
    .min(3)
    .required()
    .messages({
      'words.minWords': 'Avoid one- or two-word titles.',
    }),

  'description': Joi.string()
    .max(150)
    .allow('')
    .messages({
      'string.max': 'Try to limit the description to 150 characters.',
    }),

  'search': Joi.string()
    .allow(''),

  'canonical': Joi.string()
    .allow(''),

  'robots': Joi.search()
    .robots()
    .allow(''),

  'googlebot': Joi.string()
    .allow(''),

  'google': Joi.string()
    .allow(''),

  'google-site-verification': Joi.string()
    .allow(''),

  'msvalidate.01': Joi.string()
    .allow(''),

  'yandex-verification': Joi.string()
    .allow(''),
});

export const info = {
  'title': {
    info: 'The HTML <code>title</code> element defines the document\'s title that is shown in a browser\'s title bar or a page\'s tab.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title',
  },

  'description': {
    info: 'Short description of the document (limit to 150 characters).',
    link: 'https://htmlhead.dev/#meta',
  },

  'search': {
    info: 'Web sites with search plugins can advertise them so a browser or other client application can use that search engine.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
  },

  'canonical': {
    info: 'A canonical link is used to prevent duplicate content issues by specifying the "canonical" or "preferred" version of a web page as part of search engine optimization.',
    link: 'https://en.wikipedia.org/wiki/Canonical_link_element',
  },

  'robots': {
    info: 'Control the behavior of crawling and indexing for all search engines.',
    link: 'https://htmlhead.dev/#meta',
  },

  'googlebot': {
    info: 'Control the behavior of crawling and indexing for Google specific search engine.',
    link: 'https://htmlhead.dev/#meta',
  },

  'google': {
    info: 'Give specific instructions to help control how your site\'s pages will appear in Google Search.',
    link: 'https://support.google.com/webmasters/answer/79812',
  },

  'google-site-verification': {
    info: 'Used to verify site ownership using the Google Search Console.',
    link: 'https://support.google.com/webmasters/answer/9008080',
  },

  'msvalidate.01': {
    info: 'Used to verify site ownership using the Bing Webmaster Center.',
    link: 'https://www.bing.com/webmaster/help/getting-started-checklist-66a806de',
  },

  'yandex-verification': {
    info: 'Used to verify site ownership using the Yandex Webmaster tools.',
    link: 'https://yandex.com/support/webmaster/service/rights.html',
  },
};
