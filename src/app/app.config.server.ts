import { ApplicationConfig } from '@angular/core';
import { provideServerRendering, RenderMode, ServerRoute, withRoutes } from '@angular/ssr';

const serverRoutes: ServerRoute[] = [{ path: '', renderMode: RenderMode.Prerender }];

export const config: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};
