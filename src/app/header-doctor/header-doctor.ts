import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, NgModule, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { DoctorService } from '../doctor-service';
import { Subscription } from 'rxjs';
export interface Doctor { 
  doctorId: number;
  firstName: string; 
  lastName: string; 
  specialty: string; 
  email: string; 
} 

@Component({
  selector: 'app-header-doctor',
  imports: [CommonModule],
  templateUrl: './header-doctor.html',
  styleUrls: ['./header-doctor.css']
})
export class HeaderDoctor implements OnInit {
  doctor: Doctor | null = null;
  private subs: Subscription[] = [];
  isScrolled=false;
  doctorName = "";
  AccountDropdownState = false;
  constructor(private doctorService: DoctorService, private scheduleService: ScheduleService, private router: Router) {}
  
  ngOnInit(): void {
    this.doctorName=localStorage.getItem('doctorName')||'';
    
  } 
  currentDate = new Date(); 
  toasts: Array<{id: string, message: string, type: string}> = []; 
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
  get formattedDate(): string { 
    const options: Intl.DateTimeFormatOptions = {  
      weekday: 'short',  
      year: 'numeric',  
      month: 'short',  
      day: 'numeric'  
    }; 
    return this.currentDate.toLocaleDateString('en-US', options); 
  }
  openNotifications(): void {
    this.router.navigate(['doctorNotifications']);
  }
  docHome(): void {
    this.router.navigate(['/doctorLandingPage']);
  }
  openProfile(): void { 
    this.AccountDropdownState = !this.AccountDropdownState;
  } 
  manageSlots(): void { 
    this.router.navigate(['/doctor-availablity-management']); 
  } 
  listConsultation():void{
    this.router.navigate(['/doctor-consultations']);
  }
  loadDoctor(): void {
    const sub = this.scheduleService.getDoctorProfile().subscribe({
      next: (doc: Doctor | null) => {
        this.doctor = doc;
      },
      error: (err: any) => {
        console.error('Failed to load doctor profile', err);
      }
    });
    this.subs.push(sub);
  }
  logout()
  {
    this.router.navigate(['/login-doctor']);
  }
  goToUserProfile()
  {
    this.router.navigate(['/doctorProfiles']);
  }
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 100;
  }
}
