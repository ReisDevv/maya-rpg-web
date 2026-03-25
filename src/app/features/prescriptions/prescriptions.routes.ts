import { Routes } from '@angular/router';

export const PRESCRIPTIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/prescription-list/prescription-list.component').then(
        (m) => m.PrescriptionListComponent
      ),
  },
];
