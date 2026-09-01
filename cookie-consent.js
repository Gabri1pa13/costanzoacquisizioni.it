/*
 * Banner di consenso cookie + Google Consent Mode v2.
 * Google Ads (gtag.js) viene sempre caricato in modalità "denied" di default:
 * nessun cookie di misurazione/advertising viene impostato finché l'utente
 * non clicca "Accetta". Incluso su ogni pagina che deve tracciare le
 * conversioni; aggiungere l'attributo data-no-ads sul tag <script> per
 * caricare solo banner e preferenze, senza gtag (es. privacy.html).
 */
(function () {
  var GTAG_ID = 'AW-18203147858';
  var CONVERSION_LABEL = GTAG_ID + '/8TLNCPvmlrccENL89-dD';
  var CONSENT_KEY = 'ca_cookie_consent';
  var currentScript = document.currentScript;
  var loadAds = !(currentScript && currentScript.hasAttribute('data-no-ads'));
  var gtagScriptLoaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Stato di default: nessuno storage pubblicitario/analitico finché non c'è consenso esplicito.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  function loadGtagScript() {
    if (!loadAds || gtagScriptLoaded) return;
    gtagScriptLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GTAG_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GTAG_ID);
  }

  function grantConsent() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }

  function getStoredConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function storeConsent(choice) {
    try { localStorage.setItem(CONSENT_KEY, choice); } catch (e) {}
  }

  var consent = getStoredConsent();
  loadGtagScript();
  if (consent === 'granted') grantConsent();

  function reportConversion(callback) {
    if (!loadAds) { if (callback) callback(); return; }
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      if (callback) callback();
    }
    gtag('event', 'conversion', {
      send_to: CONVERSION_LABEL,
      value: 1.0,
      currency: 'EUR',
      transaction_id: '',
      event_callback: finish
    });
    setTimeout(finish, 1000);
  }

  function reportWhatsappConversion(el) {
    reportConversion(function () { window.location = el.href; });
  }

  // Per conversioni non legate al click su un link (es. invio di un form).
  window.ccReportConversion = reportConversion;

  function injectBannerStyles() {
    var style = document.createElement('style');
    style.textContent =
      '.cc-banner{position:fixed;left:0;right:0;bottom:0;background:#1a1a1a;color:#fff;' +
      'padding:18px 20px;display:flex;flex-wrap:wrap;gap:14px;align-items:center;' +
      'justify-content:space-between;z-index:2000;font-family:\'Outfit\',sans-serif;' +
      'box-shadow:0 -4px 16px rgba(0,0,0,0.25)}' +
      '.cc-banner p{margin:0;font-size:0.9em;line-height:1.5;flex:1 1 280px}' +
      '.cc-banner a{color:#ffb3b3}' +
      '.cc-actions{display:flex;gap:10px;flex-wrap:wrap}' +
      '.cc-banner button{cursor:pointer;border:none;border-radius:8px;padding:10px 20px;' +
      'font-weight:600;font-family:inherit;font-size:0.9em}' +
      '.cc-accept{background:#8b0000;color:#fff}' +
      '.cc-accept:hover{background:#a52a2a}' +
      '.cc-reject{background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.5)}' +
      '.cc-reject:hover{background:rgba(255,255,255,0.1)}' +
      '.cc-pref-link{position:fixed;left:14px;bottom:14px;background:#fff;color:#8b0000;' +
      'font-size:0.78em;padding:6px 12px;border-radius:20px;text-decoration:none;' +
      'box-shadow:0 2px 8px rgba(0,0,0,0.2);z-index:1999;font-family:\'Outfit\',sans-serif}';
    document.head.appendChild(style);
  }

  function showBanner() {
    if (document.querySelector('.cc-banner')) return;
    var banner = document.createElement('div');
    banner.className = 'cc-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Consenso cookie');
    banner.innerHTML =
      '<p>Utilizziamo cookie tecnici e, previo tuo consenso, cookie di misurazione e ' +
      'advertising (Google Ads) per migliorare il sito e le nostre campagne. ' +
      '<a href="/privacy.html">Leggi la privacy policy</a>.</p>' +
      '<div class="cc-actions">' +
      '<button type="button" class="cc-reject">Rifiuta</button>' +
      '<button type="button" class="cc-accept">Accetta</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('.cc-accept').addEventListener('click', function () {
      storeConsent('granted');
      consent = 'granted';
      loadGtagScript();
      grantConsent();
      banner.remove();
    });
    banner.querySelector('.cc-reject').addEventListener('click', function () {
      storeConsent('denied');
      consent = 'denied';
      banner.remove();
    });
  }

  function injectPreferencesLink() {
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'cc-pref-link';
    link.textContent = '🍪 Preferenze cookie';
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showBanner();
    });
    document.body.appendChild(link);
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectBannerStyles();
    injectPreferencesLink();
    if (!consent) showBanner();

    document.querySelectorAll('a[href*="wa.me"]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        reportWhatsappConversion(el);
      });
    });
  });
})();
