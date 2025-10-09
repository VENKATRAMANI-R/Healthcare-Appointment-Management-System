import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-departments',
  imports: [CommonModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css'
})
export class Departments {
  isOpen = false;
  departments: string[] = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'Gynecology',
    'Psychiatry',
    'Oncology'
  ];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectDepartment(dept: string) {
    console.log('Selected department:', dept);
    this.isOpen = false;
  }

}
