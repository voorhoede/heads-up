"use strict";

// Send data to the background script.
chrome.runtime.sendMessage(getHeadData())

// Listen to messages from the background script.
chrome.runtime.onMessage.addListener(function (message) {
  if (message && message.action === 'reload-panel') {
    chrome.runtime.sendMessage(getHeadData())
  }
})

checkForPageChanges()

function getHeadData() {
  const url = window.location.href
  const twitterCard = document.querySelector('meta[name="twitter:card"]')
  const twitterTitle = document.querySelector('meta[name="twitter:title"]')
  const twitterDescription = document.querySelector('meta[name="twitter:description"]')
  const twitterImage = document.querySelector('meta[name="twitter:image"]')
  const metaTitle = document.querySelector('title').textContent
  const metaViewport = document.querySelector('meta[name="viewport"]')
  
  const pageMeta = {
    titleSection: {
      title: metaTitle,
      url,
    },
    propertiesSection: {
      title: 'Properties',
      items: showItems(
        [
          { title: getMetaName(metaViewport), value: getMetaContent(metaViewport) },
          { title: getMetaName(metaThemeColor), value: getMetaContent(metaThemeColor) },
          { title: 'charset', value: getMetaEncoding() }
        ]
      )
    }
  }

  const twitter = {
    titleSection: {
      title: 'Twitter',
      url
    },
    propertiesSection: {
      title: 'Properties',
      items: showItems([
        { title: getMetaName(twitterCard), value: getMetaContent(twitterCard) },
        { title: getMetaName(twitterTitle), value: getMetaContent(twitterTitle) },
        { title: getMetaName(twitterDescription), value: getMetaContent(twitterDescription) },
        { title: getMetaName(twitterImage), value: getMetaContent(twitterImage) },
      ])
    }
  }

  const headData = {
    pageMeta,
    twitter
  }

  return headData
}

function checkForPageChanges() {
  const headElement = document.querySelector('head')
  const observerOptions = {
    childList: true,
    attributes: true,
    subtree: true,
    characterData: true
  }
  const observer = new MutationObserver(function (mutationList) {
    mutationList.forEach((mutation) => {
      if ((mutation.type === 'attributes' && mutation.target.nodeName === 'META') || mutation.type === 'characterData' || mutation.type === 'childList') {
        chrome.runtime.sendMessage(getHeadData())
      }
    })
  })
  observer.observe(headElement, observerOptions)  
}

function showItems(items) {
  return items.filter(item => item.title && item.value)
}

function getMetaName(element) {
  if (!element) {
    return ''
  }
  return element.getAttribute('name')
}

function getMetaProperty(element) {
  if (!element) {
    return ''
  }
  return element.getAttribute('property')
}

function getMetaContent(element) {
  if (!element) {
    return ''
  }
  return element.getAttribute('content')
}

function getMetaEncoding() {
  const encodingElement = document.querySelector('meta[charset]')
  if (encodingElement) {
    return encodingElement.getAttribute('charset')
  }
  return ''
}
