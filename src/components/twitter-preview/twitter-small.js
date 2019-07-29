init()

function init() {
  const params = (new URL(window.location.href)).searchParams
  const title = params.get('title')
  const description = params.get('description')
  const image = params.get('image')
  const hostname = params.get('hostname')
  const twitterData = {
      title,
      description,
      image,
      hostname
  }

  renderTwitterCard(twitterData)
}

function renderTwitterCard(data) {
  const twitterElement = document.querySelector('[data-twitter-preview-card]')
  twitterElement.innerHTML = getTwitterMarkup(data)
}

function getTwitterMarkup(data) {
    const { title, image, description, hostname } = data
    return `
    <div class="TwitterCardsGrid TwitterCard TwitterCard--animation">
      <div class="TwitterCardsGrid-col--12 TwitterCardsGrid-col--spacerBottom CardContent">
        <a class="js-openLink u-block TwitterCardsGrid-col--12 TwitterCard-container TwitterCard-container--clickable SummaryCard--small"
          href="" rel="noopener" data-card-breakpoints="w400 w350 w300 w250 w200 w150 w100 w50 ">
          <div class="SummaryCard-image TwitterCardsGrid-float--prev">
            <div class="tcu-imageContainer tcu-imageAspect--1to1">
              <div class="tcu-imageWrapper" style="opacity: 1; background-image: url(&quot;${ image}&quot;); background-size: cover;">
                <img class="u-block" src="${ image}">
              </div>
            </div>

          </div>
          <div class="SummaryCard-contentContainer TwitterCardsGrid-float--prev">
            <div class="SummaryCard-content TwitterCardsGrid-ltr">
              <h2 class="TwitterCard-title js-cardClick tcu-textEllipse--multiline" dir="ltr">${ title}</h2>
              <p class="tcu-resetMargin u-block TwitterCardsGrid-col--spacerTop tcu-textEllipse--multiline" dir="ltr">${ description}</p>
              <span class="u-block TwitterCardsGrid-col--spacerTop SummaryCard-destination" dir="ltr">${ hostname}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  `
}
