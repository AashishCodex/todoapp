import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, withInterceptorsFromDi } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoService } from './services/todo.service';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
 providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), importProvidersFrom(HttpClientModule), TodoService, importProvidersFrom(DragDropModule)]
};
