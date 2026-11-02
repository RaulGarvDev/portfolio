# Portfolio — Raúl González de la Aleja

Portfolio Angular con componentes standalone, signals y `OnPush`.
Los datos del portfolio se editan en `src/app/content/portfolio.data.ts`.

## Estructura del proyecto

- `src/app/app.component.ts`: composición de la página.
- `src/app/features/`: secciones de trayectoria y proyectos, la interacción de Java y el retrato interactivo.
- `src/app/shared/`: componentes reutilizables, como el logotipo de empresa.
- `src/app/core/`: servicios globales, como la gestión del tema.
- `src/app/content/`: tipos y datos del portfolio.
- Las plantillas Angular se mantienen en archivos `.component.html` junto a sus componentes.
- `public/assets/`: imágenes e iconos estáticos.

Código fuente: https://github.com/RaulGarvDev/portfolio

Demo publicada: https://portfolio-eight-neon-rvd1r3ycpk.vercel.app/

## SEO

El sitio publica `robots.txt` y `sitemap.xml` desde `public/`. Si cambia el
dominio público, actualiza sus URL en esos dos archivos y en los metadatos de
`src/index.html`. Después de desplegar, verifica ambas rutas y añade el dominio
a Google Search Console para enviar el sitemap y revisar indexación y consultas.

## Requisitos

- Node.js `^22.22.3`, `^24.15.0` o `>=26.0.0`.
- npm.

## Instalación y desarrollo

Desde esta carpeta, ejecuta:

```bash
npm install
npm start
```

Abre la URL que indique Angular CLI (normalmente `http://localhost:4200`).
Para generar la versión de producción, ejecuta `npm run build`; el resultado queda
en `dist/portfolio`.

## Tests y CI

Ejecuta `npm test` para las pruebas unitarias en modo no interactivo o
`npm run test:watch` durante el desarrollo. El workflow de GitHub Actions ejecuta
tests y build en cada `push` y pull request; solo valida, no despliega.

## Recursos opcionales

Coloca los logotipos SVG en `public/assets/logos/` con los nombres indicados en
`src/app/content/portfolio.data.ts`: `bbva.svg`, `optimissa.svg`, `versys.svg` y `hgadvance.svg`.
Si falta un archivo, se muestran las iniciales de la empresa. La ilustración
interactiva del perfil está en
`src/app/features/guardian-portrait/guardian-portrait.component.html`.

## Publicar en Vercel

La configuración de Vercel está en `vercel.json`: compila con `npm run build`
y publica `dist/portfolio/browser`.

### Con GitHub (despliegues automáticos)

1. Sube este proyecto a un repositorio de GitHub.
2. En Vercel, selecciona **Add New → Project** e importa el repositorio.
3. Comprueba que el framework sea **Angular** y que la carpeta de salida sea
   `dist/portfolio/browser`. Vercel usará la configuración del proyecto.
4. Pulsa **Deploy**. Si la integración Git está habilitada, Vercel publicará
   previews y producción según la rama configurada en el proyecto. Confirma la
   rama de producción y sus protecciones en la configuración de Vercel.

### Desde el terminal

El repositorio privado es
[`RaulGarvDev/portfolio`](https://github.com/RaulGarvDev/portfolio). Si su
integración con Vercel está activa, los despliegues seguirán las ramas y reglas
configuradas en el panel; no se asume aquí cuál rama publica producción. El
comando `vercel --prod` inicia un despliegue de producción: úsalo solo tras
revisar el cambio y su preview, nunca como validación de CI.

El plan Hobby es gratuito para proyectos personales y está sujeto a sus límites
y condiciones de uso. Consulta la [documentación del plan Hobby](https://vercel.com/docs/plans/hobby).

### Verificación y soporte

Antes de promover un cambio, revisa el preview y comprueba navegación, cambio de
tema, secciones, imágenes, consola y vista móvil. Después del despliegue, repite
esas comprobaciones en la URL de producción y consulta los logs de despliegue del
proveedor si falla. El workflow CI no publica ni altera producción.

La aplicación no configura telemetría propia ni servicios backend. Para revertir
un despliegue, usa los mecanismos de rollback de Vercel y confirma el resultado
en producción; no ejecutes cambios de producción desde una validación automática.
