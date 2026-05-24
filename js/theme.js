const THEME_KEY = 'theme-preference';

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
  }
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  let theme = localStorage.getItem(THEME_KEY);
  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  applyTheme(theme);
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: isDark ? 'light' : 'dark' } }));
  updateThemeToggleDisplay();
}

function updateThemeToggleDisplay() {
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');
  if (!themeIcon || !themeLabel) return;
  const isDark = document.body.classList.contains('dark');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? 'Sáng' : 'Tối';
}

document.addEventListener('DOMContentLoaded', initTheme);
document.addEventListener('partialsLoaded', updateThemeToggleDisplay);

window.Theme = {
  init: initTheme,
  toggle: toggleTheme,
  isDark: () => document.body.classList.contains('dark'),
  current: () => document.body.classList.contains('dark') ? 'dark' : 'light'
};
