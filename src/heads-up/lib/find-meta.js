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

export function findMetaFavicon(head) {
  console.log('findMetaFavicon');
  console.log(head.url);
  const rx = /(http(s)*:\/\/[^/]+)/g
  const url = rx.exec(head.url[1])
  console.log('url');
  console.log(url);
  console.log(head.link.find(x => x.rel === 'shortcut icon' ||'icon').href);
  return head.link.find(x => x.rel === 'shortcut icon' ||'icon').href
}




