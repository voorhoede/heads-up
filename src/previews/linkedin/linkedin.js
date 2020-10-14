import html from '../../heads-up/lib/html'

createPreview()

function createPreview() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const image = params.get('image')
  const url = params.get('url')
  const imageIsBig = (params.get('imageIsBig') === 'true')
  const theme = params.get('theme')

  const linkedinElement = document.querySelector('[data-linkedin-preview-card]')
  linkedinElement.innerHTML = getlinkedinMarkup({
    title,
    image,
    url,
    imageIsBig,
    theme
  })
}

function getHostName(url) {
  if (!url) {
    return "";
  }
  const hostname = new URL(url).hostname;
  const wwwPrefix = "www.";
  return hostname.startsWith(wwwPrefix)
    ? hostname.slice(wwwPrefix.length)
    : hostname;
}

function getlinkedinMarkup({ title, image, url, imageIsBig, theme }) {
  return html`
    <div class="linkedin-preview">
      <a rel="noopener" target="_blank" class="linkedin-preview__link-container ${imageIsBig ? "" : "linkedin-preview__small"}">
        <div class="${image ? `linkedin-preview__fixed-ratio linkedin-preview__ratio` : `linkedin-preview__media linkedin-preview__media--image-fallback`}">
          ${image ? html`<img src="${image}" class="linkedin-preview__fixed-ratio-content"/>` : html`<div class="linkedin-preview__image-fallback"></div>`}
        </div>
        <div class="linkedin-preview__content">
          <div class="linkedin-preview__title">${title}</div>
          <div class="linkedin-preview__domain">
            <div class="linkedin-preview__hostname">${getHostName(url)}</div>
          </div>
        </div>
      </a>
    </div>
    <div class="linkedin-preview__like">
      <svg enable-background="new 0 0 43.6 43.6" version="1.1" viewBox="0 0 43.6 43.6" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0 48)">
          <path fill="none" d="m21.8-48c12 0 21.8 9.8 21.8 21.8s-9.8 21.8-21.8 21.8-21.8-9.7-21.8-21.8c0-12 9.8-21.8 21.8-21.8z"/>
          <circle fill-rule="evenodd" clip-rule="evenodd" fill="#1485BD" cx="21.8" cy="-26.2" r="19.1"/>
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#E6F7FF" d="m32.5-28.2h-1.5c-0.1 0-0.4-0.5-1.1-1.3-1-1.1-2.1-2.5-2.9-3.2-2-1.7-3.6-3.8-4.7-6.1-0.7-1.4-0.7-2-2-2-1.1 0.1-1.9 1.1-1.8 2.2 0 0.4 0.2 1.7 0.3 2.2 0.6 2.1 1.5 4.2 2.7 6h1.5-11.7c-0.7 0-1.3 0.3-1.8 0.8s-0.7 1.1-0.6 1.8c0.1 1.3 1.2 2.3 2.5 2.3h0.4c-0.6 0-1.1 0.3-1.5 0.7s-0.6 1-0.6 1.5c0 1.1 0.9 2.1 2 2.2-0.7 0.5-1 1.4-0.8 2.2s0.9 1.5 1.7 1.6c-0.3 0.5-0.3 1-0.2 1.5 0.3 1 1.2 1.7 2.3 1.7h6.3c0.8 0 1.6-0.1 2.4-0.3l3.9-1.1h5.2c2.7-0.2 3.5-12.7 0-12.7z"/>
          <path fill="none" d="m19.9-37.9c0.5 2.7 1.5 5.2 3.1 7.4"/>
          <path fill="none" d="M16.2-15.6h5.9c1.8-0.4,3.5-0.9,5.2-1.5H31"/>
          <path fill="#004B7C" d="m14.6-12.6c-1.6 0-3.1-1.1-3.5-2.7-0.1-0.4-0.1-0.8-0.1-1.1-0.9-0.7-1.5-1.7-1.5-2.9 0-0.4 0.1-0.8 0.2-1.1-0.8-0.7-1.3-1.7-1.4-2.8 0-0.6 0.1-1.2 0.4-1.8-0.7-0.6-1.2-1.6-1.3-2.6s0.2-2.1 0.9-2.9 1.8-1.2 2.9-1.3h6.5c-0.2-0.4-0.4-0.7-0.6-1.1-0.4-0.9-0.7-1.8-0.9-2.6s-0.3-1.8-0.2-2.7c0.1-0.5 0.2-0.9 0.3-1.2 0.2-0.5 0.6-1 0.9-1.4 1.3-1.4 3.5-1.6 5-0.4 0.6 0.7 1 1.3 1.3 1.9 1 2.1 2.5 4 4.3 5.6 0.5 0.5 1.1 1.2 1.8 1.9 0.4 0.5 0.8 1 1.2 1.4 0.3 0.3 0.5 0.6 0.7 0.8h0.8c2.4 0 3.8 2.7 3.8 7.1 0 0.8-0.1 8.2-3.7 8.2h-5l-3.6 1.3c-1 0.3-1.9 0.4-2.9 0.4h-6.3c0.1 0 0.1 0 0 0zm-2.8-14.2c0.7 0 1.4 0.6 1.4 1.3s-0.6 1.4-1.3 1.4c-0.2 0-0.4 0.1-0.5 0.2s-0.2 0.3-0.2 0.5c0 0.5 0.4 0.8 0.8 0.9 0.6 0.1 1 0.4 1.2 1s0 1.1-0.5 1.4c-0.2 0.2-0.3 0.4-0.3 0.7 0 0.4 0.3 0.8 0.7 0.8 0.4 0.1 0.8 0.4 1 0.8s0.2 0.9-0.1 1.2c-0.1 0.2-0.1 0.4-0.1 0.6 0.1 0.3 0.5 0.6 0.9 0.6h6.2c0.7 0 1.4-0.1 2.1-0.3l3.8-1.3c0.1 0 0.3-0.1 0.4-0.1h5.2c0.4-0.4 1.2-3.7 0.9-7.1-0.2-2.1-0.8-2.7-0.9-2.8h-1.6c-0.7 0-1-0.5-1.4-0.9-0.2-0.2-0.4-0.5-0.6-0.8-0.4-0.5-0.9-1-1.3-1.5-0.6-0.7-1.1-1.3-1.6-1.7-2-1.8-3.7-4-4.9-6.5-0.2-0.4-0.4-0.8-0.7-1.1-0.2-0.2-0.8-0.1-1.1 0.3-0.2 0.2-0.4 0.4-0.5 0.7-0.1 0.1-0.1 0.3-0.2 0.5 0 0.5 0 1.1 0.2 1.7 0.2 0.8 0.4 1.4 0.7 2.1 0.4 0.7 0.9 1.5 1.5 2.3 0.2 0.2 0.4 0.4 0.5 0.6s0.1 0.4 0.1 0.6v0.1c0 0.8-0.6 1.4-1.4 1.4h-9.1c-0.2 0-0.6 0.1-0.8 0.4-0.2 0.2-0.3 0.5-0.2 0.8 0.1 0.7 0.6 1.1 1.1 1.1h0.6z"/>
        </g>
      </svg>
      <p class="${theme} linkedin-preview__like-count">${Math.floor(Math.random() * 98) + 1}</p>
    </div>
  `
}
