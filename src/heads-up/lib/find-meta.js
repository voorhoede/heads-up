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

export function findAdditionData(head) {
  return [
    {
      label: findMetaContent(head, 'twitter:label1'),
      value: findMetaContent(head, 'twitter:data1')
    },
    {
      label: findMetaContent(head, 'twitter:label2'),
      value: findMetaContent(head, 'twitter:data2')
    }
  ].filter(item => item.label && item.value)
  // let data = []
  // let additionData = [];
  // let additionLabel = [];
  // for (let i = 0; i < head.length; i++) {
  //   if (head[i].name) {
  //     if (head[i].name.includes(`twitter:label`)) {
  //       additionLabel.push({ name: head[i].name, value: head[i].value });
  //     }
  //     if (head[i].name.includes(`twitter:data`)) {
  //       additionData.push({ name: head[i].name, value: head[i].value });
  //     }
  //   }
  // }

  // for (let index = 0; index < additionData.length; index++) {
  //   data.push({ title: additionLabel[index].value, data: additionData[index].value })
  // }

  // console.log(data);
  // return data
}