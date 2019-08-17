monitorPageChanges()
sendContentChange()

// Listen to messages from the background script.
chrome.runtime.onMessage.addListener((message) => {
  console.log('incoming message in content.js', message)
  if (message && message.action === 'get-data') {
    const head = getHeadData()
    const {tabId} = message
    chrome.runtime.sendMessage({
      from: 'content',
      action: 'new-data',
      data: {head},
      tabId
    })
  }
})

// Send data to the background script.
function sendContentChange() {
  chrome.runtime.sendMessage({
    action: 'content-changed',
    from: 'content'
  })
}

function getHeadData() {
  const url = window.location.href
  const title = document.querySelector('title').textContent

  const elementsToJson = elements => Array.from(elements).map(element => {
    return Array.from(element.attributes).reduce((obj, attr) => {
      return {
        ...obj,
        [attr.nodeName]: attr.nodeValue
      }
    }, {})
  })

  const head = {
    url,
    title,
    link: elementsToJson(document.querySelectorAll('head link')),
    meta: elementsToJson(document.querySelectorAll('head meta')),
  }

  return head
}

function monitorPageChanges() {
  const headElement = document.querySelector('head')
  const observerOptions = {
    childList: true,
    attributes: true,
    subtree: true,
    characterData: true
  }
  const observer = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if ((mutation.type === 'attributes' && mutation.target.nodeName === 'META') || mutation.type === 'characterData' || mutation.type === 'childList') {
        console.log('got change in head', mutation)
        sendContentChange()
      }
    })
  })
  observer.observe(headElement, observerOptions)
}
