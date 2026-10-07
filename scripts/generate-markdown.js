const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const { hostname, publicPages } = require('./site-pages');

const siteRoot = path.resolve(__dirname, '..');
const blockTags = new Set([
  'article',
  'div',
  'header',
  'main',
  'section'
]);

function getMeta(document, selector) {
  const element = document.querySelector(selector);
  return element ? element.getAttribute('content') : '';
}

function escapeYaml(value) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function toAbsoluteUrl(pageUrl, href) {
  return new URL(href, pageUrl).toString();
}

function renderInline(node, pageUrl) {
  if (node.nodeType === node.TEXT_NODE) {
    return node.textContent.replace(/\s+/g, ' ');
  }

  if (node.nodeType !== node.ELEMENT_NODE) {
    return '';
  }

  const tagName = node.tagName.toLowerCase();

  if (tagName === 'br') {
    return ' ';
  }

  if (tagName === 'a') {
    const text = normalizeWhitespace(Array.from(node.childNodes).map((child) => renderInline(child, pageUrl)).join(' '));
    const href = node.getAttribute('href');

    if (!href || !text) {
      return text;
    }

    return `[${text}](${toAbsoluteUrl(pageUrl, href)})`;
  }

  if (tagName === 'strong' || tagName === 'b') {
    const text = normalizeWhitespace(Array.from(node.childNodes).map((child) => renderInline(child, pageUrl)).join(' '));
    return text ? `**${text}**` : '';
  }

  if (tagName === 'em' || tagName === 'i') {
    const text = normalizeWhitespace(Array.from(node.childNodes).map((child) => renderInline(child, pageUrl)).join(' '));
    return text ? `*${text}*` : '';
  }

  return Array.from(node.childNodes).map((child) => renderInline(child, pageUrl)).join(' ');
}

function inlineText(node, pageUrl) {
  return normalizeWhitespace(
    renderInline(node, pageUrl)
      .replace(/ +([,.;:!?])/g, '$1')
  );
}

function pushParagraph(lines, text) {
  if (!text) {
    return;
  }

  lines.push(text);
  lines.push('');
}

function renderList(list, lines, pageUrl, depth = 0) {
  const ordered = list.tagName.toLowerCase() === 'ol';
  const items = Array.from(list.children).filter((child) => child.tagName && child.tagName.toLowerCase() === 'li');

  items.forEach((item, index) => {
    const nestedLists = Array.from(item.children).filter((child) => ['ul', 'ol'].includes(child.tagName.toLowerCase()));
    const headingChild = Array.from(item.children).find((child) => /^h[1-6]$/.test(child.tagName.toLowerCase()));
    const paragraphChildren = Array.from(item.children).filter((child) => child.tagName.toLowerCase() === 'p');
    const textNodes = Array.from(item.childNodes).filter((child) => {
      return !(child.nodeType === child.ELEMENT_NODE && ['ul', 'ol'].includes(child.tagName.toLowerCase()));
    });
    let text = normalizeWhitespace(textNodes.map((child) => renderInline(child, pageUrl)).join(' '));

    if (headingChild && paragraphChildren.length > 0) {
      const heading = inlineText(headingChild, pageUrl);
      const description = normalizeWhitespace(paragraphChildren.map((child) => inlineText(child, pageUrl)).join(' '));
      text = `**${heading}:** ${description}`;
    }

    const marker = ordered ? `${index + 1}.` : '-';

    if (text) {
      lines.push(`${'  '.repeat(depth)}${marker} ${text}`);
    }

    nestedLists.forEach((nestedList) => renderList(nestedList, lines, pageUrl, depth + 1));
  });

  lines.push('');
}

function renderForm(form, lines) {
  const heading = form.getAttribute('aria-label') || 'Formulario';
  const fields = Array.from(form.querySelectorAll('label')).map((label) => {
    const labelCopy = label.cloneNode(true);
    labelCopy.querySelector('.form-required')?.remove();
    const required = label.querySelector('.form-required') ? ' (obligatorio)' : '';
    return `${normalizeWhitespace(labelCopy.textContent)}${required}`;
  }).filter(Boolean);
  const submitButton = form.querySelector('button[type="submit"]');

  lines.push(`### ${heading}`);
  lines.push('');

  if (fields.length > 0) {
    fields.forEach((field) => lines.push(`- ${field}`));
    lines.push('');
  }

  if (submitButton) {
    pushParagraph(lines, `Acción principal: ${normalizeWhitespace(submitButton.textContent)}`);
  }
}

function renderBlock(element, lines, pageUrl) {
  if (!element.tagName) {
    return;
  }

  const tagName = element.tagName.toLowerCase();

  if (['script', 'style', 'noscript', 'svg', 'path', 'iframe'].includes(tagName)) {
    return;
  }

  if (tagName === 'form') {
    renderForm(element, lines);
    return;
  }

  if (tagName === 'address') {
    Array.from(element.children).forEach((child) => renderBlock(child, lines, pageUrl));
    return;
  }

  if (/^h[1-6]$/.test(tagName)) {
    const level = Number(tagName.slice(1));
    const text = inlineText(element, pageUrl);

    if (text) {
      lines.push(`${'#'.repeat(level)} ${text}`);
      lines.push('');
    }
    return;
  }

  if (tagName === 'p') {
    pushParagraph(lines, inlineText(element, pageUrl));
    return;
  }

  if (tagName === 'ul' || tagName === 'ol') {
    renderList(element, lines, pageUrl);
    return;
  }

  if (tagName === 'button') {
    pushParagraph(lines, inlineText(element, pageUrl));
    return;
  }

  if (blockTags.has(tagName)) {
    Array.from(element.children).forEach((child) => renderBlock(child, lines, pageUrl));
    return;
  }

  const text = inlineText(element, pageUrl);
  if (text) {
    pushParagraph(lines, text);
  }
}

function buildFrontmatter(document) {
  const title = normalizeWhitespace(
    getMeta(document, 'meta[name="title"]') ||
    document.querySelector('title')?.textContent ||
    getMeta(document, 'meta[property="og:title"]')
  );
  const description = normalizeWhitespace(
    getMeta(document, 'meta[name="description"]') ||
    getMeta(document, 'meta[property="og:description"]')
  );
  const image = normalizeWhitespace(getMeta(document, 'meta[property="og:image"]'));
  const frontmatter = [];

  if (title) {
    frontmatter.push(`title: "${escapeYaml(title)}"`);
  }

  if (description) {
    frontmatter.push(`description: "${escapeYaml(description)}"`);
  }

  if (image) {
    frontmatter.push(`image: "${escapeYaml(image)}"`);
  }

  if (frontmatter.length === 0) {
    return [];
  }

  return ['---', ...frontmatter, '---', ''];
}

function buildMarkdown(page) {
  const htmlPath = path.join(siteRoot, page.file);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const pageUrl = `${hostname}${page.url}`;
  const lines = buildFrontmatter(document);
  const main = document.querySelector('main') || document.body;

  Array.from(main.children).forEach((child) => renderBlock(child, lines, pageUrl));

  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

publicPages.forEach((page) => {
  const markdownPath = path.join(siteRoot, page.markdown);
  const markdown = buildMarkdown(page);
  fs.writeFileSync(markdownPath, markdown, 'utf8');
});