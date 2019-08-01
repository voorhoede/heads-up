"use strict";

// Make a connection with the background script to receive data.
const portToBackgroundScript = chrome.runtime.connect({ name: 'devtools' })

// Listen to messages from the background script.
portToBackgroundScript.onMessage.addListener(onSetupPanel)

function onSetupPanel(data) {
  const pageMetaButton = document.querySelector('[data-button-page-meta]')
  const twitterButton = document.querySelector('[data-button-twitter]')

  pageMetaButton.addEventListener('click', function () {
    renderPanel(getPageMeta(data))
  })

  twitterButton.addEventListener('click', function () {
    renderPanel(getTwitter(data))
  })

  // Initial render
  renderPanel(getPageMeta(data))
}

function getPageMeta(data) {
  const { titleSection, propertiesSection, iconsSection } = data.pageMeta
  const title = getTitleHtml({
    title: titleSection.title,
    url: titleSection.url
  })

  const properties = getPropertiesHtml({
    title: propertiesSection.title,
    items: propertiesSection.items
  })

  const icons = getIconsHtml({
    title: iconsSection.title,
    items: iconsSection.items
  })

  return `
      ${ title}
      ${ properties}
      ${ icons}
    `
}

function getTwitter(data) {
  const { titleSection, previewSection, propertiesSection } = data.twitter
  const title = getTitleHtml({
    title: titleSection.title,
    url: titleSection.url
  })

  const properties = getPropertiesHtml({
    title: propertiesSection.title,
    items: propertiesSection.items
  })

  const preview = getTwitterPreviewHtml(previewSection)

  return `
      ${ title}
      ${ preview}
      ${ properties}
    `
}

function renderPanel(data) {
  const mainElement = document.querySelector('main')
  mainElement.innerHTML = data
}

function getTitleHtml({ title, url }) {
  return `
    <section class="section">
      <h1 class="heading-default heading">${ title}</h1>
      <p><a href="${ url}">${url}</a></p>
    </section>
  `
}

function getPropertiesHtml({ title, items }) {
  if (Array.isArray(items) && items.length === 0) {
    return `
      <section class="section">
        <h2 class="heading-small heading">${ title}</h2>
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

function getTwitterPreviewHtml(data) {
  const { type, hostname } = data.content
  const title = encodeURIComponent(data.content.title)
  const image = encodeURIComponent(data.content.image)
  const description = encodeURIComponent(data.content.description)
  const height = heightInPixels(type)
  const templateName = getTemplateName(type)
  const previewUrlParameters = `?title=${title}&description=${description}&image=${image}&hostname=${hostname}`
  const previewMarkup = `
    <section class="section">
      <h2 class="heading-small heading">Preview</h2>
        <iframe class="panel__twitter-preview" scrolling="no" src="../twitter-preview/twitter-${ templateName}.html${previewUrlParameters}" width="100%" frameborder="0"></iframe>
    </section>
  `

  if (type === 'summary' || type === 'summary_large_image') {
    return previewMarkup
  }
  return ''

  function heightInPixels(type) {
    if (type === 'summary') {
      return '130px'
    } else if (type === 'summary_large_image') {
      return '310xpx'
    }
    return ''
  }

  function getTemplateName(type){
    if (type === 'summary') {
      return 'small'
    } else if (type === 'summary_large_image') {
      return 'large'
    }
    return ''
  }
}

function getIconsHtml({ title, items }) {
  if (Array.isArray(items) && items.length === 0) {
    return `
      <section class="section">
        <h2 class="heading-small heading">${ title}</h2>
        <p>No favicons detected.</p>
      </section>
    `
  }

  return `
    <section class="section">
      <h2 class="heading-small heading">${ title}</h2>
      <ul class="properties-list">
        ${items.map(({ type, sizes, url }) => `
          <li class="properties-list__item">
            <div class="properties-list__title">
              ${ sizes ? `<div>${sizes}</div>` : ``}
              ${ type ? `<div>${type}</div>` : ``}
            </div>
            <div class="properties-list__content">
              <img src="${ url}" />
            </div>
          </li>
        `).join('')}
      </ul>
    </section>
  `
}
