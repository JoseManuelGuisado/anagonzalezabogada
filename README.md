# Ana González Abogada

Sitio web corporativo estático para un despacho de abogados, implementado con HTML5, CSS3 y JavaScript puro.

## Estructura

- `index.html`: página principal del sitio.
- `assets/css/styles.css`: estilos globales y responsive.
- `assets/js/main.js`: interacciones de navegación, formulario y analítica.
- `assets/images/`: recursos gráficos del sitio.
- `tests/`: pruebas automatizadas y checklists de validación.

## Desarrollo local

Puedes abrir `index.html` directamente en el navegador o servir el proyecto como sitio estático.

Ejemplo con Python:

```bash
python3 -m http.server 4173
```

Después abre `http://localhost:4173`.

## Pruebas

Instala dependencias y ejecuta la suite:

```bash
npm install
npm test
```

La suite incluye property-based tests para navegación, validación del formulario, analítica y utilidades del footer.

## Pendientes de despliegue

- Confirmar que el contenedor de Google Tag Manager `GTM-W8XKS29X` publica las etiquetas y disparadores definitivos del sitio.
- Revisar los textos legales con contenido definitivo del despacho.
- Confirmar las URLs públicas finales usadas en `canonical` y metadatos Open Graph.