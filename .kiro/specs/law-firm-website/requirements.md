# Requirements Document
 
## Introduction
 
Este documento define los requisitos para el desarrollo de una página web profesional para un despacho de abogados. La web será desarrollada con HTML5, CSS3 y JavaScript puro (sin frameworks), con un diseño moderno, atractivo y responsive bajo la filosofía mobile-first. El objetivo es ofrecer una presencia digital profesional que transmita confianza, credibilidad y facilite el contacto con los clientes.
 
## Glossary
 
- **Website**: La página web completa del despacho de abogados.
- **Navigation_Bar**: Barra de navegación principal con enlaces a las secciones.
- **Hero_Section**: Sección de cabecera principal con imagen destacada y llamada a la acción.
- **Services_Section**: Sección que describe las áreas de práctica legal del despacho.
- **About_Section**: Sección con información sobre el despacho y sus abogados.
- **Contact_Section**: Sección con formulario de contacto e información de localización.
- **Footer**: Pie de página con información legal y enlaces de utilidad.
- **Contact_Form**: Formulario de contacto para que los visitantes envíen consultas.
- **Viewport**: Área visible de la pantalla del dispositivo del usuario.
- **Breakpoint**: Punto de ruptura de anchura en píxeles que determina el diseño responsive.
- **CTA**: Llamada a la acción (Call To Action), elemento interactivo que invita al usuario a realizar una acción.
 
---
 
## Requirements
 
### Requisito 1: Estructura y navegación principal
 
**User Story:** Como visitante del sitio web, quiero una navegación clara y accesible, para poder desplazarme fácilmente por todas las secciones del despacho.
 
#### Criterios de Aceptación
 
1. THE Website SHALL incluir una Navigation_Bar fija en la parte superior de la página con el logotipo del despacho y enlaces a las secciones: Inicio, Servicios, Nosotros y Contacto.
2. WHEN el usuario hace clic en un enlace de la Navigation_Bar, THE Website SHALL desplazarse suavemente (scroll suave) hasta la sección correspondiente.
3. WHILE el usuario desplaza la página más de 80 píxeles hacia abajo, THE Navigation_Bar SHALL cambiar su apariencia aplicando un fondo sólido con sombra para mejorar la legibilidad.
4. WHEN el Viewport tiene una anchura inferior a 768 píxeles, THE Navigation_Bar SHALL ocultar los enlaces de navegación y mostrar un botón de menú hamburguesa.
5. WHEN el usuario hace clic en el botón de menú hamburguesa, THE Navigation_Bar SHALL mostrar u ocultar un menú desplegable con todos los enlaces de navegación.
6. IF el usuario hace clic fuera del menú desplegable mientras está abierto, THEN THE Navigation_Bar SHALL cerrar el menú desplegable.
 
---
 
### Requisito 2: Sección Hero (cabecera principal)
 
**User Story:** Como visitante del sitio web, quiero ver una presentación visual impactante al entrar en la web, para comprender de inmediato a qué se dedica el despacho y cómo contactar.
 
#### Criterios de Aceptación
 
1. THE Hero_Section SHALL ocupar al menos el 100% de la altura del Viewport en el punto de entrada a la página.
2. THE Hero_Section SHALL mostrar el nombre del despacho, un eslogan profesional y un botón CTA principal que dirija al usuario a la sección de Contacto.
3. THE Hero_Section SHALL mostrar un botón CTA secundario que dirija al usuario a la sección de Servicios.
4. WHEN el Viewport tiene una anchura inferior a 768 píxeles, THE Hero_Section SHALL ajustar el tamaño tipográfico y el espaciado para garantizar legibilidad sin desbordamiento horizontal.
5. THE Hero_Section SHALL utilizar una imagen o degradado de fondo de alta calidad que transmita profesionalidad y seriedad.
 
---
 
### Requisito 3: Sección de Servicios
 
**User Story:** Como cliente potencial, quiero conocer las áreas de práctica del despacho, para evaluar si pueden atender mi caso concreto.
 
#### Criterios de Aceptación
 
1. THE Services_Section SHALL mostrar al menos seis áreas de práctica legal, cada una con un icono representativo, un título y una descripción breve de no más de tres líneas.
2. WHEN el Viewport tiene una anchura igual o superior a 1024 píxeles, THE Services_Section SHALL presentar las tarjetas de servicios en una cuadrícula de tres columnas.
3. WHEN el Viewport tiene una anchura entre 768 píxeles y 1023 píxeles, THE Services_Section SHALL presentar las tarjetas de servicios en una cuadrícula de dos columnas.
4. WHEN el Viewport tiene una anchura inferior a 768 píxeles, THE Services_Section SHALL presentar las tarjetas de servicios en una sola columna.
5. WHEN el usuario pasa el cursor sobre una tarjeta de servicio en un dispositivo con puntero, THE Services_Section SHALL aplicar una animación de elevación y cambio de color de borde en la tarjeta.
 
---
 
### Requisito 4: Sección Nosotros (About)
 
**User Story:** Como cliente potencial, quiero conocer la trayectoria y los valores del despacho, para generar confianza antes de contactar.
 
#### Criterios de Aceptación
 
1. THE About_Section SHALL mostrar una descripción del despacho que incluya su historia, misión y valores diferenciales.
2. THE About_Section SHALL incluir al menos un perfil de abogado con fotografía, nombre, especialidad y una breve biografía profesional.
3. WHEN el Viewport tiene una anchura igual o superior a 768 píxeles, THE About_Section SHALL presentar el texto descriptivo y los perfiles en un diseño de dos columnas.
4. WHEN el Viewport tiene una anchura inferior a 768 píxeles, THE About_Section SHALL presentar el texto descriptivo y los perfiles en una sola columna apilada verticalmente.
 
---
 
### Requisito 5: Sección de Contacto y formulario
 
**User Story:** Como cliente potencial, quiero poder enviar una consulta fácilmente desde la web, para iniciar el contacto con el despacho sin necesidad de llamar.
 
#### Criterios de Aceptación
 
1. THE Contact_Section SHALL incluir un Contact_Form con los campos: nombre completo (obligatorio), correo electrónico (obligatorio), teléfono (opcional), asunto (obligatorio) y mensaje (obligatorio).
2. WHEN el usuario intenta enviar el Contact_Form con algún campo obligatorio vacío, THE Contact_Form SHALL mostrar un mensaje de error específico bajo el campo correspondiente indicando que el campo es requerido.
3. WHEN el usuario introduce un valor en el campo de correo electrónico que no cumple el formato estándar RFC 5322, THE Contact_Form SHALL mostrar un mensaje de error indicando que el formato de correo no es válido.
4. WHEN el usuario envía el Contact_Form con todos los campos obligatorios correctamente cumplimentados, THE Contact_Form SHALL mostrar un mensaje de confirmación de envío y limpiar los campos del formulario.
5. THE Contact_Section SHALL mostrar la dirección del despacho, el número de teléfono y el correo electrónico de contacto de forma visible junto al formulario.
6. WHEN el Viewport tiene una anchura inferior a 768 píxeles, THE Contact_Section SHALL presentar el formulario y la información de contacto en una sola columna apilada verticalmente.
 
---
 
### Requisito 6: Pie de página (Footer)
 
**User Story:** Como visitante del sitio web, quiero acceder a información legal y enlaces de utilidad desde el pie de página, para navegar de forma completa y conocer los datos legales del despacho.
 
#### Criterios de Aceptación
 
1. THE Footer SHALL mostrar el nombre del despacho, el año de copyright actualizado automáticamente y un aviso de derechos reservados.
2. THE Footer SHALL incluir enlaces a la Política de Privacidad y al Aviso Legal.
3. THE Footer SHALL incluir iconos de redes sociales clicables (LinkedIn al menos) que abran el enlace en una nueva pestaña del navegador.
4. WHEN el Viewport tiene una anchura inferior a 768 píxeles, THE Footer SHALL reorganizar su contenido en una sola columna centrada.
 
---
 
### Requisito 7: Diseño visual y accesibilidad
 
**User Story:** Como visitante del sitio web, quiero que la web sea visualmente atractiva y accesible, para tener una experiencia de navegación cómoda independientemente de mis capacidades o dispositivo.
 
#### Criterios de Aceptación
 
1. THE Website SHALL utilizar una paleta de colores corporativa coherente definida mediante variables CSS, con al menos un color principal, un color secundario y un color de acento.
2. THE Website SHALL garantizar un ratio de contraste mínimo de 4.5:1 entre el color del texto y el color del fondo en todos los elementos de texto de contenido, conforme a las pautas WCAG 2.1 nivel AA.
3. THE Website SHALL utilizar fuentes tipográficas cargadas desde Google Fonts con al menos dos variantes de peso (regular y bold).
4. THE Website SHALL aplicar transiciones CSS suaves (duración entre 200 ms y 400 ms) en todos los elementos interactivos como botones, tarjetas y enlaces.
5. THE Website SHALL incluir atributos `alt` descriptivos en todas las imágenes para garantizar la accesibilidad con tecnologías de asistencia.
6. THE Website SHALL ser completamente navegable mediante teclado, manteniendo un indicador de foco visible en todos los elementos interactivos.
 
---
 
### Requisito 8: Rendimiento y compatibilidad
 
**User Story:** Como visitante del sitio web, quiero que la web cargue rápidamente en cualquier dispositivo y navegador moderno, para no abandonar la página por tiempos de espera excesivos.
 
#### Criterios de Aceptación
 
1. THE Website SHALL cargarse de forma funcional en los navegadores Chrome, Firefox, Safari y Edge en sus versiones estables más recientes.
2. THE Website SHALL implementar el atributo `loading="lazy"` en todas las imágenes que no sean visibles en el Viewport inicial, para reducir el tiempo de carga percibido.
3. THE Website SHALL definir todos los estilos en un único archivo CSS externo y todo el comportamiento dinámico en un único archivo JavaScript externo, para facilitar el mantenimiento y el cacheo.
4. WHEN el usuario accede a la web desde un dispositivo con Viewport de anchura inferior a 480 píxeles, THE Website SHALL renderizarse correctamente sin desbordamiento horizontal ni necesidad de scroll horizontal.

---

### Requisito 9: SEO

**User Story:** Como administrador del sitio web, quiero que la web esté preparada para que tenga un buen SEO, que los metadatos y las etiquetas HTML para los textos correspondan con los estándares del buen SEO.

#### Criterios de Aceptación

1. THE website SHALL tener UN texto principal con etiqueta H1, que sea descriptivo y que ayude a posicionar la web en buscadores.
2. THE website SHALL tener varios textos secundarios con etiqueta H2 que actuarán como subtitulos. Estos textos pueden ser, por ejemplo, el título de cada una de las secciones.
3. THE Website SHALL incroporar correctamente todas las etiquetas HTML5 necesarias para favorecer el posicionamiento en buscadores.
4. THE Website SHALL tener metaetiquetas útiles que faciliten el posicionamiento en buscadores.
5. THE Website SHALL añadir atributos title y alt a imágenes y enlaces.
6. THE Website SHALL incluir una etiqueta `<meta name="description">` en el `<head>` con una descripción única y descriptiva del sitio de entre 120 y 160 caracteres que resuma el servicio del despacho para los buscadores.
7. THE Website SHALL incluir etiquetas Open Graph (`og:title`, `og:description`, `og:image` y `og:url`) en el `<head>` para controlar la apariencia del enlace cuando se comparte en redes sociales o aplicaciones de mensajería.

--- 

### Requisito 10: Google Analytics

**User Story:** Como administrador del sitio web, quiero conocer el uso que hacen los usuarios de mi sitio web, saber cuantos usuarios acceden, si vienen de buscadores, cuanto tiempo permenecen en la web, en qué botones hacen click o si envían el formulario.

#### Criterios de Aceptación

1. THE website SHALL comunicarse con Google Analytics para enviar información sobre la navegación de los usuarios.
2. THE website SHALL enviar notificación a Google Analytics cada vez que un usuario hace click en un CTA, informado sobre con qué CTA ha interactuado.
3. THE website SHALL enviar notificación a Google Analytics cada vez que un usuario envía el formulario de contacto.