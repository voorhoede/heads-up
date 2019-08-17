(function(window) {
  let data = null

  // Make a connection with the background script to receive data.
  const portToBackgroundScript = chrome.runtime.connect({ name: 'devtools' })

  // Listen to messages from the background script.
  portToBackgroundScript.onMessage.addListener(bootstrap)

  function bootstrap(receivedData) {
    data = receivedData

    const mainElement = document.querySelector('main')
    const twitterButton = document.querySelector('[data-button-twitter]')

    twitterButton.addEventListener('click', renderTwitterCard)

    function renderTwitterCard() {
      const { titleSection, propertiesSection, previewSection } = data.twitter
      const title = getTitleHtml(titleSection.title, titleSection.url)
      const properties = getPropertiesHtml(propertiesSection.title, propertiesSection.items)
      const titlePreview = encodeURIComponent(previewSection.content.title)
      const imagePreview = encodeURIComponent(previewSection.content.image)
      const descriptionPreview = encodeURIComponent(previewSection.content.description)
      const urlPreview = encodeURIComponent(previewSection.content.pageUrl)
      const typePreview = previewSection.content.type
      const previewUrlParameters = `?title=${titlePreview}&description=${descriptionPreview}&image=${imagePreview}&url=${urlPreview}&type=${typePreview}`

      const previewMarkup = `
        <section class="section">
          <h2 class="heading-small heading">Preview</h2>
            <iframe data-iframe class="panel__twitter-preview" scrolling="no" src="../twitter-preview/twitter-preview.html${previewUrlParameters}" width="100%" frameborder="0"></iframe>
        </section>
      `

      mainElement.innerHTML = `
        ${ title }
        ${ previewMarkup }
        ${ properties }
      `

      const iframe = document.querySelector('[data-iframe]')
      iframe.addEventListener('load', () => {
        resizeIframe(iframe)
      })

      window.addEventListener('resize', () => {
        resizeIframe(iframe)
      })
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
                ${ item.title === 'theme-color'
                  ? `<span class="properties-list__color-block" style="background-color: ${ item.value }"></span>`
                  : ``
                }
                <div class="properties-list__content">${ item.value}</div>
              </li>
              `).join('')
            }
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
  }
})(window)
