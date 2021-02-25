import Joi from '../../lib/validator';

export const schema = Joi.object({
  'title': Joi.words()
    .min(3)
    .required()
    .messages({
      'words.minWords': 'Avoid one- or two-word titles.',
    }),

  'lang': Joi.language()
    .countryCode()
    .required(),

  'charset': Joi.string()
    .lowercase()
    .valid('utf-8')
    .required()
    .messages({
      'any.only': 'The "charset" value should be <code>utf-8</code>, not any other values such as <code>utf8</code>.',
    }),

  'viewport': Joi.viewport()
    .allow(''),

  'description': Joi.string()
    .max(150)
    .allow('')
    .messages({
      'string.max': 'Try to limit the description to 150 characters.',
    }),

  'theme-color': Joi.string()
    .pattern(new RegExp('^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6})$', 'i')) // Match #abc, #abcd shorthands and #abcdef.
    .allow('')
    .messages({
      'string.pattern.base': '{{#label}} with {{#value}} fails to match a valid hex color value.',
    }),
});

export const info = {
  'title': {
    info: 'The HTML <code>title</code> element defines the document\'s title that is shown in a browser\'s title bar or a page\'s tab.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title',
  },

  'lang': {
    info: 'The meta <code>lang</code> attribute Is used to identify the language of text content on the web and is among others used by search engines and screen readers.',
    link: 'https://developer.paciellogroup.com/blog/2016/06/using-the-html-lang-attribute/',
  },

  'charset': {
    info: 'The meta attribute <code>charset</code> specifies which character set a web page is written with.',
    link: 'https://webhint.io/docs/user-guide/hints/hint-meta-charset-utf-8/',
  },

  'viewport': {
    info: 'The <code>viewport</code> is the part of the web page that the user can currently see.',
    link: 'https://webhint.io/docs/user-guide/hints/hint-meta-viewport/',
  },

  'description': {
    info: 'Short description of the document (limit to 150 characters).',
    link: 'https://htmlhead.dev/#meta',
  },

  'theme-color': {
    info: 'Set the toolbar color of the Chrome browser. ',
    link: 'https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android',
  },
};
