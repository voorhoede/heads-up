const url = window.location.href
const twitterCard = document.querySelector('meta[name="twitter:card"]').getAttribute('content')
const twitterTitle = document.querySelector('meta[name="twitter:title"]').getAttribute('content')
const twitterDescription = document.querySelector('meta[name="twitter:description"]').getAttribute('content')
const twitterImage = document.querySelector('meta[name="twitter:image"]').getAttribute('content')

const twitter = {
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage
}

console.log(twitter)
// Send data to the background script.
chrome.runtime.sendMessage(twitter)