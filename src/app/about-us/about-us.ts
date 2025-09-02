import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css']
})
export class AboutUs {
  activeSection: string = 'profile';

  sectionContents: { [key: string]: string } = {
    profile: `
    
    <h2>  Profile   </h2>
    <p> 
        Our hospital is a trusted healthcare institution committed to delivering 
        comprehensive medical services with compassion and excellence. With a 
        strong focus on patient-centered care, we ensure that every individual 
        who steps into our facility receives personalized attention and the best 
        possible treatment. 
    </p>
    <p>
        We are equipped with modern infrastructure, advanced medical technology, 
        and a team of highly skilled doctors, nurses, and healthcare professionals. 
        Our specialties range from emergency and critical care to advanced 
        treatments in cardiology, neurology, oncology, orthopedics, and more.
    </p>
    <p>
         Beyond medical excellence, we emphasize hygiene, safety, and comfort for 
         our patients. Our mission is not only to treat illness but also to promote 
         overall well-being through preventive care, awareness programs, and 
         community outreach.
    </p>
    <p>
          As we continue to grow, we remain dedicated to our vision of being a 
          center of excellence in healthcare while upholding values of integrity, 
          innovation, and compassion.
    </p>

    `,






















    vision: `<h2>Vision & Mission</h2><p>Our vision and mission statements...</p>`,
    journey: `<h2>Our Journey</h2><p>Timeline and milestones...</p>`,
    board: `<h2>Board of Directors</h2><p>Information about directors...</p>`,
    services: `<h2>Our Services</h2><p>List of services we offer...</p>`,
    quality: `<h2>Quality Policy</h2><p>Our commitment to quality...</p>`
  };

  loadSection(section: string): void {
    if (this.sectionContents[section]) {
      this.activeSection = section;
    }
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section') || 'profile';
    this.loadSection(section);
  }
}