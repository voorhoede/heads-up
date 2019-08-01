"use strict";

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
  const twitterCard = document.querySelector('meta[name="twitter:card"]')
  const twitterTitle = document.querySelector('meta[name="twitter:title"]')
  const twitterDescription = document.querySelector('meta[name="twitter:description"]')
  const twitterUrl = document.querySelector('meta[name="twitter:url"]')
  const twitterImage = document.querySelector('meta[name="twitter:image"]')
  const metaTitle = document.querySelector('title').textContent
  const metaViewport = document.querySelector('meta[name="viewport"]')
  const metaThemeColor = document.querySelector('meta[name="theme-color"]')

  const pageMeta = {
    titleSection: {
      title: 'Page meta',
      url,
    },
    propertiesSection: {
      title: 'Properties',
      items: showItems(
        [
          { title: 'title', value: metaTitle },
          { title: 'charset', value: getMetaEncoding() },
          { title: getMetaName(metaViewport), value: getMetaContent(metaViewport) },
          { title: getMetaName(metaThemeColor), value: getMetaContent(metaThemeColor) }
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
        { title: getMetaName(twitterUrl), value: getMetaContent(twitterUrl) },
        { title: getMetaName(twitterImage), value: getMetaContent(twitterImage) },
      ])
    }
  }

  return {
    pageMeta,
    twitter
  }
}

function getTwitterPreview() {
  const twitterCard = document.querySelector('meta[name="twitter:card"]')
  const twitterTitle = document.querySelector('meta[name="twitter:title"]')
  const twitterDescription = document.querySelector('meta[name="twitter:description"]')
  const twitterUrl = document.querySelector('meta[name="twitter:url"]')
  const twitterImage = document.querySelector('meta[name="twitter:image"]')
  const hostname = (new URL(window.location.href)).hostname
  const twitterCardContent = getMetaContent(twitterCard)

  // Show small Twitter preview
  if (twitterCardContent === 'summary' || twitterCardContent === 'summary_large_image') {
    return {
      type: twitterCardContent,
      title: getMetaContent(twitterTitle),
      description: getMetaContent(twitterDescription),
      url: getMetaContent(twitterUrl),
      image: getMetaContent(twitterImage),
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
  const observer = new MutationObserver((mutationList) => {
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
