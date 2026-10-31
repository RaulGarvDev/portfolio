# Portfolio — Raúl González de la Aleja

Portfolio Angular con componentes standalone, signals y `OnPush`.
El contenido se edita en `portfolio.ts`.

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
`portfolio.ts`: `bbva.svg`, `optimissa.svg`, `versys.svg` y `hgadvance.svg`.
Si falta un archivo, se muestran las iniciales de la empresa. El perfil usa la
ilustración original `public/assets/raul-guardian.svg`, personalizada con
rasgos inspirados en la foto de referencia.

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

Con Vercel CLI instalado y autenticado, ejecuta `vercel --prod` desde la raíz
del proyecto. Este método despliega el estado local actual. El proyecto está
publicado desde la CLI; para despliegues automáticos al hacer `push`, conéctalo
a un repositorio Git desde el panel de Vercel.

El plan Hobby es gratuito para proyectos personales y está sujeto a sus límites
y condiciones de uso. Consulta la [documentación del plan Hobby](https://vercel.com/docs/plans/hobby).
