# Heads Up

**A collection of tools to inspect and improve your website's `<head>`**

[Install Heads Up from Web Chrome Store](https://chrome.google.com/webstore/detail/heads-up/ajjdmakdoicbgmgoacfmlplnefljpcke)

[Use Heads Up as a Web App](https://heads-up-web-app.netlify.app/)

## Monorepo project
This is a 'monorepo', containing the following projects:

#### Browser Extension
`/projects/browser-extension`


A browser devtools extension to visualize everything in the `<head>` of the current page.
More info in the [browser-extension README.md](./projects/browser-extension).

#### Landing Page
`/projects/landing-page`


The Heads Up landing page.

#### Rich Previews
`/projects/rich-previews`


A separate project to build rich previews. These previews are automatically copied into dependent projects to avoid CORS errors.

#### Web App
`/projects/web-app`


Heads Up as a web application, where you can enter the URL of your website and receive all information necessary to inspect and improve upon your website's `<head>`

#### @shared
`/projects/@shared`


Shared resources between different projects. Contains shared assets, vue components, and library functions.

## Development
To install _all_ dependencies for _all_ projects, simply run `npm install` from this directory.
You can work on the entire monorepo by running it from the root folder, or work on individual projects by running a project from its respective directory.
For project specifics, please refer to that project's README.md.
From this folder, we can the following scrips:

`npm run ...` | Description
---|---
`build:browser-extension` | Builds the browser extension
`build:landing-page` | Builds the landing page
`build:rich-previews` | Builds the rich previews
`build:web-app` | Builds the web app
`build` | Build all projects at once
`dev:browser-extension` | Compiles and live updates browser extension
`dev:landing-page` | Compiles and live updates landing page
`dev:web-app` | Compiles and hot-reloads web application
`lint` | Checks projects for code style violations.

# test
