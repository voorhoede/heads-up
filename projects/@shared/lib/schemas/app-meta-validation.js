import Joi from '../validator';

const schema = Joi.object({
  title: Joi.words()
    .allow('', null)
    .min(20)
    .required(),

  lang: Joi.string().required(),

  charset: Joi.string().required(),

  viewport: Joi.string().required(),

  description: Joi.string().required(),

  'theme-color': Joi.string().required(),
});

export default schema;
