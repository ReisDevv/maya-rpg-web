import { Routes } from '@angular/router';

export const MEDICAL_RECORDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/record-list/record-list.component').then(
        (m) => m.RecordListComponent
      ),
  },
];
