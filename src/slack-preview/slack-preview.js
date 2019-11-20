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
  let additionData

  try {
    additionData = JSON.parse(params.get('additionData'))
  } catch (err) {
    console.error('invalid additional data value')
  }

  const slackElement = document.querySelector('[data-slack-preview-card]')
  getslackMarkup({
    title,
    description,
    imgString,
    url,
    type,
    favicon,
    additionData
  }).then(html => {
    slackElement.innerHTML = html
  })

  if (theme === 'dark') document.body.classList.add('-theme-with-dark-background')
}

function getslackMarkup({ title, description, imgString, url, type, favicon, additionData }) {

  console.log(additionData);

  let imageDefined

  function getImageFileSize({ imgString }) {
    return fetch(imgString, { method: 'HEAD' })
      .then(x => {
        return `${Math.round(Number(x.headers.get('content-length')) / 1000)} kB`
      })
  }

  function getImageDetails(url) {
    return new Promise((resolve) => {
      var img = new Image();
      img.src = url;
      img.onload = () => resolve(img)
    })
  }

  // function isBigEnough(img) {
  //   return img.width >= 600 && img.height >= 315
  // }


  if (imgString !== 'undefined') {
    return getImageDetails(imgString)
      .then(img => {
        return getImageFileSize({ title, description, imgString, url, type, favicon, img, additionData })
      })
      .then(fileSize => {
        imageDefined = true;
        return generateHtml({ title, description, imgString, url, type, favicon, fileSize, imageDefined, additionData })
      })
  }

  if (imgString === 'undefined') {
    imageDefined = false;
    return new Promise(function (resolve) {
      resolve(generateHtml({ title, description, url, type, favicon, imageDefined, additionData }))
    })
  }
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
  return Math.floor(Math.random() * 9) + 1
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function generateHtml({ title, description, imgString, url, favicon, fileSize, imageDefined, isBigImg }) {

  console.log(isBigImg);


  return `
        <a rel="noopener" target="_blank" class="slack-preview__container">
          <span class="slack-preview__sidebar"></span>
          <div class="slack-preview__content">
            <div class="slack-preview__domain">
              ${favicon ? `
              <div class="slack-preview__hostname">
              <img class="slack-preview__favicon" src="${favicon}" alt="">${getHostName(url)}
              </div>
            </div>` : ``}
            <div class="slack-preview__title">
              ${ title}
            </div>
            <div class="slack-preview__description">
              <p>
              ${ description}
              ${imageDefined ? `<span class="slack-preview__filesize">(${fileSize})</span><span class="slack-preview__expand">▼</span>` : ''}
              </p>           
            </div>
            ${imageDefined ? `
            <div class="slack-preview__image-container"> 
              <img src="${imgString}" class="slack-preview__image"/> 
            </div>` : ''}
          </div>
        </a>
        
        <div class="slack-preview__emoji">
          <img src="https://cultofthepartyparrot.com/parrots/hd/parrot.gif" alt="">
          <p>${emojiCount()}</p>
        </div>
`
}
