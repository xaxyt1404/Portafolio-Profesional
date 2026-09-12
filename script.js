function showToast(event, mensaje) {
  event.preventDefault();
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  // --- NAVEGACIÓN MOBILE ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('is-active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('is-active');
      });
    });
  }

  // --- FORMULARIO DE CONTACTO ---
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector('textarea');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let isValid = true;

      if (!nameInput.value.trim()) {
        showError(nameInput, 'Por favor, ingresa tu nombre.');
        isValid = false;
      } else {
        clearError(nameInput);
      }

      if (!emailInput.value.trim()) {
        showError(emailInput, 'Por favor, ingresa tu correo.');
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Por favor, ingresa un correo electrónico válido.');
        isValid = false;
      } else {
        clearError(emailInput);
      }

      if (!messageInput.value.trim()) {
        showError(messageInput, 'El mensaje no puede estar vacío.');
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (isValid) {
        showToast(e, '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
        contactForm.reset();
      }
    });
  }

  function showError(input, message) {
    input.style.borderColor = '#fd1900ff';
    input.placeholder = message;
  }
  function clearError(input) {
    input.style.borderColor = '';
  }

  // --- LÓGICA DE CAMBIO DE TEMA Y PANEL EDGE ---
  const themeEdgePanel = document.getElementById('theme-panel');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeBtns = document.querySelectorAll('.theme-btn');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  if (themeToggleBtn && themeEdgePanel) {
    themeToggleBtn.addEventListener('click', () => {
      themeEdgePanel.classList.toggle('active');
    });
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      if (systemPrefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }

    // Actualiza la clase activa en los 3 botones
    themeBtns.forEach(btn => {
      if (btn.getAttribute('data-theme-val') === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Cargar tema guardado o por defecto "system"
  const currentSavedTheme = localStorage.getItem('theme') || 'system';
  setTheme(currentSavedTheme);

  // Evento Clic en los botones de tema
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.getAttribute('data-theme-val');
      localStorage.setItem('theme', selectedTheme);
      setTheme(selectedTheme);
    });
  });

  // Escuchar si cambia el tema del sistema operativo
  systemPrefersDark.addEventListener('change', () => {
    const saved = localStorage.getItem('theme');
    if (!saved || saved === 'system') {
      setTheme('system');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-toast]').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const message = element.getAttribute('data-toast');
      showToast(e, message);
    });
  });
});