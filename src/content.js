import { debounce } from 'debounce'
import * as actions from './heads-up/lib/message-actions'

const log = (...args) => console.log('%c[heads-up]', 'color:blue', ...args)
const sendMessage = (message) => {
  log('🔜 outgoing message:', message)
  chrome.runtime.sendMessage(message)
}
const emitContentChanged = debounce(() => {
  sendMessage({ action: actions.CONTENT_CHANGED })
}, 100)

emitContentChanged()
observeHead({ onChange: () => emitContentChanged() })
observeHtmlLang({ onChange: () => emitContentChanged() })

// Listen to messages from the background script.
chrome.runtime.onMessage.addListener((message) => {
  log('🔙 incoming message:', message)
  if (message && message.action === actions.GET_DATA) {
    sendMessage({
      action: actions.NEW_DATA,
      data: {
        head: getHeadData(),
      },
      tabId: message.tabId
    })
  }
})

function getHeadData() {
  return {
    url: window.location.href,
    title: document.title,
    lang: document.documentElement.lang,
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
        // log('[heads-up] <head> change detected:', mutation)
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

function observeHtmlLang({ onChange }) {
  const observer = new MutationObserver(() => {
    // log('[heads-up] html[lang] change detected')
    onChange()
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  })
}
