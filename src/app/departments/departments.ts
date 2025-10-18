import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
 
interface Department {
  name: string;
  icon: string;
  description: string;
}
 
@Component({
  selector: 'app-departments',
  imports: [CommonModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css'
})
export class Departments {
  departments: Department[] = [
    {
      name: 'Cardiology',
      icon: 'favorite',
      description: 'Specializes in heart conditions, offering advanced cardiac care including diagnostics, treatments, and intervention procedures.'
    },
    {
      name: 'Neurology',
      icon: 'psychology',
      description: 'Focuses on disorders of the nervous system, providing expert care for strokes, epilepsy, migraines, and neurodegenerative diseases.'
    },
    {
      name: 'Orthopedics',
      icon: 'accessibility',
      description: 'Deals with bone and joint issues, including fractures, arthritis, spinal problems, and sports injuries, using both surgical and non-surgical methods.'
    },
    {
      name: 'Pediatrics',
      icon: 'child_friendly',
      description: 'Dedicated to infants, children, and adolescents’ health, offering immunizations, growth monitoring, and disease management.'
    },
    {
      name: 'Oncology',
      icon: 'science',
      description: 'Provides comprehensive cancer care, from diagnosis to advanced treatments like chemotherapy, radiotherapy, and surgery.'
    },
    {
      name: 'Emergency',
      icon: 'local_hospital',
      description: '24/7 emergency services equipped to handle trauma, acute illness, and critical medical events with rapid response teams.'
    }
  ];
}
 