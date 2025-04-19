// === Slideshow (homepage) ===
let slideIndex = 0;
function showSlides(n) {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;
  slideIndex = (n < 0) ? slides.length - 1 : (n >= slides.length) ? 0 : n;
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === slideIndex);
  });
}
function plusSlides(p){ showSlides(slideIndex + p); }
function setupSlideshow() {
  showSlides(0); // show the first initially
}
document.addEventListener('DOMContentLoaded', setupSlideshow);

// === CART STATE ===
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartNav();
}
function updateCartNav() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = count;
}
document.addEventListener('DOMContentLoaded', updateCartNav);

// === AUTH STATE ===
function getAuthUser() {
  // Very simple demo auth
  return localStorage.getItem('auth_user');
}
function setAuthUser(user) {
  if (!user) localStorage.removeItem('auth_user');
  else localStorage.setItem('auth_user', user);
}
function updateLoginLink() {
  const loginLink = document.getElementById('login-link');
  if (!loginLink) return;
  const user = getAuthUser();
  if (user) {
    loginLink.textContent = 'Logout (' + user + ')';
    loginLink.href = '#logout';
    loginLink.onclick = function(e){
      e.preventDefault();
      setAuthUser(null);
      window.location.reload();
    }
  } else {
    loginLink.textContent = 'Login';
    loginLink.href = 'login.html';
    loginLink.onclick = null;
  }
}
document.addEventListener('DOMContentLoaded', updateLoginLink);
