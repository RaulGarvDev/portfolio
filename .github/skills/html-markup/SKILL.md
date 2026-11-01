---
name: html-markup
description: "Implementar o revisar HTML y plantillas: semántica, accesibilidad, formularios, navegación y estructura de componentes."
---

# HTML y plantillas accesibles

Usa esta skill al crear o modificar HTML, plantillas Angular u otra estructura de interfaz.

## Procedimiento

1. Revisa la plantilla, el componente y los patrones cercanos antes de cambiar la estructura.
2. Usa elementos semánticos adecuados y conserva los nombres, enlaces, contenido y contratos existentes.
3. Comprueba nombres accesibles, etiquetas, roles y estados para controles interactivos; prefiere elementos nativos antes que recrear su comportamiento.
4. Mantén la navegación y las acciones disponibles con teclado. No uses un `div` como control interactivo sin necesidad y sin implementar accesibilidad completa.
5. En Angular, conserva el flujo existente de datos y evita lógica de negocio en la plantilla.
6. Valida el resultado con las pruebas y la compilación dirigidas del proyecto.

## Verificación

- No hay atributos `style` ni bloques `<style>` cuando el proyecto organiza el CSS en archivos externos.
- Los controles conservan etiquetas y propósito comprensibles sin depender exclusivamente de instrucciones visuales.
- Los cambios de plantilla no rompen estados condicionales, enlaces ni interacciones existentes.
