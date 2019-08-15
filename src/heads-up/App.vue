<template>
  <div>
    <button type="button" v-if="isDev" @click="reload()">REFRESH</button>
    <aside class="sidebar">
      <ul class="sidebar-list">
        <li class="sidebar-list__item">Application
          <ul class="sidebar-list">
            <li class="sidebar-list__item">
              <router-link class="sidebar__button" :to="{ name: 'page-meta' }">
                Page meta
              </router-link>
            </li>
            <li class="sidebar-list__item">
              <router-link class="sidebar__button" :to="{ name: 'twitter' }">
                Twitter
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>

    <main class="panel">
      <router-view></router-view>
    </main>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        isDev: process.env.NODE_ENV === 'development'
      }
    },
    methods: {
      reload() {
        window.location.reload()
      }
    }
  }
</script>

<style>
  /* CSS Defaults https://github.com/anandgraves/css-defaults */

  /**
    * Resetting the margins of the paragraphs, headings and other elements
    * makes creating a new vertical rhythm easier. It also easily shows
    * what elements don't have a vertical rhythm yet.
    */
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  *::before,
  *::after {
    box-sizing: inherit;
  }

  /**
    * 1. Improve readability with font smoothing.
    * 2. Apply a natural box layout model to all elements, but allowing
    *    components to change.
    *    https://www.paulirish.com/2012/box-sizing-border-box-ftw/
    */
  html {
    -webkit-font-smoothing: antialiased; /* 1 */
    -moz-osx-font-smoothing: grayscale; /* 1 */
    box-sizing: border-box; /* 2 */
  }

  /**
    * All the headings have by default a divergent font size from the font size
    * set on html. Set the font size of all headings the same and slightly bigger
    * than the default text. This allows for styling all headings easily with
    * classes instead of the headings itself.
    * https://csswizardry.com/2016/02/managing-typography-on-large-apps/
    */
  h1, h2, h3, h4, h5, h6 {
    font-size: 1.2rem;
    font-weight: normal;
  }

  /**
    * 1. Switch display mode to block, since that's what we usually want for images.
    * 2. If you override, and make an image inline, it's likely you'll want middle vertical alignment.
         Setting vertical-align removes the whitespace that appears under img elements when they are
         dropped into a page as-is. Is a safer alternative to using display: block.
    * 3. Make images and video flexible by default.
    * 4. Ensure images and video maintain their aspect ratio when max-width comes into play
    https://github.com/inuitcss/inuitcss/blob/develop/elements/_elements.images.scss
    https://github.com/mozdevs/cssremedy/blob/master/remedy.css
    */
  img, video  {
    display: block; /* 1 */
    vertical-align: middle;  /* 2 */
    max-width: 100%; /* 3 */
    height: auto; /* 4 */
  }

  /**
    * The color set on html isn't inherited by default by button, input, select
    * and textarea. This inherits the color. Button, input, textarea and select do
    * not inherit the font family and font weight by default. Button, input,
    * textarea and select do not inherit the font size. This rule normalizes all
    * font sizes.
    */
  button, input, select, textarea {
    color: inherit;
    font-family: inherit;
    font-weight: inherit;
    font-size: 100%;
  }

  /**
    * Add the correct display in IE 10+.
    */
  template {
    display: none;
  }

  /**
    * Remove the spacing between table cells.
    */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /**
    * Add the correct display for main up to and including IE 11.
    */
  main {
    display: block;
  }

  /**
    * Add the correct display in IE 10.
    */
  [hidden] {
    display: none;
  }


  :root {
    --color-grey-light: #ededed;
    --color-grey-medium: #888;
    --color-grey-dark: #555;
    --color-action: #3d71ba;
    --color-body: #33393d;
  }

  html {
    height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    color: var(--color-body);
  }

  body {
    height: 100%;
  }

  a {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-weight: normal;
    color: var(--color-action);
    text-decoration: underline;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .panel {
    width: calc(100% - 190px);
    margin-left: 190px;
  }

  .panel__twitter-preview {
    max-width: 521px;
    margin: 0;
    padding: 0;
    border: none;
  }

  .section {
    padding: 16px;
    border-bottom: 1px solid var(--color-grey-light);
  }

  .section:last-child {
    border-bottom: none;
  }

  .heading {
    margin-bottom: 16px;
  }

  .heading-default {
    font-size: 1rem;
  }

  .heading-small {
    font-size: .875rem;
    color: var(--color-grey-dark);
  }

  .heading-smaller {
    font-size: .8125rem;
  }

  .properties-list {
    list-style: none;
    width: 100%;
  }

  .properties-list__item {
    margin-bottom: 20px;
  }

  .properties-list__title {
    margin-bottom: 4px;
    font-weight: normal;
    font-size: .8125rem;
    color: var(--color-grey-medium);
  }

  .properties-list__content {
    display: inline-block;
    font-size: .8125rem;
  }

  .sidebar {
    position: fixed;
    height: 100%;
    width: 190px;
    font-weight: bold;
    font-size: .8125rem;
    border-right: 1px solid #d0d0d0;
    background-color: #f3f3f3;
    overflow: auto;
  }

  .sidebar-list {
    padding: 10px;
    list-style: none;
  }

  .sidebar-list .sidebar-list {
    margin-left: 10px;
    padding: 0 8px;
  }

  .sidebar-list__item:not(:last-child) {
    margin-bottom: 5px;
  }

  .sidebar__button {
    all: unset;
    cursor: pointer;
  }

  .properties-list__color-block {
    display: inline-block;
    margin-right: 3px;
    width: 10px;
    height: 10px;
    border: 1px solid #888;
  }

  @media (min-width: 650px) {
    .properties-list__item {
      display: flex;
      align-items: center;
    }

    .properties-list__color-block {
      display: inline-block;
      flex-basis: 10px;
      flex-shrink: 0;
      flex-grow: 0;
    }

    .properties-list__title {
      flex-basis: 128px;
      flex-grow: 0;
      flex-shrink: 0;
      margin-bottom: 0;
      margin-right: 16px;
      text-align: right;
    }

    .properties-list__content {
      width: 521px;
    }
  }
</style>
