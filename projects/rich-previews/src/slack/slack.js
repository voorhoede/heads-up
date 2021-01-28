import html from '../lib/html';

createPreview();

function createPreview() {
  const params = (new URL(window.location.href)).searchParams;

  const description = params.get('description').substring(0, 700);
  const favicon = params.get('favicon') !== 'undefined' ? params.get('favicon') : null;
  const image = params.get('image') !== 'undefined' ? params.get('image') : null;
  const imageIsBig = (params.get('imageIsBig') === 'true');
  const isValidImage = (params.get('validImage') === 'true');
  const siteName = params.get('siteName') !== 'null' ? params.get('siteName') : null;
  const theme = params.get('theme');
  const title = params.get('title');
  const url = params.get('url');
  let additionalData;

  try {
    additionalData = JSON.parse(params.get('additionalData'));
  } catch (err) {
    console.error('Invalid \'additionalData\' value.');
  }

  const slackElement = document.querySelector('[data-slack-preview-card]');

  if (isValidImage) {
    getImageFileSize(image)
      .then(imageSize => {
        slackElement.innerHTML = getslackMarkup({
          additionalData,
          description,
          favicon,
          image,
          imageIsBig,
          imageSize,
          siteName,
          theme,
          title,
          url,
        });
      });
  }
  else {
    slackElement.innerHTML = getslackMarkup({
      additionalData,
      description,
      favicon,
      image,
      imageIsBig,
      siteName,
      title,
      url,
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
    .then(res => (`${ Math.round(Number(res.headers.get('content-length')) / 1000) } kB`))
    .catch(() => (Promise.resolve('0 kB')));
}

function getslackMarkup({
  additionalData,
  description,
  favicon,
  image,
  imageIsBig,
  imageSize,
  siteName,
  theme,
  title,
  url,
}) {
  return html`
    <a rel="noopener" target="_blank" class="slack-preview__container ${ theme }">
      <span class="slack-preview__sidebar"></span>
      <div class="slack-preview__content ${ image && !imageIsBig ? 'slack-preview__small' : '' }">
        <div class="slack-preview__content-information">
          <div class="slack-preview__domain">
            <div class="slack-preview__hostname">
              ${ favicon ? html`<img class="slack-preview__favicon" src="${ favicon }" alt="">` : '' }${ siteName ? siteName : getHostName(url) }
            </div>
          </div>
          <div class="slack-preview__title">
            ${ title }
          </div>
          <div class="slack-preview__description">
            <p>
               ${ description }
               ${ image && imageIsBig ? html`<span class="slack-preview__filesize">(${ imageSize }) <span class="slack-preview__expand">▼</span></span>` : '' }
            </p>
          </div>
          ${ additionalData === undefined ? '' : html`
            <div class="slack-preview__additional">
              ${ additionalData.map(x => { return html`<div class="slack-preview__additional-item"><strong>${ x.label }</strong><p>${ x.value }</p></div>`; }).join('') }
            </div>
          ` }
          </div>
        ${ !image ? '' : html`
          <div class="slack-preview__image-container">
            <img src="${ image }" class="slack-preview__image" />
          </div>
        ` }
      </div>
    </a>

    <div class="slack-preview__emoji ${ theme }">
      <img class="slack-preview__emoji-image" src="./assets/parrot.gif" alt="">
      <p class="slack-preview__emoji-count">${ Math.floor(Math.random() * 8) + 1 }</p>
    </div>
  `;
}
