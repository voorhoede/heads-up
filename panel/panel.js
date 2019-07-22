"use strict";

const mainElement = document.querySelector('main')

// Make a connection with the background script to receive data.
const portToBackgroundScript = chrome.runtime.connect({ name: 'devtools' })

// Listen to messages from the background script.
portToBackgroundScript.onMessage.addListener(onSetupPanel)

function onSetupPanel(data) {
  const pageMetaButton = document.querySelector('[data-button-page-meta]')
  const twitterButton = document.querySelector('[data-button-twitter]')
  renderPanel({
    title: data.pageMeta.title,
    url: data.url,
    items: data.pageMeta.items
  })

  pageMetaButton.addEventListener('click', function() {
    renderPanel({
      title: data.pageMeta.title, 
      url: data.url, 
      items: data.pageMeta.items 
    })
  })

  twitterButton.addEventListener('click', function () {
    renderPanel({
      title: data.twitter.title,
      url: data.url,
      items: data.twitter.items
    })
  })
}

function renderPanel({ title, url, items }) {
  const titleSection = getTitle({ title, url })
  const propertiesSection = getProperties(items)

  mainElement.innerHTML = `
    ${ titleSection}
    ${ propertiesSection}
  `
}

function getTitle({ title, url }) {
  return `
    <section class="section">
      <h1 class="heading-default heading">${ title }</h1>
      <p><a href="${ url }">${ url }</a></p>
    </section>
  `
}

function getProperties(items) {
  if (Array.isArray(items) && items.length === 0) {
    return `
      <section class="section">
        <h2 class="heading-small heading">Properties</h2>
        <p>No meta tags detected.</p>
      </section>  
    `
  }

  return `
    <section class="section">
      <h2 class="heading-small heading">Properties</h2>
      <ul class="properties-list">
        ${items.map(item => `
          <li class="properties-list__item">
            <h3 class="properties-list__title">${ item.title}</h3>
            <div class="properties-list__content">${ item.value}</div>
          </li>
          `).join('')}
      </ul>
    </section>
  `
}