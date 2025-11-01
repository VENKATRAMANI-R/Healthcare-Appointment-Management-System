import { Component } from '@angular/core';
import { LoginService } from '../login-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-doctor.html',
  styleUrl: './login-doctor.css'
})
export class Logindoctor {
  userForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {
    this.userForm = new FormGroup({
      doctorEmail: new FormControl('', Validators.required),
      doctorPassword: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    // const username = this.userForm.get('doctorEmail')?.value;
    // const password = this.userForm.get('password')?.value;

    // localStorage.removeItem('token');
    // localStorage.removeItem('doctorEmail');
    // localStorage.removeItem('doctorName');

    if(this.userForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const { doctorEmail , doctorPassword } = this.userForm.value;

    this.loginService.login(doctorEmail, doctorPassword).subscribe({
      next: (response: any) => {
        console.log('Login successful****', response);
        localStorage.setItem('token', response.token); // Store the token

        localStorage.setItem('doctorId', response.doctorId.toString());
        localStorage.setItem('doctorEmail', response.doctorEmail);
        localStorage.setItem('doctorName', response.doctorName);
        // this.doctorEmail = response.doctorEmail; // Store the email
        // this.doctorName = response.doctorPassword; // Store the name
        alert('Login successful!');
        this.router.navigate(['/doctorLandingPage']); // Navigate to landingPage
      },
      error: (error: any) => {
        console.error('There was an error during login!', error);
        alert('Invalid username or password.');
      } 
    });
  }
  goRegister() {
    this.router.navigate(['/registration-page-doctor']);
  }
}