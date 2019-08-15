"use strict";

let dataReceived = null
let portToPanel = null


// The background script acts as a mediator between the content script and the devtools page.
chrome.runtime.onMessage.addListener((data) => {

  console.log('got message in background', data)
  dataReceived = data

  // Send data to panel.js
  if (portToPanel) {
    portToPanel.postMessage(data)
  }
})

// Listen to a connection to send data
chrome.runtime.onConnect.addListener((port) => {
  portToPanel = port
  if (portToPanel.name !== 'devtools') {
    return false
  }
  
  // Send data to the (devtools) panel script
  portToPanel.postMessage(dataReceived)
})

// Listen to events from the content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Send a message to the content script
      chrome.tabs.sendMessage(tabs[0].id, { action: 'reload-panel' })
    })
  }
})