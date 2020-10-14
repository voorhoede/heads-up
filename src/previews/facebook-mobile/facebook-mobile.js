import html from '../../heads-up/lib/html'

createPreview()

function createPreview() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const description = params.get('description')
  const url = params.get('url')
  const imageSpecified = (params.get('imageSpecified') === 'true')
  const img = params.get('image')
  const mobileImgIsBig = (params.get('mobileImgIsBig') === 'true')
  const theme = params.get('theme')

  const facebookElement = document.querySelector('[data-facebook-preview-card]')
  facebookElement.innerHTML = getfacebookMarkup({
    title,
    description,
    img,
    url,
    mobileImgIsBig,
    imageSpecified,
    theme
  })
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

function getfacebookMarkup({ title, description, img, url, mobileImgIsBig, imageSpecified, theme
}) {

  return html`
  <div class="facebook-preview">
    <a rel="noopener" target="_blank" class="facebook-preview__link-container facebook-preview__link-container--vertical ${mobileImgIsBig ? "" : "facebook-preview__small"}">

    ${imageSpecified ? html`
    <div class="${ img === "undefined"
        ? `facebook-preview__media facebook-preview__media--image-fallback`
        : `facebook-preview__fixed-ratio facebook-preview__ratio`}">
        ${ img === "undefined"
        ? ``
        : html`<img src="${img}" class="facebook-preview__fixed-ratio-content" />`}
      </div>
      `: ``
    }

      <div class="facebook-preview__wrapper">
      <div class="facebook-preview__hostname">${ getHostName(url)}</div>
        <div class="facebook-preview__content">
          <div class="facebook-preview__title">${ title}</div>
          ${description === "null" ? "" : html`<div class="facebook-preview__description">${description}</div>`}
        </div>
      </div>
    </a>
    <div class="facebook-preview__interaction-wrapper ${theme}">
    <div class="facebook-preview__interaction-stats">
      <i class="facebook-preview__interaction"></i>
      <p>${Math.floor(Math.random() * 488) + 411}</p>
      </div>
    <div class="facebook-preview__interaction-stats">
      <p>${Math.floor(Math.random() * 388) + 11} comments</p>
      <p>${Math.floor(Math.random() * 88) + 11} shares</p>
      </div>
    </div>
  </div>
`
}
