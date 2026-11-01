# Guía del workspace del portfolio

- Esta es una aplicación Angular independiente (standalone). Sigue los patrones existentes de componentes, señales reactivas (signals) y `OnPush`; mantén el contenido del portfolio en `src/app/content/portfolio.data.ts`.
- Mantén los cambios proporcionales a este portfolio estático. No añadas backend, APIs, bases de datos ni capas de gestión de estado sin un requisito concreto.
- Conserva el HTML semántico, la navegación por teclado, el comportamiento adaptable, la compatibilidad con movimiento reducido y los límites de tamaño del bundle de producción.
- Ejecuta `npm test` para las pruebas unitarias y `npm run build` para validar la compilación de producción. Añade pruebas específicas cuando cambie el comportamiento.
- No copies a este proyecto agentes personales de Copilot ni instrucciones de usuario; limita este archivo a directrices específicas del workspace.
