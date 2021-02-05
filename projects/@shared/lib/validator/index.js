import Joi from 'joi';
import words from './extensions/words';

// Extend Joi and add our own custom Joi extensions.
// Docs: https://joi.dev/api/?v=17.3.0#extensions.
const validator = Joi.extend((joi) => ({
  ...words(joi),
}));

export default validator;
