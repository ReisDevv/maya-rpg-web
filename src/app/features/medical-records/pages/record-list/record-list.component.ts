import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-record-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>Prontuários</h1>
      </div>
      <p class="placeholder">Histórico clínico e avaliações funcionais dos pacientes serão exibidos aqui.</p>
    </div>
  `,
  styles: [`
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
    .placeholder { color: #9A9689; font-size: 0.875rem; }
  `],
})
export class RecordListComponent {}
