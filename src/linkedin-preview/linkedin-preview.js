
createPreview()

function createPreview() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const image = params.get('image')
  const url = params.get('url')
  const type = params.get('card')
  const theme = params.get('theme')

  const linkedinElement = document.querySelector('[data-linkedin-preview-card]')
  linkedinElement.innerHTML = getlinkedinMarkup({
    title,
    image,
    url,
    type
  })

  /**
   * setting 'theme_dark' class if parent window is in dark mode
   * class '-theme-with-dark-background' is taken from dev tools env
   * src: https://github.com/ChromeDevTools/devtools-frontend/blob/02a851d01de158d8c0a8fd1d3af06649b5379bd6/front_end/ui/inspectorStyle.css
   */
  if (theme === 'dark') document.body.classList.add('-theme-with-dark-background')
}


function getlinkedinMarkup({ title, image, url, type }) {

  const like = `<svg version="1.1" id="Laag_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 43.6 43.6" style="enable-background:new 0 0 43.6 43.6;" xml:space="preserve">
<style type="text/css">
 .st0{fill:none;}
 .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#1485BD;}
 .st2{fill-rule:evenodd;clip-rule:evenodd;fill:#E6F7FF;}
 .st3{fill:#004B7C;}
</style>
<g id="Reactions-Sprite-Copy">
 <g transform="translate(0.000000, 48.000000)">
   <g>
     <g id="Like_16_NO_Ring_Consumption">
       <g>
         <path class="st0" d="M21.8-48L21.8-48c12,0,21.8,9.8,21.8,21.8l0,0c0,12-9.8,21.8-21.8,21.8l0,0C9.8-4.4,0-14.1,0-26.2l0,0
           C0-38.2,9.8-48,21.8-48z"/>
       </g>
       <g>
         <circle class="st1" cx="21.8" cy="-26.2" r="19.1"/>
       </g>
       <g>
         <path class="st2" d="M32.5-28.2H31c-0.1,0-0.4-0.5-1.1-1.3c-1-1.1-2.1-2.5-2.9-3.2c-2-1.7-3.6-3.8-4.7-6.1c-0.7-1.4-0.7-2-2-2
           c-1.1,0.1-1.9,1.1-1.8,2.2c0,0.4,0.2,1.7,0.3,2.2c0.6,2.1,1.5,4.2,2.7,6h1.5c-0.7,0-11.7,0-11.7,0c-0.7,0-1.3,0.3-1.8,0.8
           c-0.5,0.5-0.7,1.1-0.6,1.8c0.1,1.3,1.2,2.3,2.5,2.3h0.4c-0.6,0-1.1,0.3-1.5,0.7c-0.4,0.4-0.6,1-0.6,1.5c0,1.1,0.9,2.1,2,2.2
           l0,0c-0.7,0.5-1,1.4-0.8,2.2c0.2,0.8,0.9,1.5,1.7,1.6c-0.3,0.5-0.3,1-0.2,1.5c0.3,1,1.2,1.7,2.3,1.7H21c0.8,0,1.6-0.1,2.4-0.3
           l3.9-1.1c0.2,0,3.7,0,5.2,0C35.2-15.7,36-28.2,32.5-28.2z"/>
       </g>
       <g>
         <path class="st0" d="M19.9-37.9c0.5,2.7,1.5,5.2,3.1,7.4"/>
       </g>
       <g>
         <path class="st0" d="M16.2-15.6h5.9c1.8-0.4,3.5-0.9,5.2-1.5H31"/>
       </g>
       <g>
         <path class="st3" d="M14.6-12.6c-1.6,0-3.1-1.1-3.5-2.7C11-15.7,11-16.1,11-16.4c-0.9-0.7-1.5-1.7-1.5-2.9
           c0-0.4,0.1-0.8,0.2-1.1c-0.8-0.7-1.3-1.7-1.4-2.8c0-0.6,0.1-1.2,0.4-1.8c-0.7-0.6-1.2-1.6-1.3-2.6c-0.1-1,0.2-2.1,0.9-2.9
           c0.7-0.8,1.8-1.2,2.9-1.3h6.5c-0.2-0.4-0.4-0.7-0.6-1.1c-0.4-0.9-0.7-1.8-0.9-2.6c-0.2-0.8-0.3-1.8-0.2-2.7
           c0.1-0.5,0.2-0.9,0.3-1.2c0.2-0.5,0.6-1,0.9-1.4c1.3-1.4,3.5-1.6,5-0.4c0.6,0.7,1,1.3,1.3,1.9c1,2.1,2.5,4,4.3,5.6
           c0.5,0.5,1.1,1.2,1.8,1.9c0.4,0.5,0.8,1,1.2,1.4c0.3,0.3,0.5,0.6,0.7,0.8c0.3,0,0.5,0,0.8,0c0,0,0,0,0,0c2.4,0,3.8,2.7,3.8,7.1
           c0,0.8-0.1,8.2-3.7,8.2h-5L23.8-13c-1,0.3-1.9,0.4-2.9,0.4L14.6-12.6C14.7-12.6,14.7-12.6,14.6-12.6z M11.8-26.8
           c0.7,0,1.4,0.6,1.4,1.3c0,0.7-0.6,1.4-1.3,1.4c-0.2,0-0.4,0.1-0.5,0.2c-0.1,0.1-0.2,0.3-0.2,0.5c0,0.5,0.4,0.8,0.8,0.9
           c0.6,0.1,1,0.4,1.2,1s0,1.1-0.5,1.4c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.4,0.3,0.8,0.7,0.8c0.4,0.1,0.8,0.4,1,0.8
           c0.2,0.4,0.2,0.9-0.1,1.2c-0.1,0.2-0.1,0.4-0.1,0.6c0.1,0.3,0.5,0.6,0.9,0.6H21c0.7,0,1.4-0.1,2.1-0.3l3.8-1.3
           c0.1,0,0.3-0.1,0.4-0.1h5.2c0.4-0.4,1.2-3.7,0.9-7.1c-0.2-2.1-0.8-2.7-0.9-2.8c-0.5,0-1,0-1.6,0c0,0,0,0,0,0
           c-0.7,0-1-0.5-1.4-0.9c-0.2-0.2-0.4-0.5-0.6-0.8c-0.4-0.5-0.9-1-1.3-1.5c-0.6-0.7-1.1-1.3-1.6-1.7c-2-1.8-3.7-4-4.9-6.5
           c-0.2-0.4-0.4-0.8-0.7-1.1c-0.2-0.2-0.8-0.1-1.1,0.3c-0.2,0.2-0.4,0.4-0.5,0.7c-0.1,0.1-0.1,0.3-0.2,0.5c0,0.5,0,1.1,0.2,1.7
           c0.2,0.8,0.4,1.4,0.7,2.1c0.4,0.7,0.9,1.5,1.5,2.3c0.2,0.2,0.4,0.4,0.5,0.6c0.1,0.2,0.1,0.4,0.1,0.6c0,0,0,0,0,0.1
           c0,0.8-0.6,1.4-1.4,1.4h-9.1c-0.2,0-0.6,0.1-0.8,0.4c-0.2,0.2-0.3,0.5-0.2,0.8c0.1,0.7,0.6,1.1,1.1,1.1H11.8z"/>
       </g>
     </g>
   </g>
 </g>
</g>
</svg>`

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

  function generateLikes() {
    return Math.floor(Math.random() * 100)
  }

  return `
      <div class="${ type === 'summary' ? `linkedin-preview is-small` : `linkedin-preview`}">
        <a rel="noopener" target="_blank" class="${type === 'summary' ? `linkedin-preview__link-container` : `linkedin-preview__link-container linkedin-preview__link-container--vertical`} ">
          <div class="${ image
      ? `${type === 'summary'
        ? `linkedin-preview__media`
        : `linkedin-preview__fixed-ratio linkedin-preview__ratio`}`
      : `linkedin-preview__media linkedin-preview__media--image-fallback`}">
            ${ image
      ? `<img src="${image}" class="${type === 'summary'
        ? `linkedin-preview__image`
        : `linkedin-preview__fixed-ratio-content`}" />`
      : `<div class="linkedin-preview__image-fallback"></div>`}
          </div>

          <div class="linkedin-preview__content">
            <div class="linkedin-preview__title">${ title}</div>
            <div class="linkedin-preview__domain">
               <div class="linkedin-preview__hostname">${ getHostName(url)}</div>
            </div>
            <div class="linkedin-preview__like">${like}<p class="">${generateLikes()}</p></div>
          </div>
        </a>
      </div>
    `
}
