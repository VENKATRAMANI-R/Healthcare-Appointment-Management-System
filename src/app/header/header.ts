import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isScrolled=false;
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
  navigateHome(){
    this.router.navigate(['landingpage']);
  }

  navigateDepartments(){
    this.router.navigate(['departments']);
  }
  navigateDoctors(){
    this.router.navigate(['FindDoctors']);
  }
  navigateAppointments(){
    this.router.navigate(['my-appointments']); 
  }
  navigateContact(){
    this.router.navigate(['contact-us']);
  }
  navigateBooking(){
    this.router.navigate(['bookAppointment']);
  }
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 100;
  }
}
