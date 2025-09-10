// ====== KONFIGURACJA ======
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61579354546553';
const NAZWA = 'Elektro - Impuls';
const OPIS = 'Tu znajdziesz najnowsze informacje i kontakt do firmy.';
const AVATAR_URL = 'assets/logo01.png';
const TELEFON = '+48 603 138 233';
const MIASTO = 'Gdańsk';

// ====== INICJALIZACJA UI ======
const $ = (s) => document.querySelector(s);

function init() {
  // Podstawowe dane
  $('#brandName').textContent = NAZWA;
  $('#heroTitle').textContent = NAZWA;
  $('#heroSubtitle').textContent = OPIS;
  $('#brandAvatar').src = AVATAR_URL;
  $('#heroAvatar').src = AVATAR_URL;

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

// ====== Gallery Lightbox ======
function setupGalleryLightbox() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <img class="lightbox__img" alt="" />
    <button class="lightbox__close" aria-label="Zamknij">\u00D7</button>
  `;
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector('.lightbox__img');
  const btnClose = overlay.querySelector('.lightbox__close');

  const open = (src, alt) => {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    overlay.classList.remove('is-open');
    overlayImg.src = '';
    document.body.style.overflow = '';
  };

  gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img || !gallery.contains(img)) return;
    e.preventDefault();
    const src = img.currentSrc || img.src;
    open(src, img.alt);
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  btnClose.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

document.addEventListener('DOMContentLoaded', setupGalleryLightbox);

