import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-landing',
  imports: [],
  templateUrl: './login-landing.html',
  styleUrl: './login-landing.css'
})
export class LoginLanding {
constructor(private router: Router) {}

  loginAsDoctor(): void {
    this.router.navigate(['/login-doctor']);
  }

  loginAsPatient(): void {
    this.router.navigate(['/login']);
  }

  
}
