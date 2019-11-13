
createPreview()

function createPreview() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const description = params.get('description')
  const imgString = params.get('image')
  const url = params.get('url')
  const type = params.get('card')
  const theme = params.get('theme')

  const facebookElement = document.querySelector('[data-facebook-preview-card]')
  getfacebookMarkup({
    title,
    description,
    imgString,
    url,
    type
  }).then(html => facebookElement.innerHTML = html)

  /**
   * setting 'theme_dark' class if parent window is in dark mode
   * class '-theme-with-dark-background' is taken from dev tools env
   * src: https://github.com/ChromeDevTools/devtools-frontend/blob/02a851d01de158d8c0a8fd1d3af06649b5379bd6/front_end/ui/inspectorStyle.css
   */
  if (theme === 'dark') document.body.classList.add('-theme-with-dark-background')
}


function getfacebookMarkup({ title, description, imgString, url, type }) {
  const facebookLink = url ? `href="${url}"` : ''

  function getMeta(url) {
    return new Promise((resolve, reject) => {
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