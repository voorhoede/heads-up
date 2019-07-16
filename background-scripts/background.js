let dataReceived = null

// The background script acts as a mediator between the content script and the devtools page.
chrome.runtime.onMessage.addListener(onListen)

function onListen(data) {
  dataReceived = data
}

// Listen to the connection of devtools.js to send data
chrome.runtime.onConnect.addListener(function (port) {
  console.log('onConnect in background', port)
  if (port.name !== 'devtools') {
    return false
  }

  // Send message to devtools.js
  port.postMessage(dataReceived)
})