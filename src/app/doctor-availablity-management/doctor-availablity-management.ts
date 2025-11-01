import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Appointment, AvailabilitySlot, Doctor, DoctorAvailablityService } from '../doctor-availablity-service';

@Component({
  selector: 'app-doctor-availablity-management',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './doctor-availablity-management.html',
  styleUrl: './doctor-availablity-management.css'
})
export class DoctorAvailablityManagement implements OnInit {

  doctorId: number = 0;
  doctor?: Doctor;
  submitted = false;
  availabilitySlots: AvailabilitySlot[] = [];
  appointments: Appointment[] = [];
  @ViewChild('availabilityForm') availabilityForm: any;
  newAvailability: AvailabilitySlot = {
    date: '',
    startTime: '',
    endTime: '',
    doctorId: this.doctorId
  };
  minDate: string = '';

  constructor(private doctorService: DoctorAvailablityService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // ✅ Fix: Guard localStorage access to avoid SSR crash
    if (typeof window !== 'undefined' && localStorage) {
      this.doctorId = Number(localStorage.getItem('doctorId')) || 0;
    }

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.newAvailability.date = this.minDate;

    this.loadDoctorInfo();
    this.loadAvailability();
    this.loadAppointments();
  }

  loadDoctorInfo() {
    this.doctorService.getDoctor(this.doctorId).subscribe(data => {
      this.doctor = data;
      this.cdr.markForCheck();
    });
    console.log("But Nothin Worked");
  }

  loadAvailability() {
    this.doctorService.getAvailabilitySlots(this.doctorId).subscribe(data => {
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

    this.doctorService.addAvailability(this.newAvailability).subscribe(() => {
      this.newAvailability = { date: this.minDate, startTime: '', endTime: '', doctorId: this.doctorId };
      console.log('Availability added successfully');
      this.availabilityForm.resetForm({ date: this.minDate, startTime: '', endTime: '' });
      this.submitted = false;
      this.loadAvailability();
      this.cdr.detectChanges();
    });
  }

  removeAvailability(slot: AvailabilitySlot): void {
    if (!slot.slotid) {
      console.error('Slot ID is missing:', slot);
      alert('Cannot delete slot: ID is missing.');
      return;
    }

    if (confirm('Are you sure you want to remove this availability slot?')) {
      this.doctorService.removeAvailability(slot.slotid).subscribe(() => {
        this.availabilitySlots = this.availabilitySlots.filter(s => s.slotid !== slot.slotid);
        this.loadAvailability();
        this.cdr.detectChanges();
      });
    }
  }

  loadAppointments() {
    this.doctorService.getAppointments(this.doctorId).subscribe(data => {
      this.appointments = data;
      this.cdr.markForCheck();
      console.log("Appointments:", this.appointments);
    });
  }

  // ✅ Only Cancel option remains
  updateAppointmentStatus(id: number, status: 'booked' | 'Cancel By Patient' | 'Cancel By Doctor'): void {
    console.log("Updating appointment ID:", id, "to status:", status);
    this.doctorService.updateAppointmentStatus(id, status).subscribe(updated => {
      const idx = this.appointments.findIndex(a => a.id === id);
      if (idx > -1) this.appointments[idx] = updated;
      this.loadAppointments();
      this.cdr.markForCheck();
    });
  }

  getPendingAppointmentsCount(): number {
    return this.appointments.filter(apt => apt.status === 'booked').length;
  }

  getConfirmedAppointmentsCount(): number {
    return this.appointments.filter(apt => apt.status === 'Completed').length;
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
