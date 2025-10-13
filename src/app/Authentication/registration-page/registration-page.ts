import { Component,signal } from '@angular/core';
import { FormsModule,FormControl, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RegistrationpageService } from '../registrationpage-service';


@Component({
  selector: 'app-registration-page',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.css'
})
export class RegistrationPage {
  userForm: FormGroup;
 



  constructor(private router: Router, private Service : RegistrationpageService) {
    this.userForm = new FormGroup({
      patientName: new FormControl ('', [Validators.required]),
      patientEmail: new FormControl('', [Validators.required, Validators.email]),
      patientPhonenumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      patientPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{10,}$/)]),
      confirmpassword: new FormControl('', [Validators.required]) }, { validators: this.passwordMatchValidator 

      });
  }

  passwordMatchValidator(control : AbstractControl): ValidationErrors | null {
    const password = control.get('patientPassword')?.value;
    const confirmPassword = control.get('confirmpassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    } 
    return null;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
      this.Service.registerUser(this.userForm.value).subscribe({
        next: (response : any) => {
        console.log('Registration successful', response);
      },
        error: (error: any) => {
        console.error('There was an error during the registration!', error);
      }
      });
      alert(`Registration Successful!`);
       this.router.navigate(['/login']); 
      
      // further logic will be added here 
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
