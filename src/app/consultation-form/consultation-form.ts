import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultationService } from '../consultation.service';
 
@Component({
 selector: 'app-consultation-form',
 standalone: true,
 imports: [CommonModule, ReactiveFormsModule],
 templateUrl: './consultation-form.html',
 styleUrls: ['./consultation-form.css']
})
export class ConsultationForm implements OnInit {
 consultationForm!: FormGroup;
 uploadedFiles: File[] = [];
 
 constructor(private consultationService: ConsultationService) {}
 
 ngOnInit(): void {
 this.consultationForm = new FormGroup({
 date: new FormControl('', Validators.required),
 patientId: new FormControl('', Validators.required),
 patientName: new FormControl('', Validators.required),
 doctorId: new FormControl('', Validators.required),
 doctorName: new FormControl('', Validators.required),
 notes: new FormControl(''),
 prescriptions: new FormArray([])
 });
 }
 
 get prescriptions(): FormArray {
 return this.consultationForm.get('prescriptions') as FormArray;
 }
 
 addPrescriptionItem(): void {
 const item = new FormGroup({
 medicineName: new FormControl('', Validators.required),
 dose: new FormControl('', Validators.required),
 frequency: new FormControl('', Validators.required),
 duration: new FormControl('', Validators.required)
 });
 this.prescriptions.push(item);
 }
 
 removePrescriptionItem(index: number): void {
 this.prescriptions.removeAt(index);
 }
 
//  onFileSelected(event: any): void {
//  const files = event.target.files;
//  for (let file of files) {
//  this.uploadedFiles.push(file);
//  }
//  }
 
 submitForm(): void {
 if (this.consultationForm.invalid) {
 this.consultationForm.markAllAsTouched();
 alert('Please fill all required fields.');
 return;
 }
 
 // Prepare payload
 const formData = {
 ...this.consultationForm.value
//  attachments: this.uploadedFiles.map(file => ({
//  filename: file.name,
//  size: file.size,
//  mimeType: file.type
//  }))
 };
 
 // Call the service method (POST)
 this.consultationService.saveConsultation(formData).subscribe({
 next: (res: any) => {
 console.log('Consultation submitted:', res);
 alert('Consultation submitted successfully!');
 this.consultationForm.reset();
 this.prescriptions.clear();
 this.uploadedFiles = [];
 },
 error: (err: any) => {
 console.error('Error submitting consultation:', err);
 alert('Failed to submit consultation.');
 }
 });
 }
}
 