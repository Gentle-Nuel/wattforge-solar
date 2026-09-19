(function () {
  'use strict';
  var stored = null;
  try { stored = localStorage.getItem('wattforge-theme'); } catch (e) {}
  var theme = stored === 'light' || stored === 'dark'
    ? stored
    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
})();
