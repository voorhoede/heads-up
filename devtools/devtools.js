"use strict";

// Create a panel in de Devtools
chrome.devtools.panels.create(
  "Heads Up",
  "icons/icon-96.png",
  "panel/panel.html"
)