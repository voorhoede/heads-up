export function findCharset(head) {
  const item = head.meta.find(item => Object.keys(item).includes('charset'))
  return item ? item.charset : null
}

export function findMetaContent(head, name) {
  const item = head.meta.find(item => item.name === name)
  return item ? item.content : null
}
