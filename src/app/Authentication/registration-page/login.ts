import { Component } from '@angular/core';
import { LoginService } from '../login-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    userForm: FormGroup;
 
  constructor(private loginService:LoginService, private router : Router) {
  this.userForm = new FormGroup({
    patientEmail: new FormControl(''),
    patientPassword: new FormControl('')
  }); 
  }
  onLogin() {
    // const correctUsername = this.loginService.userObj.username;
    // const correctPassword = this.loginService.userObj.password;

    if(this.userForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }
    
    localStorage.removeItem('patientToken');
    localStorage.removeItem('patientEmail');
    localStorage.removeItem('patientName');
    
    const { patientEmail , patientPassword } = this.userForm.value;

    this.loginService.loginPatient(patientEmail, patientPassword).subscribe({
      next: (response: any) => {
        console.log('Login successful****', response);
        localStorage.setItem('Patienttoken', response.token); // Store the token
        localStorage.setItem('patientId', response.patientId);
        localStorage.setItem('patientEmail', response.patientEmail);
        localStorage.setItem('patientName', response.patientName);
        // this.doctorEmail = response.doctorEmail; // Store the email
        // this.doctorName = response.doctorPassword; // Store the name
        alert('Login successful!');
        this.router.navigate(['/landingpage']); // Navigate to doctor profile
      },
      error: (error: any) => {
        console.error('There was an error during login!', error);
        alert('Invalid username or password.');
      } 
    });
    
}
goRegister() {
        this.router.navigate(['/registration-page']);
      }
}

