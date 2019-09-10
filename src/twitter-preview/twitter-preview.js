(function(window) {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const description = params.get('description')
  const image = params.get('image')
  const url = params.get('url')
  const type = params.get('card')
  
  const twitterElement = document.querySelector('[data-twitter-preview-card]')
  twitterElement.innerHTML = getTwitterMarkup({
    title,
    description,
    image,
    url,
    type
  })

  /**
   * why: inside iframe we have no access to custom properties of parent
   * how: get needed props based on their key
   * possible: extend 'propKeys' with additional props
   */
  const propKeys = ['--base-color', '--label-color', '--value-color'];
  const appContainer = window.parent.document.querySelector('.app');
  propKeys.forEach( key => {
    document.body.style.setProperty(`${key}`, window.parent.getComputedStyle(appContainer).getPropertyValue(key));
  });

  function getTwitterMarkup({ title, description, image, url, type }) {
      const twitterLink = url ? `href="${ url }"` : ''

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
        <div class="${ type === 'summary' ? `twitter-preview is-small` : `twitter-preview` }">
          <a rel="noopener" target="_blank" ${ twitterLink } class="${ type === 'summary' ? `twitter-preview__link-container` : `twitter-preview__link-container twitter-preview__link-container--vertical` } ">
            <div class="${ image
              ? `${ type === 'summary'
                ? `twitter-preview__media`
                : `twitter-preview__fixed-ratio twitter-preview__ratio` }`
              : `twitter-preview__media twitter-preview__media--image-fallback` }">
              ${ image
                ? `<img src="${ image }" class="${ type === 'summary'
                  ? `twitter-preview__image`
                  : `twitter-preview__fixed-ratio-content` }" />`
                : `<div class="twitter-preview__image-fallback"></div>` }
            </div>

            <div class="twitter-preview__content">
              <div class="twitter-preview__title">${ title }</div>
              <div class="twitter-preview__description">${ description }</div>
              <div class="twitter-preview__domain">
                <svg viewBox="0 0 24 24" class="twitter-preview__icon"><g><path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path></g></svg>
                <div class="twitter-preview__hostname">${ getHostName(url) }</div></div>
            </div>
          </a>
        </div>
      `
  }
})(window)
