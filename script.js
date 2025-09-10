// ====== KONFIGURACJA ======
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61579354546553';
const NAZWA = 'Elektro - Impuls';
const AVATAR_URL = 'assets/logo01.png';
const TELEFON = '+48 603 138 233';
const MIASTO = 'Gdańsk';

// ====== INICJALIZACJA UI ======
const $ = (s) => document.querySelector(s);

function init() {
  // Podstawowe dane
  $('#brandName').textContent = NAZWA;
  $('#heroTitle').textContent = NAZWA;
  // Nie nadpisujemy #heroSubtitle z JS, treść pochodzi z index.html
  $('#brandAvatar').src = AVATAR_URL;
  const heroAvatar = $('#heroAvatar');
  if (heroAvatar) heroAvatar.src = AVATAR_URL;

  // Linki do Facebooka
  $('#fbBtn').href = FACEBOOK_URL;
  $('#ctaFacebook').href = 'tel:+48603138233';

  // Dane strukturalne JSON-LD
  try {
    let schemaEl = document.getElementById('schemaData');
    if (!schemaEl) {
      schemaEl = document.createElement('script');
      schemaEl.id = 'schemaData';
      schemaEl.type = 'application/ld+json';
      document.body.appendChild(schemaEl);
      schemaEl.textContent = '{}';
    }
    const schema = JSON.parse(schemaEl.textContent || '{}');
    schema['@context'] = 'https://schema.org';
    schema['@type'] = schema['@type'] || 'Electrician';
    schema.name = NAZWA;
    schema.url = window.location.href.split('#')[0];
    schema.image = AVATAR_URL;
    schema.telephone = TELEFON;
    schema.address = schema.address || { '@type': 'PostalAddress' };
    schema.address.addressLocality = MIASTO;
    schema.address.addressCountry = 'PL';
    schema.sameAs = [FACEBOOK_URL];
    schemaEl.textContent = JSON.stringify(schema, null, 2);
  } catch (e) { /* noop */ }

  // (usunięto reveal/IntersectionObserver — brak animacji przewijania)
}

document.addEventListener('DOMContentLoaded', init);

// ====== GALERIA: klik = powiekszenie ======
function initLightbox() {
  const images = document.querySelectorAll('.gallery img');
  if (!images.length) return;

  let isOpen = false;
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = '<img class="lightbox-image" alt="" />';
  const overlayImg = overlay.querySelector('img');

  function open(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    if (!overlay.parentNode) document.body.appendChild(overlay);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    isOpen = true;
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    overlayImg.src = '';
    isOpen = false;
  }

  images.forEach(img => {
    // Make image focusable for keyboard users
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', () => {
      const src = img.currentSrc || img.src;
      open(src, img.alt || '');
    });
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const src = img.currentSrc || img.src;
        open(src, img.alt || '');
      }
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // Close when clicking the enlarged image as well
  overlayImg.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close();
  });
}

document.addEventListener('DOMContentLoaded', initLightbox);

