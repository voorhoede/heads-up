let panel = null;

// Messages from content.js
chrome.runtime.onMessage.addListener(message => {
  console.log('message from content', message);
  if (message.action && panel) {
    panel.postMessage(message);
  }
});

// Listen to a connection to send data
chrome.runtime.onConnect.addListener(port => {
  panel = port;

  panel.onMessage.addListener(message => {
    console.log('message from panel', message);
    chrome.tabs.sendMessage(message.tabId, message);
  });
});
