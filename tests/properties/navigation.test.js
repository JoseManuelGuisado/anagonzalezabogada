const test = require('node:test');
const assert = require('node:assert/strict');
const fc = require('fast-check');

const { shouldNavbarBeScrolled, toggleMenuState } = require('../../docs/assets/js/main.js');

test('Property 7: toggleMenuState siempre invierte el estado y dos toggles restauran el original', async () => {
  await fc.assert(
    fc.asyncProperty(fc.boolean(), async (initialState) => {
      // Feature: law-firm-website, Property 7: Toggle idempotente del menú
      const nextState = toggleMenuState(initialState);
      const finalState = toggleMenuState(nextState);

      assert.equal(nextState, !initialState);
      assert.equal(finalState, initialState);
    }),
    { numRuns: 100 }
  );
});

test('Property 6: shouldNavbarBeScrolled aplica el umbral correcto', async () => {
  await fc.assert(
    fc.asyncProperty(fc.integer({ min: -10000, max: 10000 }), async (scrollY) => {
      // Feature: law-firm-website, Property 6: Umbral de scroll de navbar
      assert.equal(shouldNavbarBeScrolled(scrollY), scrollY > 80);
    }),
    { numRuns: 100 }
  );
});