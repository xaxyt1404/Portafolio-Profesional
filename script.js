function showToast(event, mensaje) {
  event.preventDefault();
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}