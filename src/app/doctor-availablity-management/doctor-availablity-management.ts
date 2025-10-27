import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Appointment, AvailabilitySlot, Doctor, DoctorService } from '../doctor-availablity-service';

// import { Appointment, AvailabilitySlot, DoctorService } from '../doctor-availablity-service';

@Component({
  selector: 'app-doctor-availablity-management',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './doctor-availablity-management.html',
  styleUrl: './doctor-availablity-management.css'
})
export class DoctorAvailablityManagement implements OnInit{ 

  doctorId: number = Number(localStorage.getItem("doctorId")); // hardcoded for now, later from login/session
  doctor?: Doctor;
  submitted = false;
  availabilitySlots: AvailabilitySlot[] = [];
  appointments: Appointment[] = [];
  @ViewChild('availabilityForm') availabilityForm: any;
  newAvailability: AvailabilitySlot = {
  date: '',
  startTime: '',
  endTime: ''
  };
  minDate: string = '';

  constructor(private doctorService: DoctorService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.newAvailability.date = this.minDate;

    this.loadDoctorInfo();
    this.loadAvailability();
    this.loadAppointments();
  }

  // Load Doctor Info
  loadDoctorInfo() {
    this.doctorService.getDoctor(this.doctorId).subscribe(data => {
      this.doctor = data;
    });
    console.log("But Nothin Worked")
  }

  // Load Availability
  loadAvailability() {
    this.doctorService.getAvailabilitySlots(this.doctorId).subscribe(data => {
      console.log(data);
      this.availabilitySlots = data;
      this.cdr.detectChanges();
    });
  }

addAvailability(): void {
  this.submitted = true;
  if (this.newAvailability.startTime >= this.newAvailability.endTime) {
    alert('End time must be after start time');
    return;
  }

  this.doctorService.addAvailability(this.doctorId, this.newAvailability).subscribe(() => {
    this.newAvailability = { date: this.minDate, startTime: '', endTime: '' };
    console.log('Availability added successfully');
    this.availabilityForm.resetForm({ date: this.minDate, startTime: '', endTime: '' });
    this.submitted = false;
    this.loadAvailability(); // ✅ Refresh the table
    this.cdr.detectChanges();
  });
}


removeAvailability(slot: AvailabilitySlot): void {
  if (!slot.id) {
    console.error('Slot ID is missing:', slot);
    alert('Cannot delete slot: ID is missing.');
    return;
  }

  if (confirm('Are you sure you want to remove this availability slot?')) {
    this.doctorService.removeAvailability(slot.id).subscribe(() => {
      this.availabilitySlots = this.availabilitySlots.filter(s => s.id !== slot.id);
      this.loadAvailability();
      this.cdr.detectChanges();
    });
  }
}

  // Load Appointments
  loadAppointments() {
    this.doctorService.getAppointments(this.doctorId).subscribe(data => {
      this.appointments = data;
    });
  }

  updateAppointmentStatus(id: number, status: 'confirmed' | 'rejected' | 'cancelled'): void {
    this.doctorService.updateAppointmentStatus(id, status).subscribe(updated => {
      const idx = this.appointments.findIndex(a => a.id === id);
      if (idx > -1) this.appointments[idx] = updated;
    });
  }

  // Utility Methods
  getPendingAppointmentsCount(): number {
    return this.appointments.filter(apt => apt.status === 'pending').length;
  }

  getConfirmedAppointmentsCount(): number {
    return this.appointments.filter(apt => apt.status === 'confirmed').length;
  }

  createRipple(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();
    button.appendChild(circle);
  }
}
 