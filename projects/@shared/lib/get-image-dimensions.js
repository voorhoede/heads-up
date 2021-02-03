function getImageDetails(url) {
  return new Promise(resolve => {
    let img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => resolve({ width: 0, height: 0 });
  });
}

export default function getImageDimensions(url) {
  if (!url) {
    return Promise.resolve({ width: 0, height: 0 });
  }

  const correctUrl = url.startsWith('http') ? url : new URL(url).origin + url;

  return getImageDetails(correctUrl)
    .then(({ width, height }) => ({ width, height }))
    .catch(() => Promise.resolve({ width: 0, height: 0 }));
}
