// Create a panel in de Devtools
chrome.devtools.panels.create(
  "Heads Up",
  "icons/icon-96.png",
  "devtools/panel.html",
  onPanelHandler
)

function onPanelHandler(panel) {
  // Make a connection with the background script to receive data
  const port = chrome.runtime.connect({ name: 'devtools' })

  port.onMessage.addListener(function (msg) {
    console.log('received message from background in devtools', msg)
  })
}