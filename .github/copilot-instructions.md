# Guía del workspace del portfolio

- Esta es una aplicación Angular independiente (standalone). Sigue los patrones existentes de componentes, señales reactivas (signals) y `OnPush`; mantén el contenido del portfolio en `src/app/content/portfolio.data.ts`.
- Mantén los cambios proporcionales a este portfolio estático. No añadas backend, APIs, bases de datos ni capas de gestión de estado sin un requisito concreto.
- Conserva el HTML semántico, la navegación por teclado, el comportamiento adaptable, la compatibilidad con movimiento reducido y los límites de tamaño del bundle de producción.
- Ejecuta `npm test` para las pruebas unitarias y `npm run build` para validar la compilación de producción. Añade pruebas específicas cuando cambie el comportamiento.
- No copies a este proyecto agentes personales de Copilot ni instrucciones de usuario; limita este archivo a directrices específicas del workspace.

## Flujo de Git

- Después de completar y validar cambios, o cuando el usuario indique en el chat que ha hecho `stage`, `Keep` o `Keep All`, comprueba `git status` y pregunta si desea crear un commit. No esperes a que el usuario tenga que pedir explícitamente el commit.
- Antes de preparar cambios, revisa qué archivos están staged y cuáles pertenecen a la tarea. No incluyas ni alteres cambios ajenos; si ya hay archivos staged ajenos, consúltalo antes de continuar.
- Si el usuario acepta, propone un mensaje Conventional Commits y pide confirmación del mensaje antes de ejecutar `git commit`.
- Tras confirmar y crear el commit, pregunta por separado si desea hacer `push`; no lo ejecutes sin esa confirmación.
- No afirmes que detectaste un clic de `Keep` o un `stage` manual en la interfaz si ese evento no aparece en el chat o en el estado de Git disponible.
