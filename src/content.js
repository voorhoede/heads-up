// Send data to the background script.
chrome.runtime.sendMessage(getHeadData())

// Listen to messages from the background script.
chrome.runtime.onMessage.addListener((message) => {
  if (message && message.action === 'reload-panel') {
    chrome.runtime.sendMessage(getHeadData())
  }
})

monitorPageChanges()

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

  console.log('meheheheh')
  console.log({ head })
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
        chrome.runtime.sendMessage(getHeadData())
      }
    })
  })
  observer.observe(headElement, observerOptions)
}
