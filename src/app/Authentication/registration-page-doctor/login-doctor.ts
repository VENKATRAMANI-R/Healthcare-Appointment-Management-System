import { Component } from '@angular/core';
import { LoginService } from '../../login-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login-doctor.html',
  styleUrl: './login-doctor.css'
})
export class Logindoctor {
    userForm: FormGroup;
 
  constructor(private loginService:LoginService, private router : Router) {
  this.userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  }); 
  }
  onLogin() {
    const correctUsername = this.loginService.userObj.username;
    const correctPassword = this.loginService.userObj.password;
 
    if (!this.userForm.get('username')?.value && !this.userForm.get('password')?.value) {
      alert('Please enter username and password.');
      return;
    }
 
    if (!this.userForm.get('username')?.value) {
      alert('Please enter username.');
      return;
    }
 
    if (!this.userForm.get('password')?.value) {
      alert('Please enter password.');
      return;
    }
 
    if (this.userForm.get('username')?.value !== correctUsername && this.userForm.get('password')?.value !== correctPassword) {
      alert('Invalid username and password.');
      return;
    }
 
    if (this.userForm.get('username')?.value !== correctUsername) {
      alert('Invalid username.');
      return;
    }
 
    if (this.userForm.get('password')?.value !== correctPassword) {
      alert('Invalid password.');
      return;
    }

    if(this.userForm.get('username')?.value === correctUsername && this.userForm.get('password')?.value === correctPassword) {
      alert('Login successful!');
      this.router.navigate(['/']);
  }
}
}

