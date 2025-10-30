import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AppointmentService, AvailabilitySlotDTO, Appointment } from '../appointment-service';
import { CommonModule } from '@angular/common';
import { Appointment, AppointmentService, AvailabilitySlotDTO } from '../appointment-service';


@Component({
  selector: 'app-book-appointment',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css' 
})
export class BookAppointment implements OnInit {
  appointmentForm!: FormGroup;
  availableSlots: AvailabilitySlotDTO[] = [];
  availableStartTimes: string[] = [];
  isLoadingSlots: boolean = false;

  
  // Store doctor data from navigation
  private selectedDoctorId: number = 0;
  private selectedDoctorName: string = '';
  private selectedSlotId: number = 0;
  private patId: number = 0;
  private patName: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get pre-filled data from navigation state
    const navigationState = history.state;
    this.getPatientDetails();
    // this.cdr.detectChanges();
    
    this.selectedDoctorId = navigationState.doctorId;
    this.selectedDoctorName = navigationState.doctorName;
    // console.log("Patient Id:", localStorage.getItem('patientId'));
    console.log("Form Case Runs");
    this.appointmentForm = this.fb.group({
      patId: [this.patId, [Validators.required, Validators.pattern('^[0-9]+$')]],
      patientName: [this.patName, Validators.required],
      doctorName: [this.selectedDoctorName, Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: [{value: '', disabled: true}, Validators.required],
      problem: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  // Fetch available slots when date is selected
  onDateSelected(): void {
    const selectedDate = this.appointmentForm.get('date')?.value;
    
    if (selectedDate && this.selectedDoctorId) {
      this.isLoadingSlots = true;
      this.availableStartTimes = [];
      this.appointmentForm.get('startTime')?.setValue('');
      this.appointmentForm.get('endTime')?.setValue('');
      this.selectedSlotId = 0;
      this.appointmentService.getAvailableSlots(this.selectedDoctorId, selectedDate)
        .subscribe({
          next: (slots: AvailabilitySlotDTO[]) => {
            this.availableSlots = slots;
            // Extract only available start times
            this.availableStartTimes = slots.map(slot => slot.startTime);
            this.isLoadingSlots = false;
            console.log('Fetched slots:', slots);
          },
          error: (error) => {
            console.error('Error fetching slots:', error);
            this.availableSlots = [];
            this.availableStartTimes = [];
            this.isLoadingSlots = false;
          }
        });
    }
  }

  // Auto-fill end time and slotId when start time is selected

  getPatientDetails(){
    this.patId = localStorage.getItem('patientId') ? parseInt(localStorage.getItem('patientId')!) : 0;
    this.patName = localStorage.getItem('patientName') || '';
    console.log("Patient Details Fetched:", this.patId, this.patName);
  }

  onTimeSelected(): void {
    const selectedTime = this.appointmentForm.get('startTime')?.value;
    
    if (selectedTime) {
      const selectedSlot = this.availableSlots.find(slot => 
        slot.startTime === selectedTime
      );
      
      if (selectedSlot) {
        this.appointmentForm.get('endTime')?.setValue(selectedSlot.endTime);
        this.selectedSlotId = selectedSlot.id;
      }
    }
  }

  onSubmit(): void {
    if (this.appointmentForm.valid && this.selectedSlotId) {
      const formData = this.appointmentForm.getRawValue();
      const selectedDate = formData.date;
      
      this.appointmentService.getAvailableSlots(this.selectedDoctorId, selectedDate).subscribe({
      next: (latestSlots: AvailabilitySlotDTO[]) => {
        const stillAvailable = latestSlots.find(slot => slot.id === this.selectedSlotId);

        if (!stillAvailable) {
          alert('This time slot has already been booked. Please choose another one.');
          this.onDateSelected(); // Refresh UI
          return;
        }}
        });
      const appointmentData: Appointment = {
        patientId: parseInt(formData.patId),
        doctorId: this.selectedDoctorId,
        patientName: formData.patientName,
        doctorName: formData.doctorName,
        problem: formData.problem,
        slotId: this.selectedSlotId,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        status: 'BOOKED' // Default status
      };

      this.appointmentService.bookAppointment(appointmentData).subscribe({
        next: (response: Appointment) => {
          alert('Appointment booked successfully!');
          console.log('Appointment booked:', response);
          // Optionally navigate to appointments page
          // this.router.navigate(['/my-appointments']);
        },
        error: (error) => {
          alert('Failed to book appointment. Please try again.');
          console.error('Error booking appointment:', error);
        }
      });
    }
  }



  onClick(): void {
    this.router.navigate(['my-appointments']);
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}

    