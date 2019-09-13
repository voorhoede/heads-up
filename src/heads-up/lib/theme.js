function getTheme() {
    const systemTheme = window.matchMedia('(prefers-color-scheme:dark )').matches ? 'dark' : 'light'
    const devtoolsTheme = chrome.devtools.panels.themeName
    const theme = (devtoolsTheme === 'systemPreferred') ? systemTheme : devtoolsTheme
    return theme
  }

export default getTheme
