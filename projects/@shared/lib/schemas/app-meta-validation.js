import Joi from '../validator';

const schema = Joi.object({
  title: Joi.words()
    .items(Joi.string())
    .min(20),

  lang: Joi.string(),

  charset: Joi.string(),

  viewport: Joi.string(),

  description: Joi.string(),

  'theme-color': Joi.string(),
});

export default schema;
