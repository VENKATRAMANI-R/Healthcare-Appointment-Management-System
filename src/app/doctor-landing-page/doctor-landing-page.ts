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
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'
} 
type ViewMode = 'list' | 'compact'; 
type SortDirection = 'asc' | 'desc'; 
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
  nextAppointment: Appointment | null = null;
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
  currentView: ViewMode = 'list'; 
  isLoading = false; 
   
  // Pagination 
  currentPage = 1; 
  itemsPerPage = 8; 
  totalPages = 1; 
   
  // Sorting 
  // sortColumn: keyof Appointment = 'time'; 
  sortDirection: SortDirection = 'asc'; 
 
  // Toast messages 
  toasts: Array<{id: string, message: string, type: string}> = []; 
 
  private dateUpdateInterval: any; 
 
  ngOnInit(): void { 
    this.doctorId=Number(localStorage.getItem('doctorId')); 
    this.filteredAppointments =  
 
[...this.appointments]; 
    this.calculateTotalPages(); 
    // this.updateNextAppointment(); 
    this.updateDateTime(); 
    // Update time every minute
    this.dateUpdateInterval = setInterval(() => this.updateDateTime(), 60000); 
    // this.loadDoctor()
    this.loadAppointments(); 
    
    this.doctorName=localStorage.getItem('doctorName')||'';
    
  } 

// loadDoctor(): void {
//   const sub = this.scheduleService.getDoctorProfile().subscribe({
//     next: (doc: Doctor | null) => {
//       this.doctor = doc;
//     },
//     error: (err: any) => {
//       console.error('Failed to load doctor profile', err);
//     }
//   });
//   this.subs.push(sub);
// }
// loadAppointments(): void {
// // const sub = this.appointmentService.getTodayAppointments().subscribe({
// // next: (appts: Appointment[]) => {
// // this.appointments = appts;
// // this.filteredAppointments = [...appts];
// // this.updateNextAppointment();
// // },
// // error: (err: any) => {
// // console.error('Failed to load appointments', err);
// // }
// // });
// // this.subs.push(sub);
// }
// // updateNextAppointment(): void {
// // const now = new Date();
// // this.nextAppointment = this.appointments.find(apt => {
// // // Assuming time format HH:mm
// // const [hours, minutes] = apt.time.split(':').map(Number);
// // const aptTime = new Date();
// // aptTime.setHours(hours, minutes, 0, 0);
// // return aptTime >= now && apt.status !== 'Completed';
// // }) || this.appointments[0] || null;
// // }



loadAppointments(): void {

  this.scheduleService.getTodayAppointments(this.doctorId).subscribe({
    next: (appts) => {
      this.appointments = appts;
      this.filteredAppointments = [...appts];
      // this.updateNextAppointment();
      this.calculateTotalPages();
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
 
  // Getters 
  // get doctorInitials(): string { 
  //   const firstInitial = this.doctor?.firstName.charAt(this.doctor.firstName.indexOf(' ') + 1) ||  
 
  //   this.doctor?.firstName.charAt(0); 
  //   const lastInitial = this.doctor?.lastName.charAt(0); 
  //   const flag = firstInitial!=null && lastInitial!=null
  //   return flag?firstInitial + lastInitial : ''; 
  // } 

  get doctorFullName(): string { 
    return `${this.doctor?.firstName} ${this.doctor?.lastName}`; 
  } 
 
  get statusIcon(): string { 
    return this.isAvailable ? 'check_circle' : 'cancel'; 
  } 
 
  get statusText(): string { 
    return this.isAvailable ? 'Available' : 'Unavailable'; 
  } 
 
  get currentPageAppointments(): Appointment[] { 
    const start = (this.currentPage - 1) * this.itemsPerPage; 
    const end = start + this.itemsPerPage; 
    return this.filteredAppointments.slice(start, end); 
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
  // Methods 
  private updateDateTime(): void { 
    this.currentDate = new Date(); 
  } 
 
  // private updateNextAppointment(): void { 
  //   const now = new Date(); 
  //   this.nextAppointment = this.appointments.find(apt => { 
  //     const [hours, minutes] = apt.time.split(':').map(Number); 
  //     const aptTime = new Date(); 
  //     aptTime.setHours(hours, minutes, 0, 0); 
  //     return aptTime >= now && apt.status !== 'Completed'; 
  //   }) || this.appointments[0] || null; 
  // } 
 
  private calculateTotalPages(): void { 
    this.totalPages =  
 
Math.ceil(this.filteredAppointments.length / this.itemsPerPage); 
  } 
 
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
        apt.patientName.toLowerCase().includes(this.searchQuery) || 
        apt.reason.toLowerCase().includes(this.searchQuery) || 
        apt.status.toLowerCase().includes(this.searchQuery) 
      ); 
    } 
     
    this.currentPage = 1; 
    this.calculateTotalPages(); 
  } 
 
  onViewChange(view: ViewMode): void { 
 
    this.currentView = view; 
  } 
 
  onSort(column: keyof Appointment): void { 
    // if (this.sortColumn === column) { 
    //   this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'; 
    // } else { 
    //   this.sortColumn = column; 
    //   this.sortDirection = 'asc'; 
    // } 
 
    this.filteredAppointments.sort((a, b) => { 
      let valueA: any = a[column]; 
      let valueB: any = b[column]; 
 
//       if (column === 'time') { 
//         valueA = new Date(`1970-01-01 ${valueA}`); 
//         valueB = new Date(`1970-01-01 $ 
 
// {valueB}`); 
//       } else if (typeof valueA === 'string') { 
//         valueA = valueA.toLowerCase(); 
//         valueB = valueB.toLowerCase(); 
//       } 
 
      const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0; 
      return this.sortDirection === 'asc' ? comparison : -comparison; 
    }); 
 } 

 
  // getSortIcon(column: keyof Appointment): string { 
  //   if (this.sortColumn !== column) { 
  //     return 'unfold_more'; 
  //   } 
  //   return this.sortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'; 
 
  // } 
 
  previousPage(): void { 
    if (this.currentPage > 1) { 
      this.currentPage--; 
    } 
  } 
 
  nextPage(): void { 
    if (this.currentPage < this.totalPages) { 
      this.currentPage++; 
    } 
  } 
 
  openChart(appointment: Appointment): void { 
    this.showToast(`Opening chart for ${appointment.patientName}`, 'info'); 
  } 

  date = new Date();
  appointment = { time: '2:00 PM' };

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
      doctorName: localStorage.getItem('doctorName') || '',
      doctor: this.doctor,
      date: this.currentDate
    }
  });
}

 
  // callPatient(): void { 
  //   if (this.nextAppointment) { 
  //     this.showToast(`Calling ${this.nextAppointment.patientName}...`, 'info'); 
  //   } 
  // } 
 
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
    this.router.navigate(['/login-doctor']);
  }
}
