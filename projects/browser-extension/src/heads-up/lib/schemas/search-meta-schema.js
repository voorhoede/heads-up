const searchMetaSchema = {
  'title': {
    required: true,
    message: {
      required: 'The title element is required.',
      'descriptive-words': 'Avoid one- or two word titles.',
    },
    meta: {
      info: 'The HTML <code>title</code> element defines the document\'s title that is shown in a browser\'s title bar or a page\'s tab.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title',
    },
    'descriptive-words': 3,
  },

  'description': {
    meta: {
      info: 'Short description of the document (limit to 150 characters).',
      link: 'https://htmlhead.dev/#meta',
    },
  },

  'search': {
    meta: {
      info: 'Web sites with search plugins can advertise them so a browser or other client application can use that search engine.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/OpenSearch',
    },
  },

  'canonical': {
    meta: {
      info: 'A canonical link is used to prevent duplicate content issues by specifying the "canonical" or "preferred" version of a web page as part of search engine optimization.',
      link: 'https://en.wikipedia.org/wiki/Canonical_link_element',
    },
  },

  'robots': {
    meta: {
      info: 'Control the behavior of crawling and indexing for all search engines.',
      link: 'https://htmlhead.dev/#meta',
    },
  },

  'googlebot': {
    meta: {
      info: 'Control the behavior of crawling and indexing for Google specific search engine.',
      link: 'https://htmlhead.dev/#meta',
    },
  },

  'google': {
    meta: {
      info: 'Give specific instructions to help control how your site\'s pages will appear in Google Search.',
      link: 'https://support.google.com/webmasters/answer/79812',
    },
  },

  'google-site-verification': {
    meta: {
      info: 'Used to verify site ownership using the Google Search Console.',
      link: 'https://support.google.com/webmasters/answer/9008080',
    },
  },

  'msvalidate.01': {
    meta: {
      info: 'Used to verify site ownership using the Bing Webmaster Center.',
      link: 'https://www.bing.com/webmaster/help/getting-started-checklist-66a806de',
    },
  },

  'yandex-verification': {
    meta: {
      info: 'Used to verify site ownership using the Yandex Webmaster tools.',
      link: 'https://yandex.com/support/webmaster/service/rights.html',
    },
  },
};

export default searchMetaSchema;
