import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../doctor-service';
import { Doctor } from './doctor-model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-find-doctors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './find-doctors.html',
  styleUrls: ['./find-doctors.css']
})
export class FindDoctors implements OnInit, OnDestroy {
  searchQuery = '';
  activeFilters = new Set<string>();
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  isLoading = false;
  errorMessage = '';
  hasSearched = false;
  specializations: string[] = [
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'Surgery',
    'General Medicine'
  ];

  private doctorsSubscription: Subscription = new Subscription();

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDoctors();
  }

  ngOnDestroy() {
    this.doctorsSubscription.unsubscribe();
  }

  loadDoctors(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.hasSearched = false;

    this.doctorsSubscription = this.doctorService.getDoctors().subscribe({
      next: (doctors) => {
        // Force all to show default image
        this.doctors = doctors.map(d => ({
          ...d,
          image: this.doctorService.getDefaultImage()
        }));
        this.filteredDoctors = [...this.doctors];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Unable to load doctors. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  selectDoctor(doctor: Doctor) {
    this.router.navigate(['/bookAppointment'], {
      state: {
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialization: doctor.specialization
      }
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.applyFilters();
  }

  performSearch() {
    this.hasSearched = true;
    this.applyFilters();
  }

  toggleFilter(specialization: string) {
    if (this.activeFilters.has(specialization)) {
      this.activeFilters.delete(specialization);
    } else {
      this.activeFilters.add(specialization);
    }
    this.applyFilters();
  }

  clearFilters() {
    this.activeFilters.clear();
    this.searchQuery = '';
    this.filteredDoctors = [...this.doctors];
    this.hasSearched = false;
  }

  applyFilters() {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredDoctors = this.doctors.filter((doctor) => {
      const matchesQuery =
        query === '' ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query) ||
        doctor.qualification.toLowerCase().includes(query);

      const matchesFilters =
        this.activeFilters.size === 0 ||
        this.activeFilters.has(doctor.specialization);

      return matchesQuery && matchesFilters;
    });
  }

  getYearsOfExperience(exp: number): string {
    return exp === 1 ? '1 year' : `${exp} years`;
  }
}
