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
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('is-active');
    })

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('is-active');
      })
    })
  }
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
      }
      else {
        clearError(nameInput);
      }

      if (!emailInput.value.trim()) {
        showError(emailInput, 'Por favor, ingresa tu correo.');
        isValid = false;
      }
      else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Por favor, ingresa un correo electrónico válido.');
        isValid = false;
      }
      else {
        clearError(emailInput);
      }

      if (!messageInput.value.trim()) {
        showError(messageInput, 'El mensaje no puede estar vacío.');
        isValid = false;
      }
      else {
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
});