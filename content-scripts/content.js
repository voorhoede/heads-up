let headData = null
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

//  If the Twitter meta tags are not available, Twitter falls back to the Open Graph property.
if (twitterCard) {
  headData = {
    url,
    twitter: {
      title: 'Twitter',
      data: [
        { title: getMetaName(twitterCard), value: getMetaContent(twitterCard) },
        { title: getMetaName(twitterTitle), value: getMetaContent(twitterTitle) },
        { title: getMetaName(twitterDescription), value: getMetaContent(twitterDescription) },
        { title: getMetaName(twitterImage), value: getMetaContent(twitterImage) },
      ]
    }
  }
} else if (openGraphTitle) {
  headData = {
    url,
    twitter: {
      title: 'Twitter',
      data: [
        { title: getMetaProperty(openGraphType), value: getMetaContent(openGraphType) },
        { title: getMetaProperty(openGraphTitle), value: getMetaContent(openGraphTitle) },
        { title: getMetaProperty(openGraphImage), value: getMetaContent(openGraphImage) },
        { title: getMetaProperty(openGraphUrl), value: getMetaContent(openGraphUrl) },
        { title: getMetaProperty(openGraphDescription), value: getMetaContent(openGraphDescription) },
        { title: getMetaProperty(openGraphAudio), value: getMetaContent(openGraphAudio) },
        { title: getMetaProperty(openGraphVideo), value: getMetaContent(openGraphVideo) },
      ]
    }
  }
} else {
  headData = {
    url,
    twitter: {}
  }
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

// Send data to the background script.
chrome.runtime.sendMessage(headData)