function initHeader() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const headerNav = document.getElementById('headerNav');
  const themeToggleBtn = document.getElementById('themeToggle');

  if (mobileMenuToggle && headerNav) {
    mobileMenuToggle.addEventListener('click', () => {
      headerNav.classList.toggle('active');
    });
  }

  if (headerNav) {
    headerNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('active');
      });
    });
  }

  if (themeToggleBtn && window.Theme && typeof window.Theme.toggle === 'function') {
    themeToggleBtn.addEventListener('click', window.Theme.toggle);
  }
}

document.addEventListener('partialsLoaded', initHeader);
