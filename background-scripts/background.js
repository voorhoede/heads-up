let dataReceived = null

// The background script acts as a mediator between the content script and the devtools page.
chrome.runtime.onMessage.addListener(onListen)

function onListen(data) {
  dataReceived = data
}

// Listen to a connection to send data
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name !== 'devtools') {
    return false
  }

  // Send data to the devtools (panel)
  port.postMessage(dataReceived)
})