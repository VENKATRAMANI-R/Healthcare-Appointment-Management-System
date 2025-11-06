import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../doctor-service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



import { ScheduleService } from '../Consultation Module/schedule.service'; 



export interface Doctor { 
  doctorId: number;
  firstName: string; 
  lastName: string; 
  specialty: string; 
  email: string; 
} 
export interface Appointment { 
  id: number; 
  startTime: string;
  endTime : string; 
  patId: number;
  patientName: string; 
  age: number; 
  gender: 'Male' | 'Female' | 'Other'; 
  reason: string; 
  status: 'Confirmed' | 'Pending' | 'Completed' | 'cancel by doctor' | 'cancel by patient';
} 
// type ViewMode = 'list' | 'compact'; 
// type SortDirection = 'asc' | 'desc'; 
@Component({
  selector: 'app-doctor-landing-page',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './doctor-landing-page.html',
  styleUrl: './doctor-landing-page.css'
})
export class DoctorLandingPage implements OnInit, OnDestroy{
  doctor: Doctor | null = null;
  doctorName = "";
  doctorId = 0;

  

  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  showAlert = false;
  private subs: Subscription[] = [];
  
  // constructor(private doctorService: DoctorService,private router: Router
  //   // private appointmentService: AppointmentService
  // ) 
  
  
constructor(private doctorService: DoctorService,
            private scheduleService: ScheduleService,
            private router: Router) 

  {}

  

  // UI State 
  isAvailable = true; 
  currentDate = new Date(); 
  AccountDropdownState = false;
  searchQuery = ''; 
  // currentView: ViewMode = 'list'; 
  isLoading = false; 
   
   
  // Sorting 
  // sortColumn: keyof Appointment = 'time'; 
  // sortDirection: SortDirection = 'asc'; 
 
  // Toast messages 
  toasts: Array<{id: string, message: string, type: string}> = []; 
 
  private dateUpdateInterval: any; 
 
  ngOnInit(): void { 
    this.doctorId=Number(localStorage.getItem('doctorId')); 
    this.loadAppointments();
    this.filteredAppointments = [...this.appointments]; 
    this.updateDateTime(); 
    // Update time every minute
    this.dateUpdateInterval = setInterval(() => this.updateDateTime(), 60000); 
    // this.loadDoctor()
     this.loadAppointments();
    this.doctorName=localStorage.getItem('doctorName')||'';
  } 



loadAppointments(): void {

  this.scheduleService.getTodayAppointments(this.doctorId).subscribe({
    next: (appts) => {
      this.appointments = appts;
      this.filteredAppointments = [...appts];
    },
    error: (err) => console.error('Failed to load appointments', err)
  });
}



ngOnDestroy(): void { 
    if (this.dateUpdateInterval) { 
      clearInterval(this.dateUpdateInterval); 
    } 
    // this.subs.forEach(sub => sub.unsubscribe());
} 

  get doctorFullName(): string { 
    return `${this.doctor?.firstName} ${this.doctor?.lastName}`; 
  } 
 
  get statusIcon(): string { 
    return this.isAvailable ? 'check_circle' : 'cancel'; 
  } 
 
  get statusText(): string { 
    return this.isAvailable ? 'Available' : 'Unavailable'; 
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
get currentPageAppointments(): Appointment[] {
  return this.filteredAppointments;
}
  // Methods 
  private updateDateTime(): void { 
    this.currentDate = new Date(); 
  } 

//   private calculateTotalPages(): void { 
//     this.totalPages =  
 
// Math.ceil(this.filteredAppointments.length / this.itemsPerPage); 
//   } 
 
  setAvailability(available: boolean): void { 
    this.isAvailable = available; 
    this.showToast( 
      `status updated to ${available ? 'Available' : 'Unavailable'}`, 
      'success' 
    ); 
  } 
 
  onSearch(event: Event): void { 
    const target = event.target as HTMLInputElement; 
    this.searchQuery = target.value.toLowerCase().trim(); 
     
    if (this.searchQuery === '') { 
      this.filteredAppointments =  
 
[...this.appointments]; 
    } else { 
      this.filteredAppointments = this.appointments.filter(apt => 
        apt.patientName.toLowerCase().includes(this.searchQuery) 
        // || apt.reason.toLowerCase().includes(this.searchQuery) || 
        // apt.status.toLowerCase().includes(this.searchQuery) 
      ); 
    } 
  } 

  date = new Date();
  // appointment = { time: '2:00 PM' };

  showCustomAlert(): void {
    this.showAlert = true;
  }

  closeAlert(): void {
    this.showAlert = false;
  }

openConsultationForm(appointment: Appointment): void {
  this.router.navigate(['/consultation-form', appointment.id], {
    state: {
      appointment,
      doctor: this.doctor,
      date: this.currentDate
    }
  });
}

 
  openProfile(): void { 
    this.AccountDropdownState = !this.AccountDropdownState;
  } 
  openNotifications(): void {
    this.router.navigate(['doctorNotifications']);
  }
  manageSlots(): void { 
    this.router.navigate(['/doctor-availablity-management']);
    this.showToast('Opening availability management...', 'info'); 
 
  } 
  listConsultation():void{
    this.router.navigate(['/doctor-consultations']);
    this.showToast('Opening My Consultations...', 'info'); 
  }
  goToCalendar(): void { 
    this.showToast('Opening calendar view...', 'info'); 
  } 
 
  getStatusBadgeClass(status: string): string { 
    return `status-badge status-${status.toLowerCase()}`; 
  } 
 
  getPatientInitial(patientName: string): string { 
    return patientName.charAt(0).toUpperCase(); 
  } 
 
  showToast(message: string, type: string = 'info'): void { 
 
    const id = Math.random().toString(36).substring(2, 15); 
    const toast = { id, message, type }; 
    this.toasts.push(toast); 
     
    setTimeout(() => { 
      this.toasts = this.toasts.filter(t => t.id !== id); 
    }, 3000); 
  } 
 
  removeToast(id: string): void { 
    this.toasts = this.toasts.filter(t => t.id !== id); 
  } 
 
  trackByAppointmentId(index: number, appointment: Appointment): number { 
    return appointment.id; 
  } 

  goToUserProfile()
  {
    this.router.navigate(['/doctorProfiles']);
  }
  logout()
  {
    localStorage.clear();
    this.router.navigate(['/login-doctor']);
  }
}
