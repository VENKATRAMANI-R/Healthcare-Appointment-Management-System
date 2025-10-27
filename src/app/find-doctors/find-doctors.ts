import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService, Doctor } from '../doctor-service';

@Component({
  selector: 'app-find-doctors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './find-doctors.html',
  styleUrls: ['./find-doctors.css']
})
export class FindDoctors implements OnInit {
  searchQuery: string = '';
  activeFilters: Set<string> = new Set();

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  specializations: string[] = [];
  isLoading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.isLoading = true;
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.filteredDoctors = [...this.doctors];
        this.extractSpecializations();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
        this.isLoading = false;
      }
    });
  }

  extractSpecializations() {
    const allSpecializations = this.doctors.map(doctor => doctor.specialization);
    this.specializations = [...new Set(allSpecializations)].sort();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.applyFilters();
  }

  performSearch() {
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

  applyFilters() {
    const query = this.searchQuery.toLowerCase();

    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesQuery =
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query) ||
        doctor.qualification.toLowerCase().includes(query);

      const matchesFilters =
        this.activeFilters.size === 0 ||
        this.activeFilters.has(doctor.specialization);

      return matchesQuery && matchesFilters;
    });
  }

  clearFilters() {
    this.activeFilters.clear();
    this.searchQuery = '';
    this.filteredDoctors = [...this.doctors];
  }
}