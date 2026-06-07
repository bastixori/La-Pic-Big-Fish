# Plan de Mejoras — La Picá Big Fish 🐙🐟

Estado actual: **Landing page publicada y funcionando** en [https://bastixori.github.io/La-Pic-Big-Fish/](https://bastixori.github.io/La-Pic-Big-Fish/)

Repositorio: [https://github.com/bastixori/La-Pic-Big-Fish](https://github.com/bastixori/La-Pic-Big-Fish)

---

## Fase 1 — Fotos Reales de Platos (Prioridad Alta)

Reemplazar las imágenes generadas por IA con fotos reales de los platos del restaurant para mayor autenticidad y confianza del cliente.

#### [MODIFY] [index.html](file:///c:/Users/xorid/OneDrive/Desktop/La%20Picá%20Big%20Fish/index.html)
- Actualizar las rutas de imágenes del hero (ceviche), especialidad (pulpo) y paellas con las fotos reales que el usuario proporcione.
- Agregar galerías de fotos reales en cada pestaña del menú (ceviches, paellas, mariscos), similar a como se hizo con las empanadas.

> [!TIP]
> Para esta fase necesitamos que el dueño **saque fotos de sus platos estrella** (ceviche, paella, pescado frito, pulpo). Le indicaremos cómo tomarlas para que se vean profesionales.

---

## Fase 2 — Carrito de Pedidos vía WhatsApp (Prioridad Alta)

Crear un sistema interactivo donde el cliente seleccione los platos que quiere, establezca cantidades, y al hacer clic en "Pedir por WhatsApp" se le genere automáticamente un mensaje formateado con su pedido completo listo para enviar.

#### [NEW] js/cart.js
- Sistema de carrito en memoria (localStorage para persistencia)
- Botones "Agregar al pedido" en cada tarjeta del menú
- Panel lateral (drawer) con resumen del pedido, cantidades editables y total
- Generación automática de mensaje de WhatsApp con formato legible
- Enlace `https://wa.me/NUMERO?text=...` con el pedido codificado

#### [MODIFY] [index.html](file:///c:/Users/xorid/OneDrive/Desktop/La%20Picá%20Big%20Fish/index.html)
- Agregar botones de "Agregar" en cada `.menu-item-card`
- Agregar el drawer/panel lateral del carrito
- Incluir `js/cart.js`

#### [MODIFY] [css/style.css](file:///c:/Users/xorid/OneDrive/Desktop/La%20Picá%20Big%20Fish/css/style.css)
- Estilos para botones de agregar al carrito
- Estilos del drawer lateral con glassmorphism
- Animación de entrada/salida del drawer
- Badge contador en el ícono del carrito flotante

---

## Fase 3 — Galería de Instagram Embebida (Prioridad Media)

Agregar una sección que muestre las últimas publicaciones del Instagram @bigfishchile directamente en la página, para mantenerla actualizada con contenido fresco sin necesidad de editar el código.

#### [MODIFY] [index.html](file:///c:/Users/xorid/OneDrive/Desktop/La%20Picá%20Big%20Fish/index.html)
- Nueva sección `#instagram` entre Especialidad y Contacto
- Grid visual tipo mosaico con las fotos más recientes

#### [MODIFY] [css/style.css](file:///c:/Users/xorid/OneDrive/Desktop/La%20Picá%20Big%20Fish/css/style.css)
- Estilos para la galería con efecto hover (overlay con ícono de Instagram)
- Diseño responsive del grid (3 columnas desktop → 2 tablet → 1 móvil)

---

## Fase 4 — SEO y Rendimiento (Prioridad Media)

Optimizar la página para posicionamiento en buscadores (Google) y mejorar la velocidad de carga.

#### [MODIFY] [index.html](file:///c:/Users/xorid/OneDrive/Desktop/La%20Picá%20Big%20Fish/index.html)
- Agregar metadatos Open Graph (`og:title`, `og:description`, `og:image`) para que al compartir el link en WhatsApp/Instagram se vea una tarjeta bonita con la imagen del restaurant
- Agregar `<link rel="icon">` con el favicon del logo
- Agregar datos estructurados (JSON-LD) tipo `Restaurant` para Google Maps y búsquedas locales

#### [MODIFY] assets/
- Comprimir las imágenes con herramientas de optimización (reducir tamaño sin perder calidad)
- Convertir imágenes a formato WebP para carga más rápida

---

## Fase 5 — Formulario de Reservas Interactivo (Prioridad Baja)

Crear un formulario visual donde los clientes puedan solicitar una reserva seleccionando fecha, hora y número de personas, que también envíe los datos por WhatsApp.

#### [MODIFY] [index.html](file:///c:/Users/xorid/OneDrive/Desktop/La%20Picá%20Big%20Fish/index.html)
- Reemplazar el placeholder del mapa por un formulario interactivo con selector de fecha, hora, y cantidad de personas
- Integración con Google Maps embebido real (iframe)

#### [MODIFY] [css/style.css](file:///c:/Users/xorid/OneDrive/Desktop/La%20Picá%20Big%20Fish/css/style.css)
- Estilos premium para inputs, selectores y botones del formulario
- Animaciones de validación

---

## User Review Required

> [!IMPORTANT]
> **Número de WhatsApp real**: Para que el carrito de pedidos y el formulario de reservas funcionen correctamente, necesitamos el número de WhatsApp real del restaurant (actualmente tiene un placeholder genérico `56912345678`).

> [!IMPORTANT]
> **Fotos reales de platos**: Si tienes fotos de tus platos estrella (ceviche, paella, pulpo, pescado frito), tráelas mañana para reemplazar las imágenes de IA y darle un look 100% auténtico al sitio.

> [!IMPORTANT]
> **Dirección exacta del local**: Para el mapa de Google Maps embebido y los datos estructurados de SEO, necesitamos la dirección exacta del restaurant en Barrio República.

## Open Questions

- ¿Qué fases te gustaría priorizar para mañana?
- ¿Tienes fotos reales de otros platos para agregar?
- ¿Me puedes compartir el número de WhatsApp real del restaurant?
- ¿Quieres que agreguemos precios a las demás categorías del menú (ceviches, paellas, mariscos) como hicimos con las empanadas?

---

## Verificación

### Pruebas por Fase
- **Fase 1**: Verificar que las fotos reales se ven correctas en desktop y móvil
- **Fase 2**: Probar el carrito completo: agregar platos → editar cantidades → generar mensaje de WhatsApp → verificar que el mensaje llega correctamente formateado
- **Fase 3**: Verificar que la galería carga las fotos y los links van al Instagram real
- **Fase 4**: Pasar la página por Google Lighthouse para medir rendimiento y SEO
- **Fase 5**: Probar el formulario de reservas en distintos dispositivos
