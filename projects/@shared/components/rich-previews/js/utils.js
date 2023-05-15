export const getHostname = url => {
  if(!url) return '';
  const hostname = (new URL(url).hostname);
  const wwwPrefix = 'www.';
  return hostname.startsWith(wwwPrefix)
    ? hostname.slice(wwwPrefix.length)
    : hostname;
};
