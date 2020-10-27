export default function createAbsoluteUrl(head, url) {
  if (!url) { return; }
  const currentUrlIsAbsolute = url.startsWith('http');
  const formattedAbsoluteUrl = new URL(head.url).origin + url;

  return currentUrlIsAbsolute ? url : formattedAbsoluteUrl;
}
