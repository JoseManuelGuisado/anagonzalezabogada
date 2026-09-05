const test = require('node:test');
const assert = require('node:assert/strict');
const fc = require('fast-check');
const { JSDOM } = require('jsdom');

const { bindTrackedCtas, trackEvent } = require('../../../assets/js/main.js');

test('Property 8: cualquier CTA rastreable dispara exactamente un evento con su identificador', async () => {
  await fc.assert(
    fc.asyncProperty(fc.stringMatching(/^[a-z0-9_-]{3,30}$/), async (ctaName) => {
      // Feature: law-firm-website, Property 8: Tracking GA4 de CTAs
      const dom = new JSDOM(`<!DOCTYPE html><a class="js-cta" data-cta-name="${ctaName}" href="#contacto">CTA</a>`);
      const calls = [];

      global.window = dom.window;
      global.document = dom.window.document;
      global.window.dataLayer = calls;

      try {
        bindTrackedCtas(dom.window.document);
        dom.window.document.querySelector('.js-cta').click();

        assert.equal(calls.length, 1);
        assert.deepEqual(calls[0], { event: 'cta_click', cta_name: ctaName });
      } finally {
        delete global.window;
        delete global.document;
      }
    }),
    { numRuns: 100 }
  );
});

test('trackEvent usa el fallback de gtag si dataLayer no está disponible', () => {
  const calls = [];
  global.window = {
    gtag() {
      calls.push(Array.from(arguments));
    }
  };

  try {
    trackEvent('cta_click', { cta_name: 'hero_contacto' });
    assert.deepEqual(calls, [['event', 'cta_click', { cta_name: 'hero_contacto' }]]);
  } finally {
    delete global.window;
  }
});