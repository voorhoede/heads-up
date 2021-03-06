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

export function findLinkHref(head, name) {
  const link = head.link.find(link => link.rel && link.rel === name);
  return link ? link.href : '';
}

export function findMetaContent(head, name) {
  const item = head.meta.find(item => item.name === name);
  return item ? item.content : '';
}

export function findMetaProperty(head, name) {
  const item = head.meta.find(item => item.property === name);
  return item ? item.content : '';
}

export function findXMLElement(text, tagName) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'text/xml');

  const tags = Object.values(xml.documentElement.childNodes)
    .filter(node => node.nodeName !== '#text')
    .filter(node => node.nodeName === tagName);

  return tags.length ? getElementDetails(tags) : null;
}

function getElementDetails(tags) {
  return tags.map(node => ({
    attributes: getNodeAttributes(node),
    name: node.nodeName,
    value: node.textContent ? node.textContent : null,
  }));
}

function getNodeAttributes(node) {
  let attributes = [];

  for (let entry of Object.entries(node.attributes)) {
    attributes.push({ name: entry[1].name, value: entry[1].value });
  }

  return attributes;
}

export function findFavicons(head) {
  return head.link
    .filter(link => link.rel === 'shortcut icon' || link.rel === 'icon')
    .map(favicon => {
      const url = favicon.href.startsWith('http')
        ? favicon.href
        : new URL(head.url).origin + favicon.href;
      return { ...favicon, url };
    });
}

function getImageDetails(url) {
  return new Promise(resolve => {
    var img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => resolve({ width: 0, height: 0 });
  });
}

export function findImageDimensions(head, name) {
  const url = findMetaProperty(head, name);

  if (url === null) {
    return Promise.resolve({ width: 0, height: 0 });
  }
  const correctUrl = url.startsWith('http') ? url : new URL(head.url).origin + url;
  return getImageDetails(correctUrl)
    .then(({ width, height }) => ({ width, height }));
}

function getAdditionalTwitterData(head, name) {
  const data = head.meta.find(data => data.name === name);
  return data?.value ? data.value : data?.content ? data.content : null;
}

export function findAdditionalTwitterData(head) {
  const returnArray = [];

  for (let i = 1; i <= 2; i++) {
    const label = getAdditionalTwitterData(head, `twitter:label${ i }`);
    const value = getAdditionalTwitterData(head, `twitter:data${ i }`);

    if (label && value) {
      returnArray.push({ label, value });
    }
  }

  return returnArray;
}
