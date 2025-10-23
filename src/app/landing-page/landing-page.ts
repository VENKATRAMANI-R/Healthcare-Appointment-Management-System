import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  encapsulation: ViewEncapsulation.None  
})
export class LandingPage implements OnInit {



  

  // UI state
  isMenuOpen = false;
  isScrolled = false;
  isAccDropdownVisible=false;
  isEmergencyDropdownOpen = false;
  isDropdownOpen = false;
  AccountDropdownState = false;
  userId:any;
  userDetails:any;
  patientName:string="";
  @ViewChild('menuRef') menuRef!: ElementRef;
 
  // Emergency services data
  emergencyServices = [
    { name: '24/7 Emergency Care', icon: 'emergency', phone: '+91-9876543210' },
    { name: 'Ambulance Service', icon: 'local_hospital', phone: '+91-9876543211' },
    { name: 'Critical Care', icon: 'monitor_heart', phone: '+91-9876543212' },
    { name: 'Trauma Center', icon: 'report_problem', phone: '+91-9876543213' }
  ];
 
  // Top navigation
  navigationItems = [
    { label: 'About us', route: '/about', hasDropdown: false },
    { label: 'Excellence', route: '/excellence', hasDropdown: false },
    { label: 'Departments', route: '/departments', hasDropdown: true },
    { label: 'Patient Care', route: '/patient-care', hasDropdown: false },
    { label: 'Contact us', route: '/contact', hasDropdown: false }
  ];
 
  // Departments (dropdown)
  departments = [
    { name: 'Cardiology', icon: 'favorite', route: '/departments/cardiology' },
    { name: 'Neurology', icon: 'psychology', route: '/departments/neurology' },
    { name: 'Orthopedics', icon: 'accessibility', route: '/departments/orthopedics' },
    { name: 'Pediatrics', icon: 'child_friendly', route: '/departments/pediatrics' },
    { name: 'Oncology', icon: 'healing', route: '/departments/oncology' },
    { name: 'Emergency', icon: 'emergency', route: '/departments/emergency' }
  ];
 
  // Hero content
  heroContent = {
    title: 'Excellence in Healthcare',
    subtitle: 'Providing compassionate, quality healthcare services with state-of-the-art facilities',
    ctaText: 'Book Appointment',
    secondaryCtaText: 'Find Doctor'
  };
 
  // Patient Dashboard
patientDashboard = [
  { label: 'Account Details', icon: 'account', route: '/patient/account' },
  { label: 'My Consultations', icon: 'consultation', route: '/patient/consultations' },
  { label: 'Appointment Scheduler', icon: 'scheduler', route: '/patient/scheduler' }
];

  // Services cards
  services = [
    {
      title: 'Emergency Care',
      description: '24/7 medical services with fully equipped trauma center',
      icon: 'emergency'
    },
    {
      title: 'Specialized Treatments',
      description: 'Advanced treatments across multiple specializations',
      icon: 'medical_services'
    },
    {
      title: 'Preventive Care',
      description: 'Comprehensive health checkups and preventive programs',
      icon: 'health_and_safety'
    },
    {
      title: 'Patient Support',
      description: 'Support services for a better healthcare experience',
      icon: 'support_agent'
    }
  ];
  user = {
    name: '',
    profileImage: 'assets/images/profile.jpg'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('patientName');
    if (storedName) {
      this.patientName = storedName;
      this.user.name = storedName;
    }
    console.log('Patient Name from localStorage:', storedName);
  }

 
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 100;
  }
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
 
  toggleEmergencyDropdown(): void {
    this.isEmergencyDropdownOpen = !this.isEmergencyDropdownOpen;
  }
  goToUserProfile(): void {
    this.router.navigate(['patientProfiles']);
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMenuOpen = false;
  }
 navigateToPatientFeature(route: string): void {
  this.router.navigate([route]);
}

  navigateToDepartment(route: string): void {
    this.router.navigate([route]);
  }
 
  bookAppointment(): void {
    this.router.navigate(['bookAppointment']);
  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  findDoctor(): void {
    this.router.navigate(['FindDoctors']);
  }
 
  callEmergency(phone: string): void {
    window.open(`tel:${phone}`, '_self');
  }
 
  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
  logout(){
    //configurations need to be done!
    this.router.navigate(['/login']);
  }
  AccountDropdown(){
    this.AccountDropdownState = !this.AccountDropdownState;
  }
}
 