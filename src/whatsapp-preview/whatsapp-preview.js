
createPreview()

function createPreview() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const description = params.get('description')
  const image = params.get('image')
  const url = params.get('url')

  const whatsappElement = document.querySelector('[data-whatsapp-preview-card]')
  whatsappElement.innerHTML = getwhatsappMarkup({
    title,
    description,
    image,
    url,
  })
}

function currentTime() {
  return new Date().toLocaleTimeString().substr(0, 5)
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

function getwhatsappMarkup({ title, description, image, url, }) {

  return `
      <div class="whatsapp-preview">
        <a rel="noopener" target="_blank">
        <div class="whatsapp-top">  
          ${ image ? `<div class="whatsapp-preview__media"><img src="${image}" class="whatsapp-preview__image" /></div>` : ``}
          <div>
          <div class="whatsapp-preview__content">
          ${title !== 'undefined' ? `<div class="whatsapp-preview__title">${title}</div>` : ''}
          <div class="whatsapp-preview__description">${description}</div>
          </div>
          <div class="whatsapp-preview__url">${ getHostName(url)}</div>
          </div>
          </div>
          <div class="whatsapp-preview__domain">
              <div class="whatsapp-preview__hostname">${ url}
              <span class="whatsapp-preview__timewrapper">
                <time class="whatsapp-preview__time">${currentTime()}</time>   
                <span class="whatsapp-preview__checkmark"><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15"><path fill="#4FC3F7" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>
                </span> 
          </span>
              </div>
              
        </a>
        <span class="whatsapp-preview__tail">
        <svg version="1.1" id="Laag_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 14.3 22.9" style="enable-background:new 0 0 14.3 22.9;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#DCF8C6;}
</style>
<g>
	<path class="st0" d="M13.7,4.8L0,22.9V0h11.3C13.8,0,15.2,2.8,13.7,4.8z"/>
</g>
</svg>
     </span>
      </div>
    `
}
