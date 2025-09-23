import { Component, signal } from '@angular/core';
import { FormsModule,FormControl, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration-page-doctor',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './registration-page-doctor.html',
  styleUrl: './registration-page-doctor.css'
})
export class RegistrationPageDoctor {
userForm: FormGroup;
 

  /* errors = [
    { name: 'required', text: 'This field is required', rules: ['touched'] },
    { name: 'pattern', text: 'Only numbers min length is 4', rules: ['dirty'] }
  ]; */

  constructor(/* private fb: FormBuilder */) {
    this.userForm = new FormGroup({
      doctorId: new FormControl('', [Validators.required]), 
      userName: new FormControl ('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phonenumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{10,}$/)]),
      confirmpassword: new FormControl('', [Validators.required]) }, { validators: this.passwordMatchValidator 

      });
  }

  passwordMatchValidator(control : AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmpassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    } 
    return null;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
      alert(`Registration Successful!`);
      
      // add further logic here (e.g., send data to backend)
     } 
    
    
    else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  } 

  onReset()
  {
    this.userForm.reset();
  }

}
