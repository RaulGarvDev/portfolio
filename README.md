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
4. Pulsa **Deploy**. Los siguientes `push` a la rama principal publicarán cambios
   automáticamente.

### Desde el terminal

El proyecto está conectado al repositorio privado
[`RaulGarvDev/portfolio`](https://github.com/RaulGarvDev/portfolio). Cada `push`
a `main` inicia un despliegue de producción y las demás ramas generan previews.
También puedes desplegar manualmente con `vercel --prod`.

El plan Hobby es gratuito para proyectos personales y está sujeto a sus límites
y condiciones de uso. Consulta la [documentación del plan Hobby](https://vercel.com/docs/plans/hobby).
