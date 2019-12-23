const appMetaSchema = {
  'title': {
    required: true,
    message: {
      required: `The title element is required.`
    },
    meta: {
      info: `The HTML <code>title</code> element defines the document's title that is shown in a browser's title bar or a page's tab.`,
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title'
    }
  },

  'lang': {
    required: true,
    message: {
      required: `The lang attribute is required.`,
      enum: `Lang attribute does not contain a correct value.`
    },
    meta: {
      info: `The meta <code>lang</code> attribute Is used to identify the language of text content on the web and is among others used by search engines and screen readers.`,
      link: 'https://developer.paciellogroup.com/blog/2016/06/using-the-html-lang-attribute/'
    }
  },

  'charset': {
    required: true,
    message: {
      required: `The charset attribute is required.`,
    },
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
