import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { AlertModule } from './_alert';
@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs {
    address = "Phase 3, Hinjewadi, Pune, 411057";
  phone = "910-910-1150";
  email = "healwell@gmail.com";
  contactForm = new FormGroup({
    yourname: new FormControl("", [Validators.required, Validators.minLength(2)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phoneNumber: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    message: new FormControl("", [Validators.required, Validators.minLength(10)])
  });

  submitted = false;
  formError = false;

  onSubmit() {
   this.submitted = false;
  this.formError = false; 
    /* this.submitted = true; */
    
  if (this.contactForm.valid) {
    this.submitted = true;
    this.formError = false;
     this.contactForm.reset(); 
  } else {
    this.formError = true;
      /* this.contactForm.reset();  */
  }
  this.cdr.detectChanges();
}
 constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

 
} 