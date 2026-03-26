import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './data/interceptors/auth.interceptor';

// Importando os Tokens e Services
import {
  PATIENT_REPOSITORY,
  EXERCISE_REPOSITORY,
  PRESCRIPTION_REPOSITORY,
  AUTH_SERVICE,
} from './core/tokens/injection-tokens';
import { AuthService } from './data/services/auth.service';

// Importando os Repositórios REAIS (Adeus, Mocks!)
import { PatientRepository } from './data/repositories/patient.repository';
import { ExerciseRepository } from './data/repositories/exercise.repository';
import { PrescriptionRepository } from './data/repositories/prescription.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),

    // Injeção de Dependências Reais apontando para a sua API
    { provide: PATIENT_REPOSITORY, useClass: PatientRepository },
    { provide: EXERCISE_REPOSITORY, useClass: ExerciseRepository },
    { provide: PRESCRIPTION_REPOSITORY, useClass: PrescriptionRepository },
    { provide: AUTH_SERVICE, useClass: AuthService },
  ],
};
