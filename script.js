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

  // Proste ujawnianie sekcji przy przewijaniu
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

document.addEventListener('DOMContentLoaded', init);

