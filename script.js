// ====== KONFIGURACJA ======
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61579354546553';
const NAZWA = 'Elektro - Impuls';
const OPIS = 'Tu znajdziesz najnowsze informacje i kontakt do firmy.';
const AVATAR_URL = 'assets/logo01.png';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=80-299%20Gda%C5%84sk%2C%20Tadeusza%20Wendy%2015A';
const TELEFON = '+48 603 138 233';
const MIASTO = 'Gdańsk';

// ====== INICJALIZACJA UI ======
const $ = (s) => document.querySelector(s);

function init() {
  // Podstawowe dane
  $('#brandName').textContent = NAZWA;
  $('#heroTitle').textContent = NAZWA;
  $('#heroSubtitle').textContent = OPIS;
  const brandAvatarEl = $('#brandAvatar');
  if (brandAvatarEl) brandAvatarEl.src = AVATAR_URL;
  const heroAvatarEl = $('#heroAvatar');
  if (heroAvatarEl) heroAvatarEl.src = AVATAR_URL;

  // Linki do Facebooka i telefonu
  const fbBtn = $('#fbBtn');
  if (fbBtn) fbBtn.href = FACEBOOK_URL;
  const cta = $('#ctaCall');
  if (cta) cta.href = `tel:${TELEFON.replace(/\s/g, '')}`;

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

  // Dodaj link do Map Google pod kartą "Miasto"
  try {
    const cards = document.querySelectorAll('.card');
    for (const card of cards) {
      const heading = card.querySelector('strong');
      if (!heading) continue;
      const title = heading.textContent.trim().toLowerCase();
      if (false && (title.includes('miasto') || title.includes('dane firmy'))) {
        // Ustaw nagłówek i zawartość karty 'Dane firmy'
        heading.textContent = 'Dane firmy';
        // Usuń wszystko po <strong>
        while (heading.nextSibling) heading.parentNode.removeChild(heading.nextSibling);
        // Dodaj adres i NIP
        const addLine = (text) => {
          const span = document.createElement('span');
          span.className = 'muted';
          span.textContent = text;
          return span;
        };
        card.appendChild(document.createElement('br'));
        card.appendChild(addLine('80-299 Gdańsk'));
        card.appendChild(document.createElement('br'));
        card.appendChild(addLine('ul. Tadeusza Wendy 15A'));
        card.appendChild(document.createElement('br'));
        card.appendChild(addLine('NIP: 584 192 59 11'));

        // Link do map poniżej adresu i NIP-u
        const linkWrap = document.createElement('span');
        linkWrap.className = 'muted';
        const a = document.createElement('a');
        a.href = MAPS_URL;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.setAttribute('aria-label', 'Zobacz lokalizację w Mapach Google');
        a.textContent = 'Zobacz na mapie';
        a.style.textDecoration = 'underline';
        a.style.display = 'inline-block';
        a.style.marginTop = '4px';
        card.appendChild(document.createElement('br'));
        linkWrap.appendChild(a);
        card.appendChild(linkWrap);
        break;
      }
    }
  } catch (_) { /* noop */ }

  // (usunięto reveal/IntersectionObserver — brak animacji przewijania)
}

document.addEventListener('DOMContentLoaded', init);
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  try { init(); } catch (_) { /* noop */ }
}

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

