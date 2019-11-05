
createPreview()

function createPreview() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const description = params.get('description')
  const image = params.get('image')
  const url = params.get('url')
  const type = params.get('card')
  const theme = params.get('theme')

  console.log(`title = ${title}`);
  console.log(`description = ${description}`);
  console.log(`image = ${image}`);
  console.log(`url = ${url}`);
  console.log(`type = ${type}`);
  console.log(`theme = ${theme}`);

  const whatsappElement = document.querySelector('[data-whatsapp-preview-card]')
  whatsappElement.innerHTML = getwhatsappMarkup({
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


function getwhatsappMarkup({ title, description, image, url, type }) {
    const whatsappLink = url ? `href="${ url }"` : ''

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
      <div class="${ type === 'summary' ? `whatsapp-preview is-small` : `whatsapp-preview` }">
        <a rel="noopener" target="_blank" class="${ type === 'summary' ? `whatsapp-preview__link-container` : `whatsapp-preview__link-container whatsapp-preview__link-container--vertical` } ">
        <div class="whatsapp-top">  
       
        <div class="whatsapp-preview__media">
            ${ image
              ? `<img src="${ image }" class="whatsapp-preview__image" />`
              : `<div class="whatsapp-preview__image-fallback"></div>` }
          </div>

          <div class="whatsapp-preview__content">
            <div class="whatsapp-preview__title">${ title }</div>
            <div class="whatsapp-preview__description">${ description }</div>
            <div class="whatsapp-preview__url">${ getHostName(url) }</div>
          </div>
          </div>
          <div class="whatsapp-preview__domain">
              <div class="whatsapp-preview__hostname">${ url }</div></div>
        </a>
      </div>
    `
}
