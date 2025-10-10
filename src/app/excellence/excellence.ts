
import { Component, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';

 
@Component({
  selector: 'app-excellence',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './excellence.html',
  styleUrls: ['./excellence.css']   
})
export class Excellence implements OnInit {
 
  // Sidebar menu list
  menu = [
    { key: 'awards', label: 'Awards & Accolades' },
    { key: 'accreditation', label: 'Accreditation & Certification' },
    { key: 'milestones', label: 'Achievements & Milestones' },
    // {key:'rahul', label:'RAHUL'}

  ];
 
  activeSection: string = 'awards';
 
  sectionContents: { [key: string]: string } = {
    awards: `
      <h2>Awards & Accolades</h2>
      <p>Our hospital has received numerous awards recognizing our commitment to excellence in patient care, innovation, and medical research.</p>
    `,
    accreditation: `
      <h2>Accreditation & Certification</h2>
      <p>We are accredited by leading healthcare quality boards and hold certifications that validate our high standards of safety and service.</p>
    `,
    milestones: `
      <h2>Achievements & Milestones</h2>
      <p>Over the years, our hospital has achieved several key milestones, from expanding specialties to adopting cutting-edge medical technology.</p>
    `,
      // rahul: `
      // <h2> JAVA TRAINER <h2>
  
      // `,
  };
 
ngOnInit() {
  this.activeSection = 'awards';
}
 
 

  loadSection(section: string) {
    if (!this.sectionContents[section]) return;
    this.activeSection = section;
  }
}
 