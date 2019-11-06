createPreview()

function createPreview() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const description = params.get('description')
  const image = params.get('image')
  const url = params.get('url')
  const type = params.get('card')
  const theme = params.get('theme')

  const facebookElement = document.querySelector('[data-facebook-preview-card]')
  facebookElement.innerHTML = getfacebookMarkup({
    title,
    description,
    image,
    url,
    type
  })

  /**
   * setting 'theme_dark' class if parent window is in dark mode
   * class '-theme-with-dark-background' is taken from dev tools env
   * src: https://github.com/ChromeDevTools/devtools-frontend/blob/02a851d01de158d8c0a8fd1d3af06649b5379bd6/front_end/ui/inspectorStyle.css
   */
  if(theme === 'dark') document.body.classList.add('-theme-with-dark-background')
}


function getfacebookMarkup({ title, description, image, url, type }) {

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

    return `
      <div class="${ type === 'summary' ? `facebook-preview is-small` : `facebook-preview` }">
        <a rel="noopener" target="_blank" class="${ type === 'summary' ? `facebook-preview__link-container` : `facebook-preview__link-container facebook-preview__link-container--vertical` } ">
         <div class="${ image
            ? `${ type === 'summary'
              ? `facebook-preview__media`
              : `facebook-preview__fixed-ratio facebook-preview__ratio` }`
            : `facebook-preview__media facebook-preview__media--image-fallback` }
            ${image === 'undefined' ? `facebook-preview__none`: `` }">
            ${ image
              ? `<img src="${ image }" class="${ type === 'summary'
                ? `facebook-preview__image`
                : `facebook-preview__fixed-ratio-content` }" />`
              : `<div class="facebook-preview__image-fallback"></div>` }
          </div>

          <div class="facebook-preview__content">
           ${url !== null?<div class="facebook-preview__hostname">${ getHostName(url) }</div>:''}
           <div class="facebook-preview__title">${ title }</div>
          <div class="facebook-preview__description"> ${description.length > 0 ? description : 'There is no description metatag declared. body.InnerText will be shown'}</div>
          </div>
        </a>
      </div>
    `
}
