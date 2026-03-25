import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prescription-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>Prescrições</h1>
        <button class="btn-primary">Nova Prescrição</button>
      </div>
      <p class="placeholder">Planos de exercícios prescritos por paciente serão listados aqui.</p>
    </div>
  `,
  styles: [`
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
    .btn-primary {
      display: inline-flex; align-items: center; padding: 0.5rem 1rem;
      border-radius: 8px; border: none; background-color: #2B7A8C; color: #fff;
      font-size: 0.875rem; font-weight: 500; cursor: pointer;
    }
    .btn-primary:hover { background-color: #1A4F5C; }
    .placeholder { color: #9A9689; font-size: 0.875rem; }
  `],
})
export class PrescriptionListComponent {}
