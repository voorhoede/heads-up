/**
 * Tagged template function allowing VS Code (in combination with the `lit-html`
 * extension) to give syntax highlighting to HTML strings
 *
 * Find the `lit-html` extension here:
 * https://marketplace.visualstudio.com/items?itemName=bierner.lit-html
 *
 * @param {*} strings
 * @param  {...any} values
 *
 * @example
 * import html from './lib/html'
 * const htmlString = html`<p>Some markup here</p>`
 */
export default function html (strings, ...values) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + values[i];
  });
  return str;
}
