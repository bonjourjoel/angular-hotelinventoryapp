import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestInterceptor } from './request.interceptor';
import { InitService } from './init.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RoomsModule } from './rooms/rooms.module';
import { NotFoundModule } from './not-found/not-found.module';
import { RouteConfigToken } from './services/routeConfig.service';
import { CommentModule } from './comment/comment.module';
import { GlobalErrorHandler } from './error-handler.service';

function initFactory(initService: InitService) {
  return () => initService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    // importProvidersFrom(RoomsModule), // for router (not required because of lazy loading in root router)
    importProvidersFrom(CommentModule), // for router (not required because of lazy loading in root router)
    provideRouter(routes),
    importProvidersFrom(NotFoundModule), // for router
    provideClientHydration(),
    provideHttpClient(withInterceptors([requestInterceptor])),
    { provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG },
    { provide: RouteConfigToken, useValue: { title: 'Home' } },
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      multi: true,
      deps: [InitService],
    },
    provideAnimations(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
