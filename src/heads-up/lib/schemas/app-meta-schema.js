const appMetaSchema = {
  'title': {
    required: true,
    message: {
      required: `The title element is required.`,
      'descriptive-words': 'Avoid one- or two word titles.'
    },
    meta: {
      info: `The HTML <code>title</code> element defines the document's title that is shown in a browser's title bar or a page's tab.`,
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title'
    },
    'descriptive-words': 3
  },

  'lang': {
    required: true,
    message: {
      required: `The lang attribute is required.`,
      error: {
        hasValidLangValue: 'The lang value should meet the bcp47 standards.'
      }
    },
    error: ['hasValidLangValue'],
    meta: {
      info: `The meta <code>lang</code> attribute Is used to identify the language of text content on the web and is among others used by search engines and screen readers.`,
      link: 'https://developer.paciellogroup.com/blog/2016/06/using-the-html-lang-attribute/'
    }
  },

  'charset': {
    required: true,
    message: {
      required: `The charset attribute is required.`,
      error: {
        hasCorrectFormattedCharset: 'The charset value should be <code>utf-8</code>, not any other values such as <code>utf8</code>.',
      },
      warning: {
        isDefinedInCharsetAttribute: 'Always use <code>&lt;meta charset="utf-8"&gt;</code> as It’s backwards compatible and works in all known browsers, so it should always be used over the old <code>&lt;meta http-equiv="Content-Type" content="text/html;charset=UTF-8"&gt;</code>.',
      }
    },
    error: ['hasCorrectFormattedCharset'],
    warning: ['isDefinedInCharsetAttribute'],
    meta: {
      info: `The meta attribute <code>charset</code> specifies which character set a web page is written with.`,
      link: 'https://webhint.io/docs/user-guide/hints/hint-meta-charset-utf-8/'
    }
  },

  'viewport': {
    meta: {
      info: `The <code>viewport</code> is the part of the web page that the user can currently see.`,
      link: 'https://webhint.io/docs/user-guide/hints/hint-meta-viewport/'
    }
  },

  'description': {
    meta: {
      info: `Short description of the document (limit to 150 characters)`,
      link: 'https://htmlhead.dev/#meta'
    }
  },

  'theme-color': {
    meta: {
      info: `Set the toolbar color of the Chrome browser.`,
      link: 'https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android'
    }
  }
}

export default appMetaSchema
