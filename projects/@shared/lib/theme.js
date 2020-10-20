function getTheme() {
  const systemTheme = window.matchMedia('(prefers-color-scheme:dark )').matches ? 'dark' : 'light';
  const devtoolsTheme = chrome.devtools && chrome.devtools.panels.themeName;
  return (devtoolsTheme === 'systemPreferred') ? systemTheme : devtoolsTheme;
}

export default getTheme;
