function getImageDetails(url) {
  return new Promise(resolve => {
    let img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => resolve({ width: 0, height: 0 });
  });
}

async function getImageSize(url) {
  const response = await fetch(url, { method: 'HEAD' });
  return response.headers.get('Content-Length');
}

export default function getImageDimensions(url) {
  if (!url) {
    return Promise.resolve({ width: 0, height: 0 });
  }

  const correctUrl = url.startsWith('http') ? url : new URL(url).origin + url;

  return getImageDetails(correctUrl)
    .then(async ({ width, height }) => ({
      size: await getImageSize(correctUrl),
      height,
      width,
    }))
    .catch(() => Promise.resolve({ width: 0, height: 0 }));
}
