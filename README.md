# Heads Up

**Visualise everything in your `<head>` with the Heads Up Devtools**

## Features

* Presents key page meta (title, charset, viewport, ...) and favicons.
* Presents all Open Graph (`og:*`) properties found in the page.
* Presents Apple iOS (`apple-mobile-web-*`) settings, touch icons and startup images.
* Presents Twitter settings (`twitter:*`) and a preview of a Twitter card.
* Works with any site and web app (incl. localhost).
* Supports editing in devtools and hot module reloading.


## Development

Heads Up is a [Chrome Devtools extension](https://developer.chrome.com/extensions/devtools).

### Setup

The source code lives in the `src/` directory:

```
src/
  manifest.json   <- Devtools extension entry file
  devtools/       <- Devtools specific files
    assets/
    background.js
    content.js
    devtools.js
  heads-up/       <- Heads Up app, built with Vue.js
    components/
    store/
    views/
    App.vue
    index.html
    index.js
    router.js
```

The `manifest.json` registers our extension and bootstraps our Devtools (`src/devtools/devtools.(html|js)`), which in turn creates a Devtools panel with Heads Up (`src/heads-up/index.(html|js)`), which starts our Heads Up app (`src/heads-up/App.vue`).

The Heads Up app receives its data from the Devtools via messages (in `src/heads-up/index.js`). Devtools injects a content script (`src/devools/content.js`) into the scope of the web page. That content script is responsible for extracting the data we need in our app. Because our Heads Up app and our content script can't communicate directly, a background script (`src/devtools/background.js`) proxies our messages between the two.

### Workflow

The development workflow is a bit different from regular web apps:

* Clone the [repository](https://github.com/voorhoede/heads-up)
* Install dependencies: `npm install`
* Start develpment: `npm run dev`
* Open Chrome and go to [`chrome://extensions/`](chrome://extensions/)
* Enable __Developer mode__
* Hit __Load unpacked__ and select the `dist/` directory of the repository
* Visit any web page, open the Devtools and find the Heads Up panel
* If you make changes to anything in `src/devtools/` you need to reload the extension via [`chrome://extensions/`](chrome://extensions/)
* If you make changes to `src/heads-up/` you only need to hit the __refresh__ button in the top-right corner of the Heads Up panel.


## License

[MIT Licensed](license) by [De Voorhoede](https://www.voorhoede.nl)
