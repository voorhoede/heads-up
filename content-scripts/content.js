"use strict";

// Send data to the background script.
chrome.runtime.sendMessage(getHeadData())

// Listen to messages from the background script.
chrome.runtime.onMessage.addListener(function (message) {
  if (message && message.action === 'reload-panel') {
    chrome.runtime.sendMessage(getHeadData())
  }
})

monitorPageChanges()

function getHeadData() {
  const url = window.location.href
  const twitterCard = document.querySelector('meta[name="twitter:card"]')
  const twitterTitle = document.querySelector('meta[name="twitter:title"]')
  const twitterDescription = document.querySelector('meta[name="twitter:description"]')
  const twitterImage = document.querySelector('meta[name="twitter:image"]')
  const metaTitle = document.querySelector('title').textContent
  const metaViewport = document.querySelector('meta[name="viewport"]')
  const metaThemeColor = document.querySelector('meta[name="theme-color"]')
  
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
    },
    iconsSection: {
      title: 'Favicons',
      items: getIcons()
    }
  }

  const twitter = {
    titleSection: {
      title: 'Twitter',
      url
    },
    previewSection: {
      title: 'Preview',
      content: getTwitterPreview()
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

function getTwitterPreview() {
  const twitterCard = document.querySelector('meta[name="twitter:card"]')
  const twitterTitle = document.querySelector('meta[name="twitter:title"]')
  const twitterDescription = document.querySelector('meta[name="twitter:description"]')
  const twitterImage = document.querySelector('meta[name="twitter:image"]')
  const hostname = (new URL(window.location.href)).hostname

  // Show small Twitter preview
  if (getMetaContent(twitterCard) === 'summary') {
    return {
      type: 'small',
      title: encodeURIComponent(getMetaContent(twitterTitle)),
      description: encodeURIComponent(getMetaContent(twitterDescription)),
      image: encodeURIComponent(getMetaContent(twitterImage)),
      hostname
    }
  }
  return {}
}

function getIcons() {
  function urlCheck(iconUrl) {
    if (!iconUrl.startsWith('http')) {
      return `${getHostName()}${iconUrl}`
    }
    return iconUrl

    function getHostName() {
      const url = new URL(window.location.href)
      return `${url.protocol}//${url.hostname}`
    }
  }

  function getFaviconIco() {
    const favicon = document.querySelector('link[rel="shortcut icon"]')

    if (favicon && favicon.getAttribute('href')) {
      return {
        url: urlCheck(favicon.getAttribute('href')),
        sizes: '',
        type: favicon.getAttribute('type'),
      }
    }
    return []
  }

  function getPngIcons() {
    const icons = document.querySelectorAll('link[rel="icon"]')

    return [...icons].map(icon => (
      {
        url: urlCheck(icon.getAttribute('href')),
        sizes: icon.getAttribute('sizes'),
        type: icon.getAttribute('type'),
      })
    )
  }

  return [
    getFaviconIco(),
    getPngIcons()
  ]
  .filter(Boolean)
  .flat()
}

function monitorPageChanges() {
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
