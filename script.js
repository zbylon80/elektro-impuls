// ====== KONFIGURACJA ======
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61579354546553';
const NAZWA = 'Elektro - Impuls';
const OPIS = 'Tu znajdziesz najnowsze informacje i kontakt do firmy.';
const AVATAR_URL = 'assets/bolt.svg';

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
  $('#ctaFacebook').href = FACEBOOK_URL;

  // Dane strukturalne JSON-LD
  try {
    const schema = JSON.parse(document.getElementById('schemaData').textContent);
    schema.name = NAZWA;
    schema.url = location.origin + location.pathname;
    schema.image = AVATAR_URL;
    schema.sameAs = [FACEBOOK_URL];
    document.getElementById('schemaData').textContent = JSON.stringify(schema, null, 2);
  } catch (e) { /* noop */ }

  // Proste ujawnianie sekcji przy przewijaniu
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

document.addEventListener('DOMContentLoaded', init);
