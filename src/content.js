emitContentChanged()
observeHead({ onChange: () => emitContentChanged() })

// Listen to messages from the background script.
chrome.runtime.onMessage.addListener((message) => {
  console.log('incoming message in content.js', message)
  if (message && message.action === 'get-data') {
    chrome.runtime.sendMessage({
      from: 'content',
      action: 'new-data',
      data: {
        head: getHeadData(),
      },
      tabId: message.tabId
    })
  }
})

function emitContentChanged() {
  chrome.runtime.sendMessage({
    action: 'content-changed',
    from: 'content'
  })
}

function getHeadData() {
  return {
    url: window.location.href,
    title: document.title,
    link: elementsToJson(document.head.querySelectorAll('link')),
    meta: elementsToJson(document.head.querySelectorAll('meta')),
  }
}

function elementsToJson (elements) {
  return Array.from(elements).map(element => {
    return Array.from(element.attributes).reduce((obj, attr) => {
      return { ...obj, [attr.nodeName]: attr.nodeValue }
    }, {})
  })
}

function observeHead({ onChange }) {
  const observer = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if ((mutation.type === 'attributes' && mutation.target.nodeName === 'META') || mutation.type === 'characterData' || mutation.type === 'childList') {
        console.log('<head> change detected:', mutation)
        onChange()
      }
    })
  })
  observer.observe(document.head, {
    childList: true,
    attributes: true,
    subtree: true,
    characterData: true
  })
}
