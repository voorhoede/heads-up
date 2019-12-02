export function findCharset(head) {
  const item = head.meta.find(item => Object.keys(item).includes('charset'))
  return item ? item.charset : null
}

export function findMetaContent(head, name) {
  const item = head.meta.find(item => item.name === name)
  return item ? item.content : null
}

export function findMetaProperty(head, name) {
  const item = head.meta.find(item => item.property === name)
  return item ? item.content : null
}

export function findFavicons(head) {
  return head.link
    .filter(link => link.rel === 'shortcut icon' || link.rel === 'icon')
    .map(favicon => {
      const url = favicon.href.startsWith('http')
        ? favicon.href
        : new URL(head.url).origin + favicon.href
      return { ...favicon, url }
    })
}

function getImageDetails(url) {
  return new Promise((resolve) => {
    var img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => resolve({ width: 0, height: 0 })
  })
}

export function findImageDimensions(head, name) {
  const url = findMetaProperty(head, name)

  if (url === null) {
    return Promise.resolve({ width: 0, height: 0 })
  }
  const correctUrl = url.startsWith("http") ? url : new URL(head.url).origin + url;
  return getImageDetails(correctUrl)
    .then(({ width, height }) => ({ width, height }))
}


function AdditionSlackCheck(head, name) {
  const item = head.meta.find(item => item.name === name)
  return item ? item.value
    : null
}

export function findAdditionSlackData(head) {
  return [
    {
      label: AdditionSlackCheck(head, 'twitter:label1'),
      value: AdditionSlackCheck(head, 'twitter:data1')
    },
    {
      label: AdditionSlackCheck(head, 'twitter:label2'),
      value: AdditionSlackCheck(head, 'twitter:data2')
    }
  ].filter(item => item.label && item.value)
}