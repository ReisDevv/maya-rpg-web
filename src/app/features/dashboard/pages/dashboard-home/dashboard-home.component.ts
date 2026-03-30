import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import type {
  IPatientRepository,
  IExerciseRepository,
  PaginatedRequest,
} from '../../../../core/interfaces';
import { PatientStatus } from '../../../../core/enums/patient-status.enum';
import { PATIENT_REPOSITORY, EXERCISE_REPOSITORY } from '../../../../core/tokens/injection-tokens';
import { ApiService } from '../../../../data/services/api.service';

interface BirthdayWeek {
  name: string;
  age: number;
  day: number;
  isToday: boolean;
}

interface Appointment {
  id: string;
  dateTime: string;
  type: string;
  status: string;
  patient: { fullName: string };
}

interface SatisfactionSummary {
  mostCommon: string;
  total: number;
  percentage: number;
}

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit {
  isLoading = true;

  totalActivePatients = 0;
  totalPatients = 0;
  totalExercises = 0;
  birthdaysToday: BirthdayWeek[] = [];
  birthdaysWeek: BirthdayWeek[] = [];
  appointmentsToday: Appointment[] = [];
  nextAppointment: Appointment | null = null;
  satisfaction: SatisfactionSummary | null = null;

  today = new Date();
  selectedDay = new Date().getDate();

  readonly typeLabels: Record<string, string> = {
    RPG: 'RPG',
    FISIO_ORTOPEDICA: 'Fisio Ortopédica',
    AVALIACAO: 'Avaliação',
    RETORNO: 'Retorno',
    OUTROS: 'Outros',
  };

  readonly satisfactionLabels: Record<string, string> = {
    MUITO_MAL: 'Muito Mal',
    MAL: 'Mal',
    NEUTRO: 'Neutro',
    BEM: 'Bem',
    SUPER_BEM: 'Super Bem',
  };

  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly patientRepo: IPatientRepository,
    @Inject(EXERCISE_REPOSITORY) private readonly exerciseRepo: IExerciseRepository,
    private readonly api: ApiService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    const minParams: PaginatedRequest = { page: 1, pageSize: 1 };
    const allPatientsParams: PaginatedRequest = { page: 1, pageSize: 500 };

    forkJoin({
      activePatients: this.patientRepo.getAll(minParams, PatientStatus.ACTIVE),
      allPatients: this.patientRepo.getAll(allPatientsParams),
      exercises: this.exerciseRepo.getAll(minParams),
      todayAppointments: this.api.get<Appointment[]>('appointments/today'),
      nextAppointment: this.api.get<Appointment | null>('appointments/next'),
      satisfaction: this.api.get<SatisfactionSummary>('appointments/satisfaction'),
    }).subscribe({
      next: ({
        activePatients,
        allPatients,
        exercises,
        todayAppointments,
        nextAppointment,
        satisfaction,
      }) => {
        this.totalActivePatients = activePatients.total;
        this.totalPatients = allPatients.total;
        this.totalExercises = exercises.total;
        this.appointmentsToday = todayAppointments || [];
        this.nextAppointment = nextAppointment;
        this.satisfaction = satisfaction;
        this.processBirthdays(allPatients.data);
        this.isLoading = false;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
    });
  }

  private processBirthdays(patients: any[]): void {
    const now = new Date();
    const todayDay = now.getDate();
    const todayMonth = now.getMonth();

    const mapped = patients.map((p) => {
      const birth = new Date(p.birthDate);
      const day = birth.getUTCDate();
      const month = birth.getUTCMonth();
      const age = now.getFullYear() - birth.getUTCFullYear();
      const isToday = day === todayDay && month === todayMonth;
      const thisYear = new Date(now.getFullYear(), month, day);
      const diffDays = Math.ceil((thisYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      const isThisWeek = diffDays >= 0 && diffDays <= 7;
      return { name: p.fullName, age, day, isToday, isThisWeek };
    });

    this.birthdaysToday = mapped.filter((b) => b.isToday);
    this.birthdaysWeek = mapped.filter((b) => b.isThisWeek).sort((a, b) => a.day - b.day);
  }

  formatTime(dateTime: string): string {
    return new Date(dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  getMes(): string {
    const meses = [
      'JANEIRO',
      'FEVEREIRO',
      'MARÇO',
      'ABRIL',
      'MAIO',
      'JUNHO',
      'JULHO',
      'AGOSTO',
      'SETEMBRO',
      'OUTUBRO',
      'NOVEMBRO',
      'DEZEMBRO',
    ];
    return meses[this.today.getMonth()];
  }

  getTypeLabel(type: string): string {
    return this.typeLabels[type] || type;
  }

  getSatisfactionLabel(rating: string): string {
    return this.satisfactionLabels[rating] || rating;
  }

  getWeekDays(): { label: string; day: number; isToday: boolean }[] {
    const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const today = new Date();
    const result = [];
    for (let i = -2; i <= 2; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      result.push({ label: days[d.getDay()], day: d.getDate(), isToday: i === 0 });
    }
    return result;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
}
