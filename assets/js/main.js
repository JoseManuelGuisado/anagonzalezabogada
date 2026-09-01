/**
 * main.js — Lógica principal de Ana González Abogada
 * Requisitos: 1.2, 1.3, 1.5, 1.6, 5.2, 5.3, 5.4, 6.1, 10.2, 10.3
 */

'use strict';

/* ============================================================
   UTILIDADES GENERALES
   ============================================================ */

/**
 * Función auxiliar segura para disparar eventos de Google Analytics 4.
 * @param {string} eventName
 * @param {Object} [params={}]
 */
function trackEvent(eventName, params) {
  if (typeof window === 'undefined') {
    return;
  }

  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
      return;
    } catch (err) {
      console.error('[GTM] Error al enviar evento al dataLayer:', eventName, err);
    }
  }

  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params || {});
    } catch (err) {
      console.error('[GA4] Error al disparar evento:', eventName, err);
    }
  }
}

function bindTrackedCtas(root) {
  var scope = root || document;
  if (!scope || typeof scope.querySelectorAll !== 'function') return;

  scope.querySelectorAll('.js-cta[data-cta-name]').forEach(function (element) {
    if (element.dataset.trackingBound === 'true') return;

    element.addEventListener('click', function () {
      trackEvent('cta_click', { cta_name: element.dataset.ctaName });
    });

    element.dataset.trackingBound = 'true';
  });
}

/* ============================================================
   8.1 — FOOTER: AÑO DINÁMICO
   ============================================================ */

/**
 * Devuelve el año como string de 4 dígitos (testable para Property 5).
 * @param {number} year
 * @returns {string}
 */
function getFooterYear(year) {
  return String(Math.trunc(year));
}

function initFooterYear() {
  try {
    var yearEl = document.getElementById('footer-year');
    if (yearEl) {
      yearEl.textContent = getFooterYear(new Date().getFullYear());
    }
  } catch (err) {
    console.error('[Footer] Error al inyectar el año:', err);
  }
}

/* ============================================================
   6.3 — NAVBAR: CAMBIO VISUAL AL HACER SCROLL
   ============================================================ */

/**
 * Determina si la navbar debe mostrar el estado scrolled (Property 6).
 * @param {number} scrollY
 * @returns {boolean}
 */
function shouldNavbarBeScrolled(scrollY) {
  return scrollY > 80;
}

function initNavbarScroll() {
  try {
    var header = document.querySelector('.site-header');
    if (!header) return;

    function handleScroll() {
      try {
        if (shouldNavbarBeScrolled(window.scrollY)) {
          header.classList.add('navbar--scrolled');
        } else {
          header.classList.remove('navbar--scrolled');
        }
      } catch (err) {
        console.error('[Navbar] Error en scroll handler:', err);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  } catch (err) {
    console.error('[Navbar] Error al inicializar scroll:', err);
  }
}

/* ============================================================
   6.1 — MENÚ HAMBURGUESA
   ============================================================ */

/**
 * Invierte el estado booleano del menú (Property 7).
 * @param {boolean} isOpen
 * @returns {boolean}
 */
function toggleMenuState(isOpen) {
  return !isOpen;
}

function initHamburgerMenu() {
  try {
    var toggle = document.querySelector('.navbar__toggle');
    var navLinks = document.getElementById('nav-menu');
    if (!toggle || !navLinks) return;

    var isMenuOpen = false;

    function openMenu() {
      isMenuOpen = true;
      navLinks.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    }

    function closeMenu() {
      isMenuOpen = false;
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    }

    toggle.addEventListener('click', function () {
      try {
        isMenuOpen = toggleMenuState(isMenuOpen);
        if (isMenuOpen) { openMenu(); } else { closeMenu(); }
      } catch (err) {
        console.error('[Menu] Error en toggle:', err);
      }
    });

    document.addEventListener('click', function (event) {
      try {
        if (isMenuOpen && !toggle.contains(event.target) && !navLinks.contains(event.target)) {
          closeMenu();
        }
      } catch (err) {
        console.error('[Menu] Error al cerrar clic externo:', err);
      }
    });

    document.addEventListener('keydown', function (event) {
      try {
        if (event.key === 'Escape' && isMenuOpen) {
          closeMenu();
          toggle.focus();
        }
      } catch (err) {
        console.error('[Menu] Error en keydown Escape:', err);
      }
    });
  } catch (err) {
    console.error('[Menu] Error al inicializar hamburguesa:', err);
  }
}

/* ============================================================
   6.5 — SCROLL SUAVE A SECCIONES
   ============================================================ */

function initSmoothScroll() {
  try {
    var navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;

    var links = navMenu.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        try {
          var targetId = link.getAttribute('href');
          var targetEl = document.querySelector(targetId);
          if (targetEl) {
            event.preventDefault();
            if ('scrollBehavior' in document.documentElement.style) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              targetEl.scrollIntoView(true);
            }
            // Cerrar menú mobile si está abierto
            var mobileMenu = document.getElementById('nav-menu');
            var hamburgerBtn = document.querySelector('.navbar__toggle');
            if (mobileMenu && mobileMenu.classList.contains('is-open')) {
              mobileMenu.classList.remove('is-open');
              if (hamburgerBtn) {
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.setAttribute('aria-label', 'Abrir menú de navegación');
              }
            }
          }
        } catch (err) {
          console.error('[SmoothScroll] Error en click handler:', err);
        }
      });
    });
  } catch (err) {
    console.error('[SmoothScroll] Error al inicializar:', err);
  }
}

/* ============================================================
   7.1 — VALIDACIÓN DEL FORMULARIO (funciones puras)
   ============================================================ */

/**
 * Expresión regular RFC 5322 simplificada para validación de email.
 */
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Lee los valores del formulario DOM.
 * @returns {{ name: string, email: string, phone: string, subject: string, message: string }}
 */
function getFormData() {
  return {
    name:    (document.getElementById('field-name')    || { value: '' }).value,
    email:   (document.getElementById('field-email')   || { value: '' }).value,
    phone:   (document.getElementById('field-phone')   || { value: '' }).value,
    subject: (document.getElementById('field-subject') || { value: '' }).value,
    message: (document.getElementById('field-message') || { value: '' }).value
  };
}

/**
 * Valida un ContactFormData. Pure function para Property 1, 2, 3.
 * @param {{ name: string, email: string, phone: string, subject: string, message: string }} data
 * @returns {{ isValid: boolean, errors: Object.<string, string> }}
 */
function validateForm(data) {
  var errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'El nombre completo es obligatorio.';
  }
  if (!data.email || !data.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Introduce un correo electrónico válido.';
  }
  if (!data.subject || !data.subject.trim()) {
    errors.subject = 'El asunto es obligatorio.';
  }
  if (!data.message || !data.message.trim()) {
    errors.message = 'El mensaje es obligatorio.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

/* ============================================================
   7.5 — FORMULARIO: PRESENTACIÓN DE ERRORES Y ENVÍO
   ============================================================ */

/**
 * Muestra errores de validación bajo los campos correspondientes.
 * @param {Object.<string, string>} errors - Mapa de campo → mensaje
 */
function displayErrors(errors) {
  var fieldMap = {
    name:    'error-name',
    email:   'error-email',
    subject: 'error-subject',
    message: 'error-message'
  };

  // Limpiar errores previos
  Object.values(fieldMap).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) { el.textContent = ''; }
  });

  // Mostrar nuevos errores
  Object.keys(errors).forEach(function (field) {
    var spanId = fieldMap[field];
    if (spanId) {
      var span = document.getElementById(spanId);
      if (span) { span.textContent = errors[field]; }
    }
  });
}

/**
 * Limpia todos los mensajes de error del formulario.
 */
function clearErrors() {
  ['error-name', 'error-email', 'error-subject', 'error-message'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) { el.textContent = ''; }
  });
}

/**
 * Mueve el foco al primer campo con error.
 * @param {Object.<string, string>} errors
 */
function focusFirstError(errors) {
  var fieldIds = { name: 'field-name', email: 'field-email', subject: 'field-subject', message: 'field-message' };
  var firstField = Object.keys(errors)[0];
  if (firstField && fieldIds[firstField]) {
    var el = document.getElementById(fieldIds[firstField]);
    if (el) { el.focus(); }
  }
}

/**
 * Muestra el mensaje de éxito y limpia el formulario.
 */
function showSuccessMessage() {
  var form = document.getElementById('contact-form');
  var successMsg = document.getElementById('form-success');
  if (form) {
    form.reset();
    clearErrors();
  }
  if (successMsg) {
    successMsg.removeAttribute('hidden');
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function initContactForm() {
  try {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      try {
        clearErrors();
        var data = getFormData();
        var result = validateForm(data);

        if (result.isValid) {
          showSuccessMessage();
          // GA4 event tracked in task 11.4 — trackEvent placeholder
          if (typeof trackEvent === 'function') {
            trackEvent('form_submission', { form_id: 'contact_form' });
          }
        } else {
          displayErrors(result.errors);
          focusFirstError(result.errors);
        }
      } catch (err) {
        console.error('[Form] Error en submit handler:', err);
      }
    });

    // Clear error on input change for better UX
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        var errorId = 'error-' + field.name;
        var errorEl = document.getElementById(errorId);
        if (errorEl) { errorEl.textContent = ''; }
      });
    });

  } catch (err) {
    console.error('[Form] Error al inicializar formulario:', err);
  }
}

/* ============================================================
   10.x — GOOGLE ANALYTICS 4
   ============================================================ */

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */

function initApp() {
  initFooterYear();
  initNavbarScroll();
  initHamburgerMenu();
  initSmoothScroll();
  bindTrackedCtas(document);
  initContactForm();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initApp);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    bindTrackedCtas: bindTrackedCtas,
    EMAIL_REGEX: EMAIL_REGEX,
    focusFirstError: focusFirstError,
    getFooterYear: getFooterYear,
    getFormData: getFormData,
    initApp: initApp,
    shouldNavbarBeScrolled: shouldNavbarBeScrolled,
    toggleMenuState: toggleMenuState,
    trackEvent: trackEvent,
    validateForm: validateForm
  };
}
