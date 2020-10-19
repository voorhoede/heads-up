import html from '../lib/html';

createPreview();

function createPreview() {
  const params = (new URL(window.location.href)).searchParams;
  const title = params.get('title');
  const image = params.get('image');
  const description = params.get('description').substring(0, 700);
  const url = params.get('url');
  const imageIsBig = (params.get('imageIsBig') === 'true');
  const favicon = params.get('favicon') !== 'undefined' ? params.get('favicon') : false;
  const isValidImage = (params.get('validImage') === 'true');
  const theme = params.get('theme');
  let additionalData;

  try {
    additionalData = JSON.parse(params.get('additionalData'));
  } catch (err) {
    console.error('invalid additional data value');
  }

  const slackElement = document.querySelector('[data-slack-preview-card]');

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
          imageIsBig,
          theme,
        });
      });
  }
  else {
    slackElement.innerHTML = getslackMarkup({
      title,
      image,
      url,
      description,
      favicon,
      additionalData,
      imageIsBig,
    });
  }
}

function getHostName(url) {
  if (!url) {
    return '';
  }
  const hostname = new URL(url).hostname;
  const wwwPrefix = 'www.';
  return hostname.startsWith(wwwPrefix)
    ? hostname.slice(wwwPrefix.length)
    : hostname;
}

function getImageFileSize(image) {
  return fetch(image, { method: 'HEAD' })
    .then(x => {
      return `${ Math.round(Number(x.headers.get('content-length')) / 1000) } kB`;
    });
}

function getslackMarkup({ title, image, url, imageIsBig, favicon, description, imageSize, additionalData, theme }) {

  return html`
    <a rel="noopener" target="_blank" class="slack-preview__container ${ theme }">
      <span class="slack-preview__sidebar"></span>
      <div class="slack-preview__content ${ imageIsBig ? '' : 'slack-preview__small' }">
        <div class="slack-preview__content-information">
          <div class="slack-preview__domain">
              <div class="slack-preview__hostname">
              ${ favicon ? html`<img class="slack-preview__favicon" src="${ favicon }" alt="">` : '' }${ getHostName(url) }
              </div>
            </div>
            <div class="slack-preview__title">
              ${ title }
            </div>
            <div class="slack-preview__description">
              <p>
                ${ description }
                ${ imageIsBig ? html`<span class="slack-preview__filesize">(${ imageSize }</span><span class="slack-preview__expand">▼</span>)` : '' }
              </p>
            </div>
            ${ additionalData === undefined ? '' : html`
            <div class="slack-preview__additional">
              ${ additionalData.map(x => { return html`<div class="slack-preview__additional-item"><strong>${ x.label }</strong><p>${ x.value }</p></div>`; }).join('') }
            </div>
            ` }
          </div>
          ${ image ? html`
            <div class="slack-preview__image-container">
              <img src="${ image }" class="slack-preview__image"/>
            </div>` : '' }
          </div>
        </a>

        <div class="slack-preview__emoji ${ theme }">
          <img class="slack-preview__emoji-image" src="./assets/parrot.gif" alt="">
          <p class="slack-preview__emoji-count">${ Math.floor(Math.random() * 8) + 1 }</p>
        </div>
  `;
}
