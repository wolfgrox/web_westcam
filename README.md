# WestCam Landing Page

Landing page estática para WestCam, lista para deploy sin build step (GitHub Pages, Netlify o Vercel).

## Abrir localmente

1. Cloná el repo.
2. Abrí `index.html` en tu navegador.

> Tip: podés usar una extensión de "Live Server" si querés recarga automática, pero no es necesario.

## Dónde cambiar WhatsApp / teléfono / textos

- Datos globales y copy:
  - `index.html` incluye un bloque comentado **CONFIG RÁPIDA** cerca del `<head>`.
  - Los CTAs y textos principales están en las secciones del `index.html`.
- Variables JS (usadas para WhatsApp y mensajes):
  - `assets/js/main.js` tiene constantes al inicio: `BRAND_NAME`, `WHATSAPP_NUMBER`, `COVERAGE`, `DEFAULT_WA_MESSAGE`.

## Deploy

### GitHub Pages
1. Subí el repo a GitHub.
2. En **Settings → Pages**, elegí la rama y `/ (root)`.
3. Guardá y esperá el link publicado.

### Netlify
1. Arrastrá la carpeta del proyecto a Netlify o conectá el repo.
2. Build command: **vacío**.
3. Publish directory: `/`.

### Vercel
1. Importá el repo.
2. Framework preset: **Other**.
3. Output directory: `/`.

## Checklist SEO básico

- [x] Title y meta description.
- [x] Open Graph tags.
- [x] `sitemap.xml`.
- [x] `robots.txt`.
- [x] Favicon placeholder.

## Estructura del proyecto

```
/
  index.html
  assets/
    css/
      styles.css
    js/
      main.js
    img/
      favicon.svg
      og-placeholder.svg
      placeholder.svg
  sitemap.xml
  robots.txt
  README.md
```
