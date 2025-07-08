'use strict';{
    const { days, html, only } = HFS.getPluginConfig()
    const dt =days * 86400 * 1000
    const match = HFS.misc.makeMatcher(only, true)

    HFS.onEvent('afterEntryName', ({ entry }) =>
        Math.max(entry.c||0, entry.m||0) > Date.now() - dt && match(entry.n) && html)
}
// Funktion, um zu prüfen, ob eine Datei schon angeklickt wurde
function isFileVisited(filename) {
  return localStorage.getItem('visited_' + filename) === '1';
}

// Funktion, um eine Datei als besucht zu markieren
function markFileVisited(filename) {
  localStorage.setItem('visited_' + filename, '1');
}

// Beim Rendern der Datei-Liste:
files.forEach(file => {
  if (isFileVisited(file.name)) {
    // entferne "neu"-Markierung
    file.element.classList.remove('new-mark');
  } else {
    // setze "neu"-Markierung
    file.element.classList.add('new-mark');
    // Optional: Klick-Handler hinzufügen
    file.element.addEventListener('click', function() {
      markFileVisited(file.name);
      file.element.classList.remove('new-mark');
    });
  }
