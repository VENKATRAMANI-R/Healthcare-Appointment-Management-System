import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { BookAppointment } from './book-appointment/book-appointment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('HealthcareAppointmentManagementSystem');
   isDropdownOpen = false;
   isDropdownOpenProfile = false;

  toggleDropdown(state: boolean): void {
    this.isDropdownOpen = state;
  }
  toggleDropdownProfile(state: boolean): void {
    this.isDropdownOpenProfile = state;
  }
  constructor(private dialog: MatDialog) {}

  openAppointmentModal(): void {
    this.dialog.open(BookAppointment, {
      width: '600px'
    });
  }
  showPopup = false;

  // togglePopup() {
  //   this.showPopup = !this.showPopup;
  // }
}
