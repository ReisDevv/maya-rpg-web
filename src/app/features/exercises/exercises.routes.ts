import { Routes } from '@angular/router';

export const EXERCISES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/exercise-list/exercise-list.component').then(
        (m) => m.ExerciseListComponent
      ),
  },
];
