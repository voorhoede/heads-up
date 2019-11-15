
createPreview()

function createPreview() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const description = params.get('description')
  const imgString = params.get('image')
  const url = params.get('url')
  const type = params.get('card')

  const facebookElement = document.querySelector('[data-facebook-preview-card]')
  getfacebookMarkup({
    title,
    description,
    imgString,
    url,
    type
  }).then(html => {
    facebookElement.innerHTML = html
  })
}


function getfacebookMarkup({ title, description, imgString, url, type }) {

  function getMeta(url) {
    return new Promise((resolve) => {
      var img = new Image();
      img.src = url;
      img.onload = () => resolve(img)
    })
  }

  return getMeta(imgString).then(img => generateHtml({ img, title, description, imgString, url, type }))
}

function getHostName(url) {
  if (!url) {
    return ''
  }

  const hostname = (new URL(url).hostname)
  const wwwPrefix = 'www.'
  return hostname.startsWith(wwwPrefix)
    ? hostname.slice(wwwPrefix.length)
    : hostname

}

function generateHtml({ img, title, description, imgString, url, type }) {
  const isSquare = img.width === img.height
  console.log(`isSquare: ${isSquare}`);
  return `
  <div class="${ type === 'summary' ? `facebook-preview is-small` : `facebook-preview`}">
    <a rel="noopener" target="_blank" class="${ type === 'summary' ? `facebook-preview__link-container` : `facebook-preview__link-container facebook-preview__link-container--vertical`} ">
      <div class="${ imgString
      ? `${type === 'summary'
        ? `facebook-preview__media`
        : `facebook-preview__fixed-ratio facebook-preview__ratio`}`
      : `facebook-preview__media facebook-preview__media--image-fallback`} ${isSquare ? `facebook-preview__square-image` : ``}">
        ${ imgString
      ? `<img src="${imgString}" class="${type === 'summary'
        ? `facebook-preview__image`
        : `facebook-preview__fixed-ratio-content`}" />`
      : `<div class="facebook-preview__image-fallback"></div>`}
      </div>

      <div class="facebook-preview__content">
        <div class="facebook-preview__hostname">${ getHostName(url)}</div>
        <div class="facebook-preview__title">${ title}</div>
        <div class="facebook-preview__description">${ description}</div>
        
      </div>
    </a>
  </div>
`
}