let headData = null
const mainElement = document.querySelector('main')

// Make a connection with the background script to receive data
const portToBackgroundScript = chrome.runtime.connect({ name: 'devtools' })

portToBackgroundScript.onMessage.addListener(function (data) {
  let propertiesSection = null
  if (!data.twitter.content) {
    propertiesSection = `<p>There are no Twitter or Open Graph meta tags present in the <code>head</code>.</p>`
  } else {
    propertiesSection = `
    <ul class="properties-list">
      ${data.twitter.content.map(item => `
        <li class="properties-list__item">
          <h3 class="properties-list__title">${ item.title}</h3>
          <div class="properties-list__content">${ item.value}</div>
        </li>
        `).join('')}
    </ul>
  `
  }

  mainElement.innerHTML = `
  <section class="section">
    <h1 class="heading-default heading">${ data.twitter.title }</h1>
    <p><a href="${ data.url }">${ data.url }</a></p>
  </section>

  <section class="section">
    <h2 class="heading-small heading">Properties</h2>
    ${ propertiesSection }
  </section>
  `
})