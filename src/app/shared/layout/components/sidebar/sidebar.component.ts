import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <!-- Logo -->
      <div class="sidebar-logo">
        <div class="logo-brand">
          <span class="logo-maya">maya</span>
          <div class="logo-sub">
            <span class="logo-yamamoto">yamamoto</span>
            <span class="logo-rpg">rpg</span>
          </div>
        </div>
      </div>

      <!-- Nav principal -->
      <nav class="sidebar-nav">
        <a
          *ngFor="let item of navItems"
          [routerLink]="item.route"
          routerLinkActive="active"
          class="nav-item"
          [title]="item.label"
        >
          <span class="nav-icon" [innerHTML]="item.icon"></span>
          <span class="nav-label">{{ item.label }}</span>
        </a>
      </nav>

      <!-- Rodapé -->
      <div class="sidebar-footer">
        <a routerLink="/settings" class="nav-item nav-item--footer" title="Configuração">
          <span class="nav-icon">⚙️</span>
          <span class="nav-label">Configuração</span>
        </a>
        <a routerLink="/auth/login" class="nav-item nav-item--footer" title="Log out">
          <span class="nav-icon">🚪</span>
          <span class="nav-label">Log out</span>
        </a>
      </div>
    </aside>
  `,
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Home', icon: '🏠', route: '/dashboard' },
    { label: 'Pacientes', icon: '👥', route: '/patients' },
    { label: 'Prontuários', icon: '📋', route: '/medical-records' },
    { label: 'Exercícios', icon: '⚙️', route: '/exercises' },
    { label: 'Prescrições', icon: '📁', route: '/prescriptions' },
    { label: 'Aniversários', icon: '🎂', route: '/birthdays' },
    { label: 'Usuários', icon: '👤', route: '/users' },
  ];
}
