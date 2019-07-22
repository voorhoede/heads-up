"use strict";

function getHeadData() {
  const url = window.location.href
  const twitterCard = document.querySelector('meta[name="twitter:card"]')
  const twitterTitle = document.querySelector('meta[name="twitter:title"]')
  const twitterDescription = document.querySelector('meta[name="twitter:description"]')
  const twitterImage = document.querySelector('meta[name="twitter:image"]')
  const openGraphType = document.querySelector('meta[property="og:type"]')
  const openGraphTitle = document.querySelector('meta[property="og:title"]')
  const openGraphImage = document.querySelector('meta[property="og:image"]')
  const openGraphUrl = document.querySelector('meta[property="og:url"]')
  const openGraphDescription = document.querySelector('meta[property="og:description "]')
  const openGraphAudio = document.querySelector('meta[property="og:audio "]')
  const openGraphVideo = document.querySelector('meta[property="og:video "]')
  const metaTitle = document.getElementsByTagName("title")[0].innerHTML
  const metaViewport = document.querySelector('[name="viewport"]')

  const pageMeta = {
    title: metaTitle,
    items: showItems([
      { title: getMetaName(metaViewport), value: getMetaContent(metaViewport) }
    ])
  }

  const twitter = {
    title: 'Twitter',
    items: showItems([
      { title: getMetaName(twitterCard), value: getMetaContent(twitterCard) },
      { title: getMetaName(twitterTitle), value: getMetaContent(twitterTitle) },
      { title: getMetaName(twitterDescription), value: getMetaContent(twitterDescription) },
      { title: getMetaName(twitterImage), value: getMetaContent(twitterImage) },
    ])
  }

  const openGraph = {
    title: 'Twitter',
    items: showItems([
      { title: getMetaProperty(openGraphType), value: getMetaContent(openGraphType) },
      { title: getMetaProperty(openGraphTitle), value: getMetaContent(openGraphTitle) },
      { title: getMetaProperty(openGraphImage), value: getMetaContent(openGraphImage) },
      { title: getMetaProperty(openGraphUrl), value: getMetaContent(openGraphUrl) },
      { title: getMetaProperty(openGraphDescription), value: getMetaContent(openGraphDescription) },
      { title: getMetaProperty(openGraphAudio), value: getMetaContent(openGraphAudio) },
      { title: getMetaProperty(openGraphVideo), value: getMetaContent(openGraphVideo) },
    ])
  }

  const headData = {
    url,
    pageMeta,
    twitter,
    openGraph
  }

  return headData
}

// Send data to the background script.
chrome.runtime.sendMessage(getHeadData())

// Listen to messages from the background script.
chrome.runtime.onMessage.addListener(function(message, id) {
  if (message && message.action === 'reload-panel') {
    chrome.runtime.sendMessage(getHeadData())
  }
})

const headElement = document.querySelector('head')
const observerOptions = {
  childList: true,
  attributes: true,
  subtree: true,
  characterData: true
}
const observer = new MutationObserver(function (mutationList) {
  mutationList.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.target.nodeName === 'META') {
      chrome.runtime.sendMessage(getHeadData())
    } else if (mutation.type === 'characterData' && mutation.target.parentElement &&    mutation.target.parentElement.nodeName === 'TITLE') {
      chrome.runtime.sendMessage(getHeadData())
    }
  })
})
observer.observe(headElement, observerOptions)  

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