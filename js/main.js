(function () {
  const menuButton = document.querySelector('.menu-btn a');
  const menuContainer = document.querySelector('.responsive-menu');
  if (!menuButton || !menuContainer) return;

  if (window.jQuery && typeof window.jQuery === 'function') {
    window.jQuery('.menu-btn').off('click');
    window.jQuery('.responsive-menu ul li.menu-item-has-children > a').off('click');
  }

  const backdrop = document.createElement('div');
  backdrop.className = 'menu-backdrop';
  document.body.appendChild(backdrop);

  const toggleMenu = (forceState) => {
    const isOpen = typeof forceState === 'boolean'
      ? forceState
      : !menuContainer.classList.contains('active');

    menuContainer.classList.toggle('active', isOpen);
    menuButton.classList.toggle('active', isOpen);
    backdrop.classList.toggle('active', isOpen);
    document.body.classList.toggle('scroll-hide', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  };

  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Toggle navigation menu');

  menuButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleMenu();
  });

  menuContainer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (menuContainer.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  backdrop.addEventListener('click', () => toggleMenu(false));

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuContainer.classList.contains('active')) {
      toggleMenu(false);
    }
  });
})();
