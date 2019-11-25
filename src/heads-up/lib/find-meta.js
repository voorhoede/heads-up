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

export function findImageDimensions(head, name) {
  const url = findMetaProperty(head, name)

  function getImageDetails(url) {
    return new Promise((resolve) => {
      var img = new Image();
      img.src = url;
      img.onload = () => { resolve(img) }
      img.onerror = () => { resolve(false); }
    })
  }

  if (url !== null) {
    const correctUrl = url.startsWith("http") ? url : new URL(head.url).origin + url;
    return getImageDetails(correctUrl)
      .then(img => {
        if (img) {
          return { imgWidth: img.width, imgHeight: img.height, correctImgUrl: true }
        }
        else {
          return { imgWidth: 0, imgHeight: 0, correctImgUrl: false }
        }
      })
  }
  else {
    return Promise.resolve({ imgWidth: 0, imgHeight: 0 })
  }
}