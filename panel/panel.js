const mainElement = document.querySelector('main')

// Make a connection with the background script to receive data.
const portToBackgroundScript = chrome.runtime.connect({ name: 'devtools' })

// Listen to messages from the background script.
portToBackgroundScript.onMessage.addListener(onRenderPanel)

function onRenderPanel(data) {
  const pageMetaButton = document.querySelector('[data-button-page-meta]')
  const twitterButton = document.querySelector('[data-button-twitter]')

  pageMetaButton.addEventListener('click', function() {
    onButtonPageMetaClicked(event, data)
  })

  twitterButton.addEventListener('click', function () {
    onButtonTwitterClicked(event, data)
  })
}

function onButtonPageMetaClicked(event, data) {
  const title = getTitle({ title: data.pageMeta.title, url: data.url })
  const properties = getProperties(data.pageMeta.content)

  mainElement.innerHTML = `
  ${ title }
  ${ properties }
  `
}

function onButtonTwitterClicked(event, data) {
  const title = getTitle({ title: data.twitter.title, url: data.url })
  const properties = getProperties(data.twitter.content)

  mainElement.innerHTML = `
  ${ title}
  ${ properties}
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

function getProperties(content) {
  return `
    <section class="section">
      <h2 class="heading-small heading">Properties</h2>
      <ul class="properties-list">
        ${content.map(item => `
          <li class="properties-list__item">
            <h3 class="properties-list__title">${ item.title}</h3>
            <div class="properties-list__content">${ item.value}</div>
          </li>
          `).join('')}
      </ul>
    </section>
  `
}