const hostname = 'https://anagonzalezabogada.es';

const publicPages = [
  { file: 'index.html', url: '/', markdown: 'index.md' },
  { file: 'aviso-legal.html', url: '/aviso-legal.html', markdown: 'aviso-legal.md' },
  { file: 'privacidad.html', url: '/privacidad.html', markdown: 'privacidad.md' }
];

module.exports = {
  hostname,
  publicPages
};