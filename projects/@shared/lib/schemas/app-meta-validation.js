import Joi from '../validator';

const schema = Joi.object({
  title: Joi.words()
    .allow('')
    .min(3)
    .required(),

  lang: Joi.language()
    .allow('')
    .required(),

  charset: Joi.string()
    .lowercase()
    .valid('utf-8')
    .required()
    .messages({
      'any.only': 'The "charset" value should be <code>utf-8</code>, not any other values such as <code>utf8</code>.',
    }),

  viewport: Joi.viewport()
    .allow(''),

  description: Joi.string(),

  'theme-color': Joi.string()
    .pattern(new RegExp('^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6})$', 'i')) // Match #abc, #abcd shorthands and #abcdef.
    .allow('')
    .messages({
      'string.pattern.base': '{{#label}} with {{#value}} fails to match a valid hex color value.',
    }),
});

export default schema;
