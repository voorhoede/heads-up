import Joi from '../validator';

const schema = Joi.object({
  title: Joi.words()
    .allow('', null)
    .min(3)
    .required(),

  lang: Joi.language()
    .required(),

  charset: Joi.string()
    .lowercase()
    .valid('utf-8')
    .required().messages({
      'any.only': `The "charset" value should be <code>utf-8</code>, not any other values such as <code>utf8</code>.`,
    }),

  viewport: Joi.string()
    .allow('', null),

  description: Joi.string()
    .allow('', null),

  'theme-color': Joi.string()
    .allow('', null),
});

export default schema;
