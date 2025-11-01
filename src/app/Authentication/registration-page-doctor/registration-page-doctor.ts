import { Component, signal } from '@angular/core';
import { FormsModule,FormControl, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistrationpageService } from '../registrationpage-service';


@Component({
  selector: 'app-registration-page-doctor',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registration-page-doctor.html',
  styleUrl: './registration-page-doctor.css'
})
export class RegistrationPageDoctor {
userForm: FormGroup;
  constructor(private router: Router, private Service : RegistrationpageService ) {
    this.userForm = new FormGroup({
      name: new FormControl ('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
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
      console.log(this.userForm.value);
      this.Service.registerDoctor(this.userForm.value).subscribe({
        next: (response : any) => {
        console.log('Registration successful', response);
      },
        error: (error: any) => {
        console.error('There was an error during the registration!', error);
      }
      });
     /*  console.log('Form Submitted:', this.userForm.value);
      alert(`Registration Successful!`); */
      this.router.navigate(['/login-doctor']);
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
