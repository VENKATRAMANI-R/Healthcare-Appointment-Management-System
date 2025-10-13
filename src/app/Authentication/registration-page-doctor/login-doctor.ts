// import { Component } from '@angular/core';
// import { LoginService } from '../login-service';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   imports: [ReactiveFormsModule],
//   templateUrl: './login-doctor.html',
//   styleUrl: './login-doctor.css'
// })
// export class Logindoctor {
//     userForm: FormGroup;
 
//   constructor(private loginService:LoginService, private router : Router) {
//   this.userForm = new FormGroup({
//     doctorEmail: new FormControl(''),
//     password: new FormControl('')
//   }); 
//   }
//   onLogin() {
//     const correctEmail = this.loginService.userObj.username;
//     const correctPassword = this.loginService.userObj.password;
 
//     if (!this.userForm.get('doctorEmail')?.value && !this.userForm.get('password')?.value) {
//       alert('Please enter username and password.');
//       return;
//     }
 
//     if (!this.userForm.get('doctorEmail')?.value) {
//       alert('Please enter username.');
//       return;
//     }
 
//     if (!this.userForm.get('password')?.value) {
//       alert('Please enter password.');
//       return;
//     }
 
//     if (this.userForm.get('doctorEmail')?.value !== correctEmail && this.userForm.get('password')?.value !== correctPassword) {
//       alert('Invalid username and password.');
//       return;
//     }
 
//     if (this.userForm.get('username')?.value !== correctEmail) {
//       alert('Invalid username.');
//       return;
//     }
 
//     if (this.userForm.get('password')?.value !== correctPassword) {
//       alert('Invalid password.');
//       return;
//     }

//     if(this.userForm.get('username')?.value === correctEmail && this.userForm.get('password')?.value === correctPassword) {
//       alert('Login successful!');
//       this.router.navigate(['']);
//   }
// }
// }

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
      password: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    const username = this.userForm.get('doctorEmail')?.value;
    const password = this.userForm.get('password')?.value;

    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    const isValid = this.loginService.login(username, password);

    if (isValid) {
      alert('Login successful!');
      this.router.navigate(['/doctor-profile']); 
    } else {
      alert('Invalid username or password.');
    }
  }
}