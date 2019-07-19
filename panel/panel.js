let headData = null
const mainElement = document.querySelector('main')

// Make a connection with the background script to receive data
const portToBackgroundScript = chrome.runtime.connect({ name: 'devtools' })

portToBackgroundScript.onMessage.addListener(function (data) {
  mainElement.innerHTML = `
  <section class="section">
    <h1 class="heading-default heading">${ data.twitter.title }</h1>
    <p><a href="${ data.url }">${ data.url }</a></p>
  </section>

  <section class="section">
    <h2 class="heading-small heading">Properties</h2>
    <ul class="properties-list">
      ${ data.twitter.data.map(item => `
      <li class="properties-list__item">
        <h3 class="properties-list__title">${ item.title }</h3>
        <div class="properties-list__content">${ item.value }</div>
      </li>
      `).join('') }
    </ul>
  </section>
  `
})