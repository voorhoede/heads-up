createPreview()

function createPreview() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const description = params.get('description')
  const url = params.get('url')
  const imageSpecified = (params.get('imageSpecified') === 'true')
  const img = params.get('image')
  const imageIsBig = (params.get('imageIsBig') === 'true')

  // console.log(title);
  // console.log(typeof description);
  // console.log(url);
  // console.log(imageSpecified);
  // console.log(img);
  // console.log(imageIsBig);

  const facebookElement = document.querySelector('[data-facebook-preview-card]')
  facebookElement.innerHTML = getfacebookMarkup({
    title,
    description,
    img,
    url,
    imageIsBig,
    imageSpecified
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

function getfacebookMarkup({ title, description, img, url, imageIsBig, imageSpecified
}) {

  return `
  <div class="facebook-preview">
    <a rel="noopener" target="_blank" class="facebook-preview__link-container facebook-preview__link-container--vertical ${imageIsBig ? "" : "facebook-preview__small"}">
      
    ${imageSpecified ? `
    <div class="${ img === "undefined"
        ? `facebook-preview__media facebook-preview__media--image-fallback`
        : `facebook-preview__fixed-ratio facebook-preview__ratio`}">
        ${ img === "undefined"
        ? ``
        : `<img src="${img}" class="facebook-preview__fixed-ratio-content" />`}
      </div>
      `: ``
    }

      <div class="facebook-preview__wrapper">
      <div class="facebook-preview__hostname">${ getHostName(url)}</div>
        <div class="facebook-preview__content">
          <div class="facebook-preview__title">${ title}</div>
          ${description === "null" ? "" : `<div class="facebook-preview__description">${description}</div>`}
        </div>
      </div>
    </a>
  </div>
`
}