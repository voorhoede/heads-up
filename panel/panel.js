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
    titleSection: data.pageMeta.titleSection,
    propertiesSection: data.pageMeta.propertiesSection
  })

  pageMetaButton.addEventListener('click', function() {
    renderPanel({
      titleSection: data.pageMeta.titleSection,
      propertiesSection: data.pageMeta.propertiesSection
    })
  })

  twitterButton.addEventListener('click', function () {
    renderPanel({
      titleSection: data.twitter.titleSection,
      propertiesSection: data.twitter.propertiesSection
    })
  })
}

function renderPanel({ titleSection, propertiesSection }) {
  const titleArea = getTitle({ 
    title: titleSection.title, 
    url: titleSection.url 
  })
  const propertiesArea = getProperties({ 
    title: propertiesSection.title, 
    items: propertiesSection.items 
  })

  mainElement.innerHTML = `
    ${ titleArea }
    ${ propertiesArea }
  `
}

function getTitle({ title, url }) {
  console.log('title', title)
  return `
    <section class="section">
      <h1 class="heading-default heading">${ title }</h1>
      <p><a href="${ url }">${ url }</a></p>
    </section>
  `
}

function getProperties({ title, items }) {
  if (Array.isArray(items) && items.length === 0) {
    return `
      <section class="section">
        <h2 class="heading-small heading">${ title }</h2>
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