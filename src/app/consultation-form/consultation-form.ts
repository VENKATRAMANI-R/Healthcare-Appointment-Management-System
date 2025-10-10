import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consultation-form.html',
  styleUrls: ['./consultation-form.css']
})
export class ConsultationForm {
  consultationForm: FormGroup;
  uploadedFiles: File[] = [];

  constructor() {
    this.consultationForm = new FormGroup({
      date: new FormControl('', Validators.required),
      patientId: new FormControl('', Validators.required),
      patientName: new FormControl('', Validators.required),
      doctorId: new FormControl('', Validators.required),
      doctorName: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required),
      prescription: new FormArray([])
    });
  }

  get prescription(): FormArray {
    return this.consultationForm.get('prescription') as FormArray;
  }

  addPrescriptionItem() {
    const item = new FormGroup({
      medicineName: new FormControl('', Validators.required),
      dose: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
      duration: new FormControl('',Validators.required)
    });
    this.prescription.push(item);
  }

  removePrescriptionItem(index: number) {
    this.prescription.removeAt(index);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let file of files) {
      this.uploadedFiles.push(file);
    }
  }

  submitForm() {
    console.log(this.consultationForm);
    //console.log(this.consultationForm.controls['patientId'].errors);
    if (this.consultationForm.valid) {
      const formData = {
        ...this.consultationForm.value,
        attachments: this.uploadedFiles.map(file => ({
          filename: file.name,
          size: file.size,
          mimeType: file.type
        
        }))
      };
      
      console.log('Submitted Consultation:', formData);
    } else {
      //console.log(this.consultationForm.controls['patientId'].errors);
      console.log('Form is invalid');
    }
  }
}
