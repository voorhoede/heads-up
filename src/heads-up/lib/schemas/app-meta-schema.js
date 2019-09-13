export const appMetaSchema = {
  'title': {
    required: true,
    match: /^utf-8$/,
    message: {
      required: `The character encoding should be specified for every HTML page.`
    }
  }
}
