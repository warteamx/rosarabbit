/**
 * WarteamX Theme Toggle
 * Persists user preference in localStorage.
 * Reads data-theme attribute on <html> element.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'wtx-theme';
  var DARK = 'dark';
  var LIGHT = 'light';

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function applyTheme(theme) {
    if (theme === LIGHT) {
      document.documentElement.setAttribute('data-theme', LIGHT);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    if (theme === LIGHT) {
      btn.innerHTML = '🌙';
      btn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      btn.innerHTML = '☀️';
      btn.setAttribute('title', 'Switch to Light Mode');
    }
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === LIGHT ? LIGHT : DARK;
  }

  function toggleTheme() {
    var next = currentTheme() === DARK ? LIGHT : DARK;
    applyTheme(next);
    setStored(next);
  }

  // Apply persisted preference immediately on load
  var stored = getStored();
  if (stored === LIGHT) {
    applyTheme(LIGHT);
  } else {
    applyTheme(DARK);
  }

  // Wire up button once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
    }
    // Update icon in case DOM loaded after initial apply
    updateToggleIcon(currentTheme());
  });
})();
