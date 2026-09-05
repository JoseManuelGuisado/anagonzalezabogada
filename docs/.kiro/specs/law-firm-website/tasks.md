# Implementation Plan: Web Despacho de Abogados

## Overview

Implementación de una Single Page Application estática para el despacho **Ana González Abogada**, construida con HTML5 semántico, CSS3 (custom properties, Flexbox, Grid) y JavaScript ES6+ puro, sin dependencias de frameworks. El plan sigue el orden lógico: estructura base → sistema de diseño CSS → marcado HTML → estilos de componentes → lógica JS → SEO → analítica → accesibilidad → tests.

---

## Tasks

- [x] 1. Configuración del proyecto y estructura base de archivos
  - Crear la estructura de directorios del proyecto: `assets/css/`, `assets/js/`, `assets/images/`.
  - Crear los archivos vacíos `index.html`, `assets/css/styles.css` y `assets/js/main.js`.
  - Añadir un archivo `README.md` con las instrucciones básicas del proyecto.
  - _Requisitos: 8.3_

- [x] 2. Sistema de diseño CSS: custom properties, reset y tipografía
  - [x] 2.1 Definir variables CSS globales en `:root` con la paleta de colores completa, escala tipográfica, escala de espaciado, anchos máximos y altura de navbar
    - Incluir todos los tokens definidos en el diseño: `--color-primary`, `--color-accent`, `--color-text`, `--color-error`, `--color-success` y el resto de la paleta.
    - Incluir escala tipográfica completa (`--text-xs` → `--text-5xl`) y `--hero-title-size` con `clamp()`.
    - Incluir escala de espaciado (4 px base) y breakpoints documentados.
    - _Requisitos: 7.1, 7.3_

  - [x] 2.2 Implementar CSS reset y estilos base globales
    - Reset de `box-sizing: border-box`, márgenes y paddings a 0.
    - `scroll-behavior: smooth` en `html`.
    - `overflow-x: hidden` en `body` para bloquear scroll horizontal.
    - Estilos de tipografía base: `font-family` con fallback del sistema para cuerpo y headings.
    - Estilos de foco visibles con `outline` personalizado para todos los elementos interactivos.
    - Carga de Google Fonts (Playfair Display + Lato, pesos 400 y 700, `display=swap`) mediante etiquetas `<link>` con `preconnect`.
    - _Requisitos: 7.2, 7.3, 7.4, 7.6, 8.4_

- [x] 3. HTML semántico — estructura completa del documento y todas las secciones
  - [x] 3.1 Crear el esqueleto del documento HTML con `<head>` básico
    - `<!DOCTYPE html>`, `<html lang="es">`, `<meta charset>`, `<meta name="viewport">`, `<title>`.
    - Etiqueta `<link>` para `styles.css` y `<script defer>` para `main.js`.
    - _Requisitos: 8.1, 8.3_

  - [x] 3.2 Implementar el marcado HTML de la Navigation Bar
    - Estructura `<header role="banner"> > <nav aria-label="Navegación principal">` con logo, lista de enlaces y botón hamburguesa.
    - Botón hamburguesa con atributos `aria-expanded="false"`, `aria-controls="nav-menu"` y `aria-label`.
    - Incluir `data-cta-name` en los enlaces y botón CTA según diseño.
    - _Requisitos: 1.1, 1.4, 1.5_

  - [x] 3.3 Implementar el marcado HTML de la sección Hero
    - `<section id="inicio" aria-labelledby="hero-heading">` con `<h1>`, eslogan y dos botones CTA con atributos `data-cta-name`.
    - _Requisitos: 2.1, 2.2, 2.3, 9.1_

  - [x] 3.4 Implementar el marcado HTML de la sección Servicios
    - `<section id="servicios" aria-labelledby="services-heading">` con `<h2>` y cuadrícula `<ul role="list">` de seis tarjetas `<li class="service-card">`.
    - Cada tarjeta con icono (`aria-hidden="true"`), `<h3>` y `<p>` de descripción.
    - _Requisitos: 3.1, 9.2_

  - [x] 3.5 Implementar el marcado HTML de la sección Nosotros
    - `<section id="nosotros" aria-labelledby="about-heading">` con `<h2>`, bloque de texto descriptivo (historia, misión, valores) y al menos un `<article class="lawyer-card">` con `<img>`, `<h3>`, especialidad y biografía.
    - Atributos `alt`, `title`, `loading="lazy"`, `width` y `height` en la imagen.
    - _Requisitos: 4.1, 4.2, 7.5, 8.2, 9.2_

  - [x] 3.6 Implementar el marcado HTML de la sección Contacto
    - `<section id="contacto" aria-labelledby="contact-heading">` con `<h2>`, formulario `<form id="contact-form" novalidate>` con todos los campos (nombre, email, teléfono, asunto, mensaje), spans de error con `role="alert"` y `aria-live="polite"`, botón de envío y bloque `#form-success` oculto con `hidden`.
    - Bloque `<address>` con dirección, teléfono y email del despacho.
    - _Requisitos: 5.1, 5.5, 9.2_

  - [x] 3.7 Implementar el marcado HTML del Footer
    - `<footer role="contentinfo">` con nombre del despacho, `<span id="footer-year">` para el año dinámico, enlaces de Política de Privacidad y Aviso Legal, e icono SVG de LinkedIn con `target="_blank" rel="noopener noreferrer"` y `aria-label`.
    - _Requisitos: 6.1, 6.2, 6.3, 9.2_

- [x] 4. CSS — estilos de componentes
  - [x] 4.1 Estilos de la Navigation Bar
    - `position: fixed; top: 0; width: 100%; z-index: 1000`.
    - Clase `.navbar--scrolled` con fondo `var(--color-primary)` y `box-shadow`.
    - Media query `< 768 px`: ocultar `.navbar__links`, mostrar botón hamburguesa.
    - Menú desplegable mobile con transición CSS (`opacity` + `transform`).
    - Transición suave (200–400 ms) en todos los estados interactivos.
    - _Requisitos: 1.1, 1.3, 1.4, 7.4_

  - [x] 4.2 Estilos de la sección Hero
    - `min-height: 100svh` con fallback `100vh`.
    - Imagen de fondo WebP con degradado superpuesto usando `linear-gradient`.
    - `background-attachment: fixed` en desktop para efecto parallax.
    - Tipografía del H1 con `font-size: var(--hero-title-size)` (`clamp()`).
    - Ajuste de tamaño y espaciado mobile (< 768 px) para evitar desbordamiento.
    - _Requisitos: 2.1, 2.4, 2.5_

  - [x] 4.3 Estilos de la sección Servicios
    - CSS Grid con `grid-template-columns` responsivo: 1 col (< 768 px), 2 col (768–1023 px), 3 col (≥ 1024 px).
    - Tarjetas con borde `var(--color-border)` y `border-radius`.
    - Hover con `@media (hover: hover)`: `transform: translateY(-6px)`, `border-color: var(--color-accent)` y `box-shadow`, con `transition: 300ms ease`.
    - _Requisitos: 3.2, 3.3, 3.4, 3.5, 7.4_

  - [x] 4.4 Estilos de la sección Nosotros
    - Layout con CSS Grid: columna única (< 768 px), dos columnas 60/40 (≥ 768 px).
    - Estilos de `<article class="lawyer-card">` con imagen redondeada y tipografía de especialidad en `--color-text-muted`.
    - _Requisitos: 4.3, 4.4_

  - [x] 4.5 Estilos de la sección Contacto
    - Layout de una columna (< 768 px) y dos columnas (≥ 768 px) para formulario e información.
    - Estilos de `<input>`, `<textarea>`, `<label>` y `.form-error` (color `var(--color-error)`, tamaño pequeño).
    - Estilos de `.form-success` con color `var(--color-success)`.
    - Transición en inputs al recibir foco.
    - _Requisitos: 5.1, 5.6, 7.4_

  - [x] 4.6 Estilos del Footer y utilidades globales
    - Layout del footer: multi-columna (≥ 768 px) y columna única centrada (< 768 px).
    - Estilos de `.btn`, `.btn--primary`, `.btn--secondary` con transición en hover/focus.
    - Clase utilitaria `.sr-only` para contenido solo para lectores de pantalla.
    - _Requisitos: 6.4, 7.4_

- [x] 5. Checkpoint — Verificar estructura visual base
  - Abrir `index.html` en el navegador y comprobar que todas las secciones se renderizan visualmente sin errores de layout o desbordamiento en mobile y desktop. Preguntar al usuario si hay correcciones antes de continuar.

- [~] 6. JavaScript — Navegación
  - [x] 6.1 Implementar la lógica del menú hamburguesa
    - Seleccionar el botón `.navbar__toggle` y la lista `.navbar__links`.
    - Al hacer clic: alternar clase de apertura en el menú y actualizar `aria-expanded` en el botón.
    - Cerrar el menú al hacer clic fuera (listener en `document`).
    - _Requisitos: 1.5, 1.6_

  - [ ] 6.2 Escribir test de propiedad para el toggle del menú hamburguesa
    - **Propiedad 7: Toggle del menú hamburguesa invierte siempre el estado**
    - Generar un estado booleano inicial aleatorio, verificar que invocar toggle produce `!isOpen` y que dos invocaciones consecutivas devuelven el estado original.
    - `// Feature: law-firm-website, Property 7: Toggle idempotente del menú`
    - **Valida: Requisito 1.5**

  - [x] 6.3 Implementar el cambio visual de navbar al hacer scroll
    - Listener `scroll` en `window`: añadir/quitar clase `.navbar--scrolled` según `window.scrollY > 80`.
    - Envolver en `try/catch` con `console.error` como fallback.
    - _Requisitos: 1.3_

  - [ ] 6.4 Escribir test de propiedad para el umbral de scroll de navbar
    - **Propiedad 6: Lógica de scroll activa la clase de navbar superado el umbral**
    - Generar valores numéricos de `scrollY` (positivos y negativos) y verificar que la función aplica/no aplica `.navbar--scrolled` según el umbral 80.
    - `// Feature: law-firm-website, Property 6: Umbral de scroll de navbar`
    - **Valida: Requisito 1.3**

  - [x] 6.5 Implementar scroll suave a secciones
    - Listener en cada enlace de la navbar: prevenir el comportamiento por defecto y llamar a `scrollIntoView({ behavior: 'smooth' })` con fallback para navegadores sin soporte.
    - Cerrar el menú mobile al navegar a una sección.
    - _Requisitos: 1.2_

- [x] 7. JavaScript — Formulario de contacto
  - [x] 7.1 Implementar las funciones puras de validación del formulario
    - `getFormData()`: leer los valores de los cinco campos del DOM y devolver un objeto `ContactFormData`.
    - `validateForm(data)`: validar campos obligatorios (no vacíos, no solo espacios en blanco) y formato de email (RFC 5322). Devolver `ValidationResult`.
    - Función auxiliar de validación de email con expresión regular.
    - _Requisitos: 5.2, 5.3_

  - [ ] 7.2 Escribir test de propiedad P1 — validación rechaza campos obligatorios vacíos o solo espacios en blanco
    - **Propiedad 1: Validación rechaza campos obligatorios vacíos o con solo espacios en blanco**
    - Generar objetos `ContactFormData` con uno o más campos obligatorios como cadena vacía o compuesta solo de `\s`.
    - Verificar que `validateForm` devuelve `{ isValid: false }` con al menos un error por campo inválido.
    - `// Feature: law-firm-website, Property 1: Validación rechaza campos obligatorios vacíos`
    - **Valida: Requisito 5.2**

  - [ ] 7.3 Escribir test de propiedad P2 — validación rechaza emails con formato incorrecto
    - **Propiedad 2: Validación rechaza emails con formato incorrecto**
    - Generar strings arbitrarios que no sean emails válidos (sin `@`, sin TLD, múltiples `@`, etc.).
    - Verificar que `validateForm` devuelve `{ isValid: false }` con error en el campo `email`.
    - `// Feature: law-firm-website, Property 2: Validación rechaza emails incorrectos`
    - **Valida: Requisito 5.3**

  - [ ] 7.4 Escribir test de propiedad P3 — validación acepta formularios completamente válidos
    - **Propiedad 3: Validación acepta formularios completamente válidos**
    - Generar objetos `ContactFormData` completamente válidos (todos los campos obligatorios no vacíos, email con formato correcto).
    - Verificar que `validateForm` devuelve `{ isValid: true }` con mapa de errores vacío.
    - `// Feature: law-firm-website, Property 3: Validación acepta formularios válidos`
    - **Valida: Requisitos 5.2, 5.3, 5.4**

  - [x] 7.5 Implementar la presentación de errores y flujo de envío del formulario
    - `displayErrors(errors)`: mostrar mensajes de error bajo cada campo inválido en los spans `.form-error`.
    - `clearErrors()`: limpiar todos los mensajes de error.
    - `focusFirstError()`: mover el foco programáticamente al primer campo inválido.
    - `showSuccessMessage()`: ocultar el formulario, mostrar `#form-success` y limpiar los campos.
    - Listener `submit` en `#contact-form`: prevenir envío por defecto, llamar a `validateForm`, mostrar errores o mensaje de éxito.
    - _Requisitos: 5.2, 5.3, 5.4_

  - [ ] 7.6 Escribir test de propiedad P4 — round-trip de serialización del formulario
    - **Propiedad 4: Round-trip de serialización del formulario**
    - Generar objetos `ContactFormData` válidos, escribir los valores en el DOM del formulario, leer con `getFormData()` y verificar que los valores son idénticos.
    - `// Feature: law-firm-website, Property 4: Round-trip de serialización del formulario`
    - **Valida: Requisitos 5.1, 5.4**

- [x] 8. JavaScript — Footer y utilidades
  - [x] 8.1 Inyectar el año actual en el footer
    - Obtener `document.getElementById('footer-year')` y asignar `new Date().getFullYear()`.
    - _Requisitos: 6.1_

  - [ ] 8.2 Escribir test de propiedad P5 — formato de año en footer
    - **Propiedad 5: Formato de año en footer**
    - Extraer la función `getFooterYear(year)` y generar enteros en el rango 2000–2100.
    - Verificar que produce una cadena de exactamente 4 dígitos sin prefijos ni sufijos.
    - `// Feature: law-firm-website, Property 5: Formato de año en footer`
    - **Valida: Requisito 6.1**

- [x] 9. Checkpoint — Verificar JavaScript de navegación y formulario
  - Comprobar que el menú hamburguesa, el scroll suave, el cambio de navbar y la validación del formulario funcionan correctamente. Ejecutar los tests de propiedades disponibles. Preguntar al usuario si hay ajustes antes de continuar.

- [ ] 10. SEO — Metaetiquetas, Open Graph y jerarquía semántica
  - [ ] 10.1 Añadir metaetiquetas de SEO en el `<head>` de `index.html`
    - `<title>` descriptivo y único.
    - `<meta name="description">` de 120–160 caracteres.
    - Etiquetas Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`.
    - `<link rel="canonical">`.
    - Verificar que el único `<h1>` está en el Hero, los `<h2>` encabezan cada sección y los `<h3>` los nombres de servicios y abogados.
    - _Requisitos: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ] 10.2 Añadir atributos `title` y `alt` a imágenes y enlaces
    - Revisar todas las etiquetas `<img>` y `<a>` del documento para garantizar que tienen `alt` y `title` descriptivos donde corresponda.
    - _Requisitos: 7.5, 9.5_

- [ ] 11. Google Analytics 4 — Snippet e integración de eventos
  - [ ] 11.1 Añadir el snippet de inicialización de GA4 al `<head>` de `index.html`
    - Insertar el script `gtag.js` con `async` y el bloque de configuración `gtag('config', 'G-XXXXXXXXXX')`.
    - _Requisitos: 10.1_

  - [ ] 11.2 Implementar la función `trackEvent` y el tracking de clics en CTAs
    - Definir `trackEvent(eventName, params)` con comprobación de existencia de `window.gtag` como guardia.
    - Adjuntar listeners de clic a todos los elementos `.js-cta` para disparar `trackEvent('cta_click', { cta_name: el.dataset.ctaName })`.
    - _Requisitos: 10.2_

  - [ ] 11.3 Escribir test de propiedad P8 — tracking GA4 se dispara para cualquier elemento CTA
    - **Propiedad 8: Tracking GA4 se dispara para cualquier elemento CTA**
    - Generar elementos DOM con clase `js-cta` y distintos valores de `data-cta-name`.
    - Simular evento `click` y verificar que `trackEvent` se invoca exactamente una vez con `event_name = 'cta_click'` y el `cta_name` correcto (usar mock de `window.gtag`).
    - `// Feature: law-firm-website, Property 8: Tracking GA4 de CTAs`
    - **Valida: Requisito 10.2**

  - [ ] 11.4 Añadir tracking de envío correcto del formulario
    - Dentro del flujo de `showSuccessMessage()` (o del listener `submit`), disparar `trackEvent('form_submission', { form_id: 'contact_form' })` cuando la validación sea exitosa.
    - _Requisitos: 10.3_

- [ ] 12. Accesibilidad — ARIA, navegación por teclado e indicadores de foco
  - [ ] 12.1 Auditar y completar los atributos ARIA en todo el documento
    - Verificar `role` en `<header>`, `<nav>`, `<footer>`, `<form>` y los spans de error.
    - Revisar que todos los botones e inputs tienen etiquetas accesibles (`aria-label`, `aria-describedby`, `aria-required`).
    - Asegurar que `aria-expanded` se actualiza correctamente en el toggle del menú hamburguesa.
    - _Requisitos: 7.6_

  - [ ] 12.2 Garantizar la navegación completa por teclado
    - Comprobar el orden de tabulación natural del documento (sin `tabindex` positivos innecesarios).
    - Verificar que el indicador de foco CSS es visible en todos los elementos interactivos: botones, enlaces, inputs, textarea.
    - Añadir estilos `:focus-visible` para distinguir el foco de teclado del clic de ratón.
    - _Requisitos: 7.6_

  - [ ] 12.3 Verificar los ratios de contraste de la paleta de colores
    - Confirmar en el CSS que las combinaciones texto/fondo críticas cumplen ratio ≥ 4.5:1 según WCAG 2.1 AA (valores ya verificados en el diseño: `--color-text` sobre `--color-off-white` 18.7:1, `--color-white` sobre `--color-primary` 14.2:1, `--color-accent` sobre `--color-primary` 5.1:1).
    - _Requisitos: 7.2_

- [ ] 13. Testing — Property-based tests con fast-check
  - [ ] 13.1 Configurar el entorno de tests con fast-check y un framework ligero (uvu o similar)
    - Instalar fast-check y uvu como devDependencies (o configurar importación ESM para uso sin bundler).
    - Crear el archivo `tests/properties.test.js` con la importación de fast-check.
    - Añadir script `"test"` en `package.json`.
    - _Requisitos: (infraestructura de testing)_

  - [ ] 13.2 Ejecutar todos los tests de propiedades P1–P8 y verificar que pasan
    - Ejecutar el suite completo de property tests (mínimo 100 iteraciones por propiedad según el diseño).
    - Confirmar que P1, P2, P3, P4, P5, P6, P7 y P8 pasan sin contraejemplos.
    - _Requisitos: 5.2, 5.3, 5.4, 6.1, 1.3, 1.5, 10.2_

- [ ] 14. Checkpoint final — Verificación completa y compatibilidad entre navegadores
  - Verificar renderizado correcto a 375 px, 768 px y 1024 px de ancho de viewport.
  - Confirmar ausencia de scroll horizontal en viewport < 480 px (Requisito 8.4).
  - Comprobar que `loading="lazy"` está presente en todas las imágenes fuera del viewport inicial (Requisito 8.2).
  - Verificar que el proyecto funciona en Chrome, Firefox, Safari y Edge (Requisito 8.1).
  - Ejecutar el suite de tests completo. Preguntar al usuario si hay correcciones finales.

---

## Notes

- Las sub-tareas marcadas con `*` son opcionales y pueden omitirse para una entrega MVP más rápida.
- Cada tarea referencia los requisitos específicos para trazabilidad completa.
- Los checkpoints (tareas 5, 9 y 14) son puntos de pausa para validación incremental.
- Los tests de propiedad validan propiedades universales; los tests unitarios validan casos concretos y aristas.
- El identificador de GA4 `G-XXXXXXXXXX` debe sustituirse por el ID real del cliente antes del despliegue.
- Las imágenes (`hero-bg.webp`, `lawyer-1.webp`, `logo.svg`) deben ser proporcionadas por el cliente o generadas como placeholders durante el desarrollo.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "2.2", "3.1"] },
    { "id": 1, "tasks": ["3.2", "3.3", "3.4", "3.5", "3.6", "3.7"] },
    { "id": 2, "tasks": ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6"] },
    { "id": 3, "tasks": ["6.1", "6.3", "6.5", "7.1", "8.1"] },
    { "id": 4, "tasks": ["6.2", "6.4", "7.2", "7.3", "7.4", "8.2"] },
    { "id": 5, "tasks": ["7.5"] },
    { "id": 6, "tasks": ["7.6", "10.1", "10.2"] },
    { "id": 7, "tasks": ["11.1", "11.2"] },
    { "id": 8, "tasks": ["11.3", "11.4", "12.1", "12.2", "12.3"] },
    { "id": 9, "tasks": ["13.1"] },
    { "id": 10, "tasks": ["13.2"] }
  ]
}
```
