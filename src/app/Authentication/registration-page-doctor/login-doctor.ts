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
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  
  private parseJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
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

    const { email , password } = this.userForm.value;

    this.loginService.login(email, password).subscribe({
      next: (response: any) => {
        const claims = this.parseJwt(response.token);
        const userId = claims?.UserId;
        const role = claims?.role;
        console.log('claims: ',claims);
        console.log('role',claims?.role);
        console.log('userId',claims?.UserId);

        if(role=="ROLE_DOCTOR"){
          console.log('Login successful****', response);
        localStorage.setItem('token', response.token); // Store the token
        localStorage.setItem('userId', userId);
        // localStorage.setItem('doctorEmail', response.doctorEmail);
        localStorage.setItem('doctorName', response.name);
        localStorage.setItem('doctorId',response.id);

        // this.doctorEmail = response.doctorEmail; // Store the email
        // this.doctorName = response.doctorPassword; // Store the name
        alert('Login successful!');
        this.router.navigate(['/doctorLandingPage']);
        }
        else{
          alert('Invalid Credentials');
        }
         // Navigate to landingPage
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