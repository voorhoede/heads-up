import Joi from 'joi';
import image from './extensions/image';
import language from './extensions/language';
import search from './extensions/search';
import viewport from './extensions/viewport';
import words from './extensions/words';

let validator = Joi;

const extensions = [
  joi => image(joi),
  joi => language(joi),
  joi => search(joi),
  joi => viewport(joi),
  joi => words(joi),
];

/**
 * Extend Joi and add our own custom Joi extensions.
 *
 * NOTE: There is no mention in the docs of extending with multiple extensions
 * so I used this solution: https://stackoverflow.com/questions/66054067/how-do-i-add-custom-validators-in-joi-17
 *
 * Docs: https://joi.dev/api/?v=17.3.0#extensions.
 */
extensions.forEach(extension =>
  validator = validator.extend(extension));

export default validator;
