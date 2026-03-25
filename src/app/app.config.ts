import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './data/interceptors/auth.interceptor';
import { PATIENT_REPOSITORY, AUTH_SERVICE } from './core/tokens/injection-tokens';
import { PatientRepository } from './data/repositories/patient.repository';
import { AuthService } from './data/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),

    // TODO: trocar por PatientRepository quando backend estiver pronto
    { provide: PATIENT_REPOSITORY, useClass: PatientRepository },
    { provide: AUTH_SERVICE, useClass: AuthService },
  ],
};
