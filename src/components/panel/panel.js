(function(window) {
  let data = null

  // Make a connection with the background script to receive data.
  const portToBackgroundScript = chrome.runtime.connect({ name: 'devtools' })

  // Listen to messages from the background script.
  portToBackgroundScript.onMessage.addListener(bootstrap)

  function bootstrap(receivedData) {
    data = receivedData

    const mainElement = document.querySelector('main')
    const pageMetaButton = document.querySelector('[data-button-page-meta]')
    const twitterButton = document.querySelector('[data-button-twitter]')

    // Initially render Page Meta
    renderPageMeta()

    pageMetaButton.addEventListener('click', renderPageMeta)
    twitterButton.addEventListener('click', renderTwitterCard)

    function renderPageMeta() {
      const title = getTitleHtml(data.pageMeta.titleSection.title, data.pageMeta.titleSection.url)
      const properties = getPropertiesHtml(data.pageMeta.propertiesSection.title, data.pageMeta.propertiesSection.items)
      const icons = getIconsHtml(data.pageMeta.iconsSection.title, data.pageMeta.iconsSection.items)

      mainElement.innerHTML = `
        ${ title}
        ${ properties}
        ${ icons}
      `
    }

    function renderTwitterCard() {
      const title = getTitleHtml(data.twitter.titleSection.title, data.twitter.titleSection.url)
      const properties = getPropertiesHtml(data.twitter.propertiesSection.title, data.twitter.propertiesSection.items)
      const preview = getTwitterPreviewHtml(data.twitter.previewSection.content)

      mainElement.innerHTML = `
        ${ title}
        ${ preview}
        ${ properties}
      `

      const iframe = document.querySelector('[data-iframe]')
      iframe.addEventListener('load', () => {
        resizeIframe(iframe)
      })

      window.addEventListener('resize', () => {
        resizeIframe(iframe)
      })
    }
  }

  function getTitleHtml(title, url) {
    return `
      <section class="section">
        <h1 class="heading-default heading">${ title}</h1>
        <p><a href="${ url}">${url}</a></p>
      </section>
    `
  }

  function getPropertiesHtml(title, items) {
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
              ${ item.title === 'theme-color' ?
                `<div class="color-block" style="background-color: ${ item.value }"></div>`
                : `` }
              <div class="properties-list__content">${ item.value}</div>
            </li>
            `).join('')}
        </ul>
      </section>
    `
  }

  function getTwitterPreviewHtml(data) {
    const type = data.type
    const title = encodeURIComponent(data.title)
    const image = encodeURIComponent(data.image)
    const description = encodeURIComponent(data.description)
    const url = encodeURIComponent(data.pageUrl)
    const previewUrlParameters = `?title=${title}&description=${description}&image=${image}&url=${url}&type=${type}`
    const previewMarkup = `
      <section class="section">
        <h2 class="heading-small heading">Preview</h2>
          <iframe data-iframe class="panel__twitter-preview" scrolling="no" src="../twitter-preview/twitter-preview.html${previewUrlParameters}" width="100%" frameborder="0"></iframe>
      </section>
    `

    return (type === 'summary' || type === 'summary_large_image')
      ? previewMarkup
      : ''
  }

  function getIconsHtml(title, items) {
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

  // Adjust iframe height to the content in contains
  function resizeIframe(element) {
    if (!element) {
      return
    }
    element.style.height = parseInt(element.contentWindow.document.body.scrollHeight + 2) + 'px';
  }
})(window)
