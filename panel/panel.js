let headData = null
const mainElement = document.querySelector('main')

// Make a connection with the background script to receive data
const portToBackgroundScript = chrome.runtime.connect({ name: 'devtools' })

portToBackgroundScript.onMessage.addListener(function (data) {
  mainElement.innerHTML = `
  <section>
    <h1>${ data.twitter.title }</h1>
    <p><a href="${ data.url }">${ data.url }</a></p>
  </section>

  <section>
    <h2>Properties</h2>
    <dl>
      ${ data.twitter.data.map(item => `
        <dt>${ item.title }</dt>
        <dd>${ item.value }</dd>
      `).join('') }
    </dl>
  </section>
  `
})