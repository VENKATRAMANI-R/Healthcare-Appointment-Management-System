import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookAppointment } from '../book-appointment/book-appointment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {
  constructor(private dialog: MatDialog) {}
  openAppointmentModal(): void {
      this.dialog.open(BookAppointment, {
        width: '600px'
      });
    }
}
