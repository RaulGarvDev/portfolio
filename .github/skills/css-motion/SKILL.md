---
name: css-motion
description: "Diseñar o revisar CSS: estilos por componente, diseño adaptable, estados visuales, transiciones y animación natural con movimiento reducido."
---

# CSS, diseño adaptable y movimiento

Usa esta skill al crear o ajustar estilos, animaciones, transiciones o respuesta visual a puntero y entrada del usuario.

## Procedimiento

1. Identifica si las reglas pertenecen al componente, a una capa global o a tokens compartidos; sigue la organización actual.
2. Conserva el diseño adaptable y comprueba los breakpoints cercanos antes de añadir otros.
3. Para movimiento guiado por puntero, limita el rango, evita saltos y favorece aceleración amortiguada, inercia y reposo gradual sobre cambios instantáneos.
4. Usa `requestAnimationFrame` para actualizaciones físicas continuas; evita trabajo por frame cuando el elemento está en reposo y limpia callbacks al destruir el componente.
5. Respeta `prefers-reduced-motion` tanto en CSS como en cualquier simulación controlada por código.
6. Evita que una transición CSS compita con una animación calculada frame a frame.
7. Comprueba estados de foco, interacción, pantallas estrechas y pruebas o compilación del proyecto.

## Verificación

- El movimiento no depende de pulsaciones si la interacción solicitada es por hover o puntero.
- El elemento vuelve al estado de reposo de forma coherente al salir el puntero.
- Los estilos respetan el presupuesto de CSS configurado por el proyecto.
