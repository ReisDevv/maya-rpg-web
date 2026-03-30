import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../../core/entities';
import { IAuthService } from '../../../../core/interfaces';
import { AUTH_SERVICE } from '../../../../core/tokens/injection-tokens';
import { TokenStorageService } from '../../../../data/services/token-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <!-- Pesquisa + atalhos -->
      <div class="header-center">
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input type="text" class="search-input" placeholder="Pesquise algo aqui" />
        </div>
        <div class="header-shortcuts">
          <a routerLink="/medical-records" class="shortcut-btn">Prontuários</a>
          <a routerLink="/appointments" class="shortcut-btn">Agenda</a>
        </div>
      </div>

      <!-- Ações direita -->
      <div class="header-right">
        <button class="icon-btn" title="Configurações">⚙️</button>
        <div class="user-btn" (click)="toggleMenu()">
          <div class="user-avatar">{{ userInitials }}</div>
          <div class="dropdown-menu" *ngIf="menuOpen">
            <span class="dropdown-name">{{ currentUser?.name }}</span>
            <button class="dropdown-item" (click)="logout()">Sair</button>
          </div>
        </div>
        <button class="icon-btn notif-btn" title="Notificações">
          🔔
          <span class="notif-badge"></span>
        </button>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  menuOpen = false;

  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    private readonly tokenStorage: TokenStorageService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.isAuthenticated()) {
      this.authService.getCurrentUser().subscribe({
        next: (user) => {
          this.currentUser = user;
          this.cdr.detectChanges();
        },
      });
    }
  }

  get userInitials(): string {
    if (!this.currentUser?.name) return 'P';
    return this.currentUser.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => {
        this.tokenStorage.clear();
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
