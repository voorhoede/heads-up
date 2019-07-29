"use strict";

// Create a panel in de Devtools
chrome.devtools.panels.create(
  "Heads Up",
  "src/assets/icons/icon-96.png",
  "src/components/panel/panel.html"
)