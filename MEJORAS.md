# Plan de Mejoras — La Picá Big Fish 🐙🐟

Estado actual: **Sitio optimizado, listo para producción y despliegue**
Página Principal: [https://bastixori.github.io/La-Pic-Big-Fish/](https://bastixori.github.io/La-Pic-Big-Fish/)
Repositorio: [https://github.com/bastixori/La-Pic-Big-Fish](https://github.com/bastixori/La-Pic-Big-Fish)

---

## 📈 Resumen de Progreso

| Fase | Tarea / Característica | Estado | Archivos Modificados |
| :--- | :--- | :--- | :--- |
| **Fase 1** | **Fotos Reales de Platos** | ✅ Completado | `index.html`, `menu.html` |
| **Fase 2** | **Carrito de Pedidos WhatsApp** | ✅ Completado (Respaldado) | `menu_con_carrito.html` |
| **Fase 3** | **Galería de Instagram Embebida** | ⏳ Pendiente | - |
| **Fase 4** | **SEO y Rendimiento (Despliegue)** | ✅ Completado | `index.html`, `menu.html`, `menu_con_carrito.html` |
| **Fase 5** | **Formulario de Reservas** | ⏳ Pendiente | - |

---

## 🐟 Detalles de Implementación

### Fase 1 — Fotos Reales de Platos
Reemplazo exitoso de recursos visuales antiguos por fotografías auténticas del restaurante para inspirar mayor confianza:
* **Ceviche en Hero**: Vinculado a `assets/hero_ceviche.png`.
* **Empanadas Fritas**: Vinculado a `assets/empanadas.jpg` en secciones y carta digital.
* **Paella / Platos**: Vinculado a `assets/paella_dish.png` en el mapa/contacto y fondo de platos.
* **Pulpo (Especialidad)**: Vinculado a `assets/octopus_art.png`.
* **Fotos de Equipo**: Validadas y cargando exitosamente (`marcelo.jpg`, `cata.jpg`, `rafa.jpg`).

### Fase 2 — Carrito de Pedidos vía WhatsApp
Desarrollo de la experiencia interactiva de compra integrada al restaurante. Para mayor flexibilidad, se mantuvieron dos alternativas en el repositorio:
1. **Versión Estática (`menu.html`)**: Versión actual en producción. Muestra todos los platos, descripciones y precios limpios con banners de fotos reales, ideal para consulta directa rápida.
2. **Versión con Carrito (`menu_con_carrito.html`)**: Versión interactiva completa. Permite agregar platos, seleccionar interactivamente 2 acompañamientos por pescado, completar datos del cliente (nombre, dirección para despacho en Barrio República o retiro) y enviar un pedido formateado por WhatsApp a los números reales.

### Fase 4 — SEO, Rendimiento y Despliegue
Optimización del sitio para buscadores y redes sociales antes de subir a GitHub Pages:
* **Open Graph Meta Tags**: Configuración de etiquetas (`og:title`, `og:description`, `og:image`, `og:url`) en todos los archivos HTML. Al compartir la web por WhatsApp o Instagram, aparecerá una tarjeta visual con el logo y la descripción del local.
* **Favicon Oficial**: Enlace al icono de perfil en la barra del navegador (`link rel="shortcut icon"`).
* **Rutas Relativas**: Limpieza y verificación de referencias de recursos para que el sitio funcione perfectamente bajo la carpeta del proyecto en GitHub Pages (`/La-Pic-Big-Fish/`) sin romper enlaces CSS, JS o imágenes.
* **Nombres de Platos**: Corrección en Chupe Especial (se quitó el listado del nombre a petición del usuario para simplificar el diseño).

---

## 🚀 Instrucciones para Despliegue en GitHub Pages

Para publicar las actualizaciones y el nuevo menú interactivo en tu sitio actual:

1. **Asegurar cambios locales**:
   Abre la consola en la carpeta del proyecto y ejecuta:
   ```bash
   git add .
   git commit -m "Mejoras: menu.html sin carrito, menu_con_carrito.html respaldado, ajuste Chupe Especial y tags OG para despliegue"
   ```

2. **Subir al repositorio**:
   Sube los cambios a la rama principal (usualmente `main` o `master`):
   ```bash
   git push origin main
   ```

3. **Verificación**:
   GitHub Pages compilará el sitio en 1 o 2 minutos. Entra a [https://bastixori.github.io/La-Pic-Big-Fish/](https://bastixori.github.io/La-Pic-Big-Fish/) y valida:
   - Que el menú abra la nueva página `menu.html`.
   - Que el icono de la pestaña cargue el logo del restaurante.
   - Que el "Chupe Especial" aparezca correctamente simplificado.
