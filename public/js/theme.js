// Theme Toggle Script
(function() {
  const THEME_KEY = 'theme-preference';
  
  // Initialize theme from localStorage or system preference
  function initTheme() {
    let theme = localStorage.getItem(THEME_KEY);
    
    if (!theme) {
      // Check system preference
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    applyTheme(theme);
  }
  
  // Apply theme to document
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
  
  // Toggle theme
  function toggleTheme() {
    const isDark = document.body.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
    // Dispatch custom event for components to listen to
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: isDark ? 'light' : 'dark' } }));
  }
  
  // Export functions globally
  window.Theme = {
    init: initTheme,
    toggle: toggleTheme,
    isDark: () => document.body.classList.contains('dark'),
    current: () => document.body.classList.contains('dark') ? 'dark' : 'light'
  };
  
  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
