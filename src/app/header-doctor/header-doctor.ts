import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-doctor',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header-doctor.html',
  styleUrls: ['./header-doctor.css']
})
export class HeaderDoctor {
  isScrolled=false;
  AccountDropdownState = false;
  constructor(private router: Router) {}
  
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
  
  logout()
  {
    this.router.navigate(['/login-doctor']);
  }
  goToUserProfile()
  {
    this.router.navigate(['/doctorProfiles']);
  }
}
