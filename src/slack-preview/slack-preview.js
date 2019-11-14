


createPreview()

function createPreview() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const description = params.get('description')
  const imgString = params.get('image')
  const url = params.get('url')
  const type = params.get('card')
  const theme = params.get('theme')
  const favicon = params.get('favicon')

  const slackElement = document.querySelector('[data-slack-preview-card]')
  getslackMarkup({
    title,
    description,
    imgString,
    url,
    type,
    favicon
  }).then(html => slackElement.innerHTML = html)

  /**
   * setting 'theme_dark' class if parent window is in dark mode
   * class '-theme-with-dark-background' is taken from dev tools env
   * src: https://github.com/ChromeDevTools/devtools-frontend/blob/02a851d01de158d8c0a8fd1d3af06649b5379bd6/front_end/ui/inspectorStyle.css
   */
  if (theme === 'dark') document.body.classList.add('-theme-with-dark-background')
}


function getslackMarkup({ title, description, imgString, url, type, favicon }) {
  // const slackLink = url ? `href="${url}"` : ''

  function getMeta(url) {
    return new Promise((resolve) => {
      var img = new Image();
      img.src = url;
      img.onload = () => resolve(img)
    })
  }

  return getMeta(imgString).then(img => generateHtml({ img, title, description, imgString, url, type, favicon }))
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

function emojiCount() {
  return Math.floor(Math.random() * 10) + 1
}

function getImageWeight(img) {
  console.log(img);
  return ''
}

function generateHtml({ img, title, description, imgString, url, type, favicon }) {
  const isSquare = img.width === img.height
  console.log(`isSquare: ${isSquare}`);
  return `
        <div class="${ type === 'summary' ? `slack-preview is-small` : `slack-preview`}">
      <span class="slack-preview__sidebar"></span>
        <a rel="noopener" target="_blank" class="${type === 'summary' ? `slack-preview__link-container` : `slack-preview__link-container slack-preview__link-container--vertical`} ">
        <div class="slack-preview__content">
        <div class="slack-preview__domain">
          <div class="slack-preview__hostname"><img class="slack-preview__favicon" src="${favicon}" alt="">${getHostName(url)}</div></div>
      </div>
          <div class="slack-preview__title">${ title}</div>
          <div class="slack-preview__description">${ description}${getImageWeight(imgString)}</div>
          <div class="${ imgString
      ? `${type === 'summary'
        ? `slack-preview__media`
        : `slack-preview__fixed-ratio slack-preview__ratio`}`
      : `slack-preview__media slack-preview__media--image-fallback`}">
            ${ imgString
      ? `<img src="${imgString}" class="${type === 'summary'
        ? `slack-preview__image`
        : `slack-preview__fixed-ratio-content`}" />`
      : `<div class="slack-preview__image-fallback"></div>`}
          </div>

        </a>
      </div>
      <div class="slack-preview__emoji">
      <img src="https://cultofthepartyparrot.com/parrots/hd/parrot.gif" alt=""><p>${emojiCount()}</p>
      </div>
    `
}