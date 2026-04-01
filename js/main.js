(function () {
  // Dynamic footer year
  var yearSpans = document.querySelectorAll('#footer-year');
  yearSpans.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile menu
  const menuButton = document.querySelector('.menu-btn a');
  const menuContainer = document.querySelector('.responsive-menu');
  if (menuButton && menuContainer) {
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
      toggleMenu();
    });

    menuContainer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (menuContainer.classList.contains('active')) {
          toggleMenu(false);
        }
      });
    });

    backdrop.addEventListener('click', () => toggleMenu(false));

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuContainer.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  }

  // Contact form handler
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('contact-form-success');
  if (form && successMsg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(function (el) {
        el.textContent = '';
      });

      var name = form.querySelector('#cf-name');
      var email = form.querySelector('#cf-email');
      var message = form.querySelector('#cf-message');

      if (name && !name.value.trim()) {
        var nameError = document.getElementById('cf-name-error');
        if (nameError) nameError.textContent = 'Please enter your full name.';
        valid = false;
      }

      if (email) {
        if (!email.value.trim() || !email.validity.valid) {
          var emailError = document.getElementById('cf-email-error');
          if (emailError) emailError.textContent = 'Please enter a valid email address.';
          valid = false;
        }
      }

      if (message && !message.value.trim()) {
        var msgError = document.getElementById('cf-message-error');
        if (msgError) msgError.textContent = 'Please enter your message.';
        valid = false;
      }

      if (!valid) return;

      // Show success state
      form.hidden = true;
      successMsg.hidden = false;
    });
  }
})();
