import { Component } from '@angular/core';
import { BookAppointment } from '../book-appointment/book-appointment';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {
  constructor(private router: Router) {}
  onClick(){
    this.router.navigate(['/bookAppoinment']);
  }
}
