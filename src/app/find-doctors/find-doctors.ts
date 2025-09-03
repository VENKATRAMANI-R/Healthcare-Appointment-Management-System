import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookAppointment } from '../book-appointment/book-appointment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-find-doctors',
  standalone: true,
  imports: [CommonModule,BookAppointment],
  templateUrl: './find-doctors.html', 
  styleUrls: ['./find-doctors.css']
})
export class FindDoctors {
  searchQuery: string = '';
  activeFilters: Set<string> = new Set();
  img1 = 'images/Doctor_Default.jpg';

  constructor(public dialog: MatDialog) {}

  doctors = [
    {
      name: 'Dr. Sarah Johnson',
      position: 'Senior Cardiologist',
      qualification: 'MD, Cardiology, Harvard Medical School',
      image: this.img1,
      hours: ['Mon, Wed, Fri: 9:00 AM - 4:00 PM', 'Tue, Thu: 11:00 AM - 6:00 PM'],
      specialties: ['cardiology'],
      availability: ['morning', 'afternoon']
    },
    {
      name: 'Dr. Michael Chen',
      position: 'Neurology Specialist',
      qualification: 'MD, Neurology, Johns Hopkins University',
      //image: 'assets/doctor2.jpg',
      hours: ['Mon, Tue, Thu: 8:00 AM - 3:00 PM', 'Wed, Fri: 10:00 AM - 5:00 PM'],
      specialties: ['neurology'],
      availability: ['morning', 'afternoon']
    },
    {
      name: 'Dr. Emily Rodriguez',
      position: 'Pediatrician',
      qualification: 'MD, Pediatrics, Stanford University',
      //image: 'assets/doctor3.jpg',
      hours: ['Mon - Fri: 8:30 AM - 5:30 PM', 'Sat: 9:00 AM - 1:00 PM'],
      specialties: ['pediatrics'],
      availability: ['morning', 'afternoon', 'weekend']
    },
    {
      name: 'Dr. James Wilson',
      position: 'Orthopedic Surgeon',
      qualification: 'MD, Orthopedics, Mayo Clinic',
      //image: 'assets/doctor4.jpg',
      hours: ['Tue, Thu: 7:00 AM - 2:00 PM', 'Mon, Wed, Fri: 1:00 PM - 8:00 PM'],
      specialties: ['orthopedics'],
      availability: ['morning', 'afternoon', 'evening']
    },
    {
      name: 'Dr. Lisa Patel',
      position: 'Dermatologist',
      qualification: 'MD, Dermatology, UCSF',
      //image: 'assets/doctor5.jpg',
      hours: ['Mon, Wed, Fri: 9:00 AM - 4:00 PM', 'Sat: 10:00 AM - 2:00 PM'],
      specialties: ['dermatology'],
      availability: ['morning', 'weekend']
    },
    {
      name: 'Dr. Robert Kim',
      position: 'General Surgeon',
      qualification: 'MD, Surgery, Cleveland Clinic',
      //image: 'assets/doctor6.jpg',
      hours: ['Mon, Tue, Thu, Fri: 8:00 AM - 5:00 PM', 'Wed: 7:00 AM - 12:00 PM'],
      specialties: ['surgery'],
      availability: ['morning', 'afternoon']
    }
  ];

  filteredDoctors = [...this.doctors];

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.applyFilters();
  }

  performSearch() {
    this.applyFilters();
  }

  toggleFilter(filter: string) {
    if (this.activeFilters.has(filter)) {
      this.activeFilters.delete(filter);
    } else {
      this.activeFilters.add(filter);
    }
    this.applyFilters();
  }

  openAppointmentModal(): void {
    this.dialog.open(BookAppointment, {
      width: '600px'
    });
  }

  applyFilters() {
    const query = this.searchQuery.toLowerCase();
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesQuery =
        doctor.name.toLowerCase().includes(query) ||
        doctor.position.toLowerCase().includes(query) ||
        doctor.qualification.toLowerCase().includes(query);

      const matchesFilters = Array.from(this.activeFilters).every(filter =>
        doctor.specialties.includes(filter) || doctor.availability.includes(filter)
      );

      return matchesQuery && matchesFilters;
    });
  }
}
