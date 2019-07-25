"use strict";

// Make a connection with the background script to receive data.
const portToBackgroundScript = chrome.runtime.connect({ name: 'devtools' })

// Listen to messages from the background script.
portToBackgroundScript.onMessage.addListener(onSetupPanel)

function onSetupPanel(data) {
  const pageMetaButton = document.querySelector('[data-button-page-meta]')
  const twitterButton = document.querySelector('[data-button-twitter]')

  function getPageMeta(data) {
    const { titleSection, propertiesSection, faviconsSection } = data.pageMeta
    const title = getTitle({
      title: titleSection.title,
      url: titleSection.url
    })

    const properties = getProperties({
      title: propertiesSection.title,
      items: propertiesSection.items
    })
    
    const favicons = getFavicons({
      title: faviconsSection.title,
      items: faviconsSection.items
    })

    return `
      ${ title }
      ${ properties }
      ${ favicons }
    `
  }

  function getTwitter(data) {
    const { titleSection, propertiesSection } = data.twitter
    const titleArea = getTitle({
      title: titleSection.title,
      url: titleSection.url
    })

    const propertiesArea = getProperties({
      title: propertiesSection.title,
      items: propertiesSection.items
    })
    
    return `
      ${ titleArea }
      ${ propertiesArea }
    `
  }

  renderPanel(getPageMeta(data))

  pageMetaButton.addEventListener('click', function() {
    renderPanel(getPageMeta(data))
  })

  twitterButton.addEventListener('click', function () {
    renderPanel(getTwitter(data))
  })
}

function renderPanel(data) {
  const mainElement = document.querySelector('main')
  mainElement.innerHTML = data
}

function getTitle({ title, url }) {
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

function getFavicons({ title, items }) {
  if (Array.isArray(items) && items.length === 0) {
    return `
      <section class="section">
        <h2 class="heading-small heading">${ title }</h2>
        <p>No favicons detected.</p>
      </section>  
    `
  }

  return `
    <section class="section">
      <h2 class="heading-small heading">${ title }</h2>
      <ul>
        ${items.map(({type, sizes, url }) => `
          <li>
            <div>${ type }<div>
            <div>${ sizes }<div>
            <div><img src="${ url }"></div>
          </li>
        `).join('')}
      </ul>
    </section>
  `
}