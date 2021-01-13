# Rich Previews for Head (meta)Data

## HTML syntax highlighting in `*-preview.js` files

Since the markup of the preview is generated with template literals in plain
`.js` files, you don't get syntax highlighting for the markup.
For VS Code there is a solution in the form of the LitHtml extension. Although
this project does not use LitHtml, we can trick the plugin in thinking it does,
and thus provide syntax highlighting.

The `html` lib function is a mock function which tricks the LitHtml extension
into providing the syntax highlight.

### Setup

1. Install the [extension](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)
2. Import the lib function `html` from `/src/heads-up/lib/html.js` in your file
3. Tag the template literal with the `html` function `const htmlString = html``<p>Some markup here</p>`
