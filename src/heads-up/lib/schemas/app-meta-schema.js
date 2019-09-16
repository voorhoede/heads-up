export const appMetaSchema = {
  'title': {
    required: true,
    message: {
      required: `The character encoding should be specified for every HTML page.`
    },
    meta: {
      info: `The HTML Title element  defines the document's title that is shown in a browser's title bar or a page's tab.`,
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title'
    }
  }
}
