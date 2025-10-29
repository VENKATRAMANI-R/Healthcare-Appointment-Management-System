import { Component, OnInit ,OnDestroy, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BookAppointment } from '../Appointment-Booking/book-appointment/book-appointment';
// import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from '../doctor-service';
import { Doctor } from './doctor-model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-find-doctors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './find-doctors.html',
  styleUrls: ['./find-doctors.css']
})
export class FindDoctors implements OnInit,OnDestroy {
  searchQuery: string = '';
  activeFilters: Set<string> = new Set();
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  hasSearched: boolean = false;

  // Available specializations for filtering
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
    this.cdr.detectChanges();
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
        this.doctors = doctors;
        this.filteredDoctors = [...this.doctors];
        console.log('Fetched doctors:', doctors);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Unable to load doctors. Please try again later.';
        this.isLoading = false;
        this.doctors = [];
        this.filteredDoctors = [];
      }
    });
    this.cdr.detectChanges();
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

    this.filteredDoctors = this.doctors.filter(doctor => {
      // Text search filter
      const matchesQuery = query === '' || 
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query) ||
        doctor.qualification.toLowerCase().includes(query);

      // Specialization filter
      const matchesFilters = this.activeFilters.size === 0 || 
        this.activeFilters.has(doctor.specialization);

      return matchesQuery && matchesFilters;
    });
  }

  getYearsOfExperience(experience: number): string {
    return experience === 1 ? '1 year' : `${experience} years`;
  }
}