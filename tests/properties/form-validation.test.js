const test = require('node:test');
const assert = require('node:assert/strict');
const fc = require('fast-check');
const { JSDOM } = require('jsdom');

const { getFooterYear, getFormData, validateForm } = require('../../assets/js/main.js');

function createValidEmailArbitrary() {
  return fc
    .tuple(
      fc.stringMatching(/^[a-z0-9]{3,12}$/),
      fc.stringMatching(/^[a-z]{3,10}$/),
      fc.constantFrom('com', 'es', 'org', 'net')
    )
    .map(([localPart, domain, tld]) => `${localPart}@${domain}.${tld}`);
}

function createValidFormArbitrary() {
  return fc.record({
    name: fc.stringMatching(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,40}$/),
    email: createValidEmailArbitrary(),
    phone: fc.stringMatching(/^[0-9 +()-]{7,20}$/),
    subject: fc.stringMatching(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ,.:-]{4,60}$/),
    message: fc.stringMatching(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ,.:-]{10,160}$/)
  });
}

function withFormDom(callback) {
  const dom = new JSDOM(`<!DOCTYPE html><form id="contact-form">
    <input id="field-name" name="name" />
    <input id="field-email" name="email" />
    <input id="field-phone" name="phone" />
    <input id="field-subject" name="subject" />
    <textarea id="field-message" name="message"></textarea>
  </form>`);

  global.window = dom.window;
  global.document = dom.window.document;

  try {
    callback(dom.window.document);
  } finally {
    delete global.window;
    delete global.document;
  }
}

test('Property 1: validateForm rechaza campos obligatorios vacíos o con espacios', async () => {
  const blank = fc.constantFrom('', ' ', '   ', '\n', '\t');
  const nonBlank = fc.stringMatching(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,@:-]{3,40}$/);

  await fc.assert(
    fc.asyncProperty(
      fc.record({
        name: fc.oneof(blank, nonBlank),
        email: fc.oneof(blank, nonBlank),
        phone: fc.oneof(blank, nonBlank),
        subject: fc.oneof(blank, nonBlank),
        message: fc.oneof(blank, nonBlank)
      }).filter((data) => {
        return !data.name.trim() || !data.email.trim() || !data.phone.trim() || !data.subject.trim() || !data.message.trim();
      }),
      async (data) => {
        // Feature: law-firm-website, Property 1: Validación rechaza campos obligatorios vacíos
        const result = validateForm(data);
        assert.equal(result.isValid, false);

        if (!data.name.trim()) assert.ok(result.errors.name);
        if (!data.email.trim()) assert.ok(result.errors.email);
        if (!data.phone.trim()) assert.ok(result.errors.phone);
        if (!data.subject.trim()) assert.ok(result.errors.subject);
        if (!data.message.trim()) assert.ok(result.errors.message);
      }
    ),
    { numRuns: 100 }
  );
});

test('Property 2: validateForm rechaza emails con formato incorrecto', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.string().filter((candidate) => candidate.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(candidate.trim())),
      async (invalidEmail) => {
        // Feature: law-firm-website, Property 2: Validación rechaza emails incorrectos
        const result = validateForm({
          name: 'Ana Gonzalez',
          email: invalidEmail,
          phone: '687 82 74 41',
          subject: 'Consulta legal',
          message: 'Necesito asesoramiento sobre un contrato.'
        });

        assert.equal(result.isValid, false);
        assert.ok(result.errors.email);
      }
    ),
    { numRuns: 100 }
  );
});

test('Property 3: validateForm acepta formularios válidos', async () => {
  await fc.assert(
    fc.asyncProperty(createValidFormArbitrary(), async (data) => {
      // Feature: law-firm-website, Property 3: Validación acepta formularios válidos
      const result = validateForm(data);
      assert.equal(result.isValid, true);
      assert.deepEqual(result.errors, {});
    }),
    { numRuns: 100 }
  );
});

test('Property 4: getFormData conserva los valores del formulario en round trip', async () => {
  await fc.assert(
    fc.asyncProperty(createValidFormArbitrary(), async (data) => {
      // Feature: law-firm-website, Property 4: Round-trip de serialización del formulario
      withFormDom((document) => {
        document.getElementById('field-name').value = data.name;
        document.getElementById('field-email').value = data.email;
        document.getElementById('field-phone').value = data.phone;
        document.getElementById('field-subject').value = data.subject;
        document.getElementById('field-message').value = data.message;

        assert.deepEqual(getFormData(), data);
      });
    }),
    { numRuns: 100 }
  );
});

test('Property 5: getFooterYear devuelve exactamente 4 dígitos para años válidos', async () => {
  await fc.assert(
    fc.asyncProperty(fc.integer({ min: 2000, max: 2100 }), async (year) => {
      // Feature: law-firm-website, Property 5: Formato de año en footer
      const formattedYear = getFooterYear(year);
      assert.match(formattedYear, /^\d{4}$/);
      assert.equal(formattedYear, String(year));
    }),
    { numRuns: 100 }
  );
});