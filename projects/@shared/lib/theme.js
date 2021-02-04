function getTheme() {
  const DEFAULT_THEME = 'light';
  let devtoolsTheme = DEFAULT_THEME;
  let systemTheme = DEFAULT_THEME;

  // Chrome DevTools setting
  if ('chrome' in window) {
    const { devtools } = window.chrome;
    devtoolsTheme = devtools ? devtools.panels.themeName : DEFAULT_THEME;
  }

  // System setting
  if ('matchMedia' in window) {
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme:dark)').matches;
    systemTheme = prefersDarkTheme ? 'dark' : DEFAULT_THEME;
  }

  return (devtoolsTheme === 'systemPreferred') ? systemTheme : devtoolsTheme;
}

export default getTheme;
