import { Injectable } from '@angular/core';
import { Doctor } from './find-doctors/doctor-model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly defaultImage = 'images/Doctor_Default.jpg';

  private doctors = [
    {
      name: 'Dr. Amal Krishna',
      position: 'Senior Cardiologist',
      qualification: 'MD, Cardiology, Harvard Medical School',
      image: this.defaultImage,
      hours: ['Mon, Wed, Fri: 9:00 AM - 4:00 PM', 'Tue, Thu: 11:00 AM - 6:00 PM'],
      specialties: ['cardiology'],
      availability: ['morning', 'afternoon']
    },
    {
      name: 'Dr. Venkat Ramani',
      position: 'Neurology Specialist',
      qualification: 'MD, Neurology, Johns Hopkins University',
      image: this.defaultImage,
      hours: ['Mon, Tue, Thu: 8:00 AM - 3:00 PM', 'Wed, Fri: 10:00 AM - 5:00 PM'],
      specialties: ['neurology'],
      availability: ['morning', 'afternoon']
    },
    {
      name: 'Dr. Guru Sakthi',
      position: 'Pediatrician',
      qualification: 'MD, Pediatrics, Stanford University',
      image: this.defaultImage,
      hours: ['Mon - Fri: 8:30 AM - 5:30 PM', 'Sat: 9:00 AM - 1:00 PM'],
      specialties: ['pediatrics'],
      availability: ['morning', 'afternoon', 'weekend']
    },
    {
      name: 'Dr. Aravindh.R',
      position: 'Orthopedic Surgeon',
      qualification: 'MD, Orthopedics, Mayo Clinic',
      image: this.defaultImage,
      hours: ['Tue, Thu: 7:00 AM - 2:00 PM', 'Mon, Wed, Fri: 1:00 PM - 8:00 PM'],
      specialties: ['orthopedics'],
      availability: ['morning', 'afternoon', 'evening']
    },
    {
      name: 'Dr. AmarSri',
      position: 'Dermatologist',
      qualification: 'MD, Dermatology, UCSF',
      image: this.defaultImage,
      hours: ['Mon, Wed, Fri: 9:00 AM - 4:00 PM', 'Sat: 10:00 AM - 2:00 PM'],
      specialties: ['dermatology'],
      availability: ['morning', 'weekend']
    },
    {
      name: 'Dr. Robert Kim',
      position: 'General Surgeon',
      qualification: 'MD, Surgery, Cleveland Clinic',
      image: this.defaultImage,
      hours: ['Mon, Tue, Thu, Fri: 8:00 AM - 5:00 PM', 'Wed: 7:00 AM - 12:00 PM'],
      specialties: ['surgery'],
      availability: ['morning', 'afternoon']
    }
  ];

  getDoctors() {
    return [...this.doctors];
  }
  
  getImage(){
    return this.defaultImage;
  }

}
