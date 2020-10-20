export function findAttrs(head, attr) {
  return head.meta.find(item => item[attr]);
}

export function findCharset(head) {
  const item = head.meta.find(item => Object.keys(item).includes('charset'));
  let charset = item ? item.charset : null;

  if (charset === null) {
    const item = head.meta.find(item => {
      return item['http-equiv'] &&
             item['http-equiv'].toLowerCase() === 'content-type' &&
             item['content'] &&
             /charset=./.test(item['content']);
    });
    if (!item) return charset;

    try {
      charset = item['content']
        .split(';')
        .find(section => /charset=/.test(section))
        .split('=')[1];
    } catch (err) {
      console.error(err);
    }
  }
  return charset;
}

export function findMetaContent(head, name) {
  const item = head.meta.find(item => item.name === name);
  return item ? item.content : null;
}
