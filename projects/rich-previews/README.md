# Heads Up - Rich Previews

The Heads Up browser extension and web app use rich previews to visualize the social media share widgets of Facebook, Twitter, etc. Since this functionality is shared, the rich previews are maintained in this separate project folder.
The rich previews use a CDN version of [Vue 3](https://unpkg.com/browse/vue@3.0.5/) to achieve their dynamic features. The build pipeline is run by [Gulp](https://gulpjs.com/).

## Getting started

### 1. Install dependencies
Run `npm install` either in this folder or the root folder of the monorepo.

### 2. Starting development
This project does _NOT_ provide a development server. Since the previews are so simple, any basic static server solution will suffice. There's a myriad of options, but we'll provide you with two examples:
Solution | Explanation
---|---
use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code | Live Server lets you run a quick live dev server from VS Code. Just pick the html file you want to serve and click `Go Live` in the bottom of screen.
run `npx serve` in the root of this project | The root project folder will be served. In the browser, navigate to `/src/[preview-of-your-choice]/[preview-of-your-choice.html]` to start working.

### 3. Development caveats
**⚠️ IMPORTANT! Most previews will show barely anything when loaded without query string parameters in the url.**
The rich previews receive their data through query string parameters. For example, to show a proper Tweet preview, the query string should look like:
```
?card=summary_large_image&title=Wij+zijn+De+Voorhoede%2C+front-end+developers&description=Makers+van+websites+en+apps+voor+iedereen&image=https%3A%2F%2Fwww.voorhoede.nl%2Fimages%2Fsocial%2Flogo-wide.jpg&url=https%3A%2F%2Fwww.voorhoede.nl%2Fnl%2F&theme=false
```

### 4. Production
To build the rich previews, either run `npm run build` from this project folder or `npm run build:rich-previews` from the root monorepo folder. The production files are published to the `/dist` folder.

## Known issues
The current setup uses a version of Vue that parses templates with `eval`. The use of `eval` is flagged in Chrome browser extensions, so we need to loosen or Content Security Policy with the `unsafe-eval` property. It may be worth considering the 'runtime only' Vue build, but that would mean implementing a Vue template compilation step in the build pipeline.
