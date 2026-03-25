import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page">
      <a routerLink="/patients" class="back-link">← Voltar para pacientes</a>
      <h1>Detalhes do Paciente</h1>
      <p class="placeholder">Prontuário, prescrições e histórico serão exibidos aqui.</p>
    </div>
  `,
  styles: [`
    .back-link { font-size: 0.875rem; margin-bottom: 1rem; display: inline-block; }
    .placeholder { color: #9A9689; font-size: 0.875rem; margin-top: 1rem; }
  `],
})
export class PatientDetailComponent {
  constructor(private readonly route: ActivatedRoute) {}
}
