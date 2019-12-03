createPreview()

function createPreview() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const image = params.get('image')
  const description = params.get('description').substring(0, 700)
  const url = params.get('url')
  const imageIsBig = (params.get('imageIsBig') === 'true')
  const favicon = params.get('favicon')
  const isValidImage = (params.get('validImage') === "true")
  let additionalData


  try {
    additionalData = JSON.parse(params.get('additionalData'))
  } catch (err) {
    console.error('invalid additional data value')
  }

  const slackElement = document.querySelector('[data-slack-preview-card]')

  if (isValidImage) {
    getImageFileSize(image)
      .then(imageSize => {
        slackElement.innerHTML = getslackMarkup({
          title,
          image,
          url,
          description,
          favicon,
          imageSize,
          additionalData,
          imageIsBig
        })
      })
  }
  else {
    slackElement.innerHTML = getslackMarkup({
      title,
      image,
      url,
      description,
      favicon,
      additionalData,
      imageIsBig
    })
  }
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

function getImageFileSize(image) {
  console.log(image);
  return fetch(image, { method: 'HEAD' })
    .then(x => {
      return `${Math.round(Number(x.headers.get('content-length')) / 1000)} kB`
    })
}

function getslackMarkup({ title, image, url, imageIsBig, favicon, description, imageSize, additionalData }) {

  return `
        <a rel="noopener" target="_blank" class="slack-preview__container">
          <span class="slack-preview__sidebar"></span>
          <div class="slack-preview__content ${imageIsBig ? "" : "slack-preview__small"}">
          <div class="slack-preview__content-information">
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
              ${imageIsBig ? `<span class="slack-preview__filesize">(${imageSize}</span><span class="slack-preview__expand">▼</span>)` : ``}
              </p>           
            </div>
            ${additionalData === undefined ? '' : `
            <div class="slack-preview__additional">
            ${additionalData.map(x => { return `<div class="slack-preview__additional-item"><strong>${x.label}</strong><p>${x.value}</p></div>` }).join("")}
            </div>
            `} 
            </div>
            ${image ? `
            <div class="slack-preview__image-container"> 
              <img src="${image}" class="slack-preview__image"/> 
            </div>` : ''}
          </div>
        </a>   
        
        <div class="slack-preview__emoji">
          <img src="${require('./assets/parrot.gif').default}" alt="">
          <p>${Math.floor(Math.random() * 8) + 1}</p>
        </div>
`
}
