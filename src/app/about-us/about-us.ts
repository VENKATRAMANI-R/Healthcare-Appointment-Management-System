import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css']   
})
export class AboutUs implements OnInit {
 
  menu = [
    { key: 'profile', label: 'Profile' },
    { key: 'vision', label: 'Vision & Mission' },
    { key: 'journey', label: 'Our Journey' },
    { key: 'board', label: 'Board of Directors' },
    { key: 'services', label: 'Our Services' },
    { key: 'quality', label: 'Quality Policy' }
  ];
 

  activeSection: string = 'profile';
 
  
  sectionContents: { [key: string]: string } = {
    profile: `
  <h2 style="text-align:center;">Hospital Profile</h2>
  <div style="text-align:justify;">
    <p>
      Our hospital is a trusted healthcare institution committed to delivering comprehensive medical services 
      with compassion and excellence. With a strong focus on patient-centered care, we ensure that every individual 
      who steps into our facility receives personalized attention and the best possible treatment.
    </p>
    <p>
      We are equipped with modern infrastructure, advanced medical technology, and a team of highly skilled doctors, 
      nurses, and healthcare professionals. Our specialties range from emergency and critical care to advanced treatments 
      in cardiology, neurology, oncology, orthopedics, and more.
    </p>
    <p>
      Beyond medical excellence, we emphasize hygiene, safety, and comfort for our patients. Our mission is not only to 
      treat illness but also to promote overall well-being through preventive care, awareness programs, and community outreach.
    </p>
    <p>
      As we continue to grow, we remain dedicated to our vision of being a center of excellence in healthcare while 
      upholding values of integrity, innovation, and compassion.
    </p>
  </div>
`,
 
 
    
vision: `
        <h2>Vision & Mission</h2>
        <h3>Vision</h3>
        <p>
            Our vision is to provide affordable, accessible, and world-class healthcare 
            that meets international standards while remaining patient-centered and compassionate.
            We aspire to be a leading medical destination in the country, continuously adapting 
            to the evolving needs of society, advancing with technology, and setting benchmarks 
            in quality and ethical medical care.
        </p>
        <h3>Mission</h3>
        <p>
            Our mission is to deliver safe, professional, and holistic healthcare through highly skilled professionals, 
            modern infrastructure, and innovative practices. We are committed to:
        </p>
        <ul>
            <li> Ensuring excellence in patient care and continuous quality improvement. </li>
            <li> Providing outstanding value through affordability and accessibility for all. </li>
            <li> Advancing medical education and research for the benefit of humanity. </li>
            <li> Functioning as a compassionate, ethical, and collaborative team dedicated to the well-being of every individual. </li>
        </ul>
    `,
    journey: `
        <h2>Our Journey</h2>
        <p>
            Founded two decades ago with a modest outpatient clinic and a small team of dedicated doctors, 
            our hospital began with a simple vision — to bring compassionate, quality healthcare within the 
            reach of every family in our community. Over the years, through perseverance and patient trust, 
            we expanded our facilities, introduced advanced diagnostic services, and added specialized departments 
            that could address the growing medical needs of the region.
        </p>
        <p>
            Today, we stand as a multi-specialty healthcare institution recognized for our commitment to excellence, 
            innovation, and patient-centered care. From humble beginnings to becoming a trusted name in healthcare, 
            our journey reflects the values of empathy, integrity, and continuous learning. With every milestone, 
            we renew our promise to improve lives, adopt cutting-edge medical practices, and nurture a healthier 
            future for generations to come.
        </p>
    `,
    board: `<h2>Board of Directors</h2><p>Information about directors...</p>`,
    services: `
        <h2>Our Services</h2>
        <p>
            Our hospital offers a wide range of comprehensive healthcare services, 
            designed to meet the diverse medical needs of our patients. With state-of-the-art 
            facilities and highly trained professionals, we ensure that every service 
            we provide upholds the highest standards of quality, safety, and compassion.
        </p>
        <p><strong>Emergency & Critical Care:</strong> 24/7 emergency services with advanced trauma care units, intensive care, and rapid response teams.</p>
        <p><strong>Specialized Departments:</strong> Expertise in cardiology, neurology, oncology, orthopedics, nephrology, pediatrics, obstetrics & gynecology, and general medicine, supported by dedicated specialists.</p>
        <p><strong>Diagnostic & Imaging:</strong> Cutting-edge radiology, pathology, and diagnostic laboratories equipped with the latest imaging technology for accurate and timely results.</p>
        <p><strong>Surgical Services:</strong> Modern operating theaters with facilities for general, laparoscopic, orthopedic, cardiac, and neurosurgeries.</p>
        <p><strong>Preventive & Wellness Programs:</strong> Regular health check-up packages, vaccination drives, nutrition counseling, and lifestyle management programs to encourage proactive healthcare.</p>
        <p><strong>Rehabilitation & Supportive Care:</strong> Physiotherapy, occupational therapy, mental health support, and palliative care for holistic recovery.</p>
        <p>
            Through our integrated services, we aim to provide patients with a seamless 
            healthcare journey — from diagnosis to treatment, recovery, and wellness.
        </p>
    `,
    quality: `
        <h2>Quality Policy</h2>
        <p>
            At our hospital, quality is the cornerstone of every service we provide. 
            We are committed to ensuring that our patients receive safe, effective, 
            and compassionate care that meets the highest international standards.
            Our quality policy is built on continuous improvement, ethical practices, 
            and a patient-first approach.
        </p>
        <p><strong>Patient Safety:</strong> Adopting stringent safety protocols and infection control measures to safeguard patients at every stage of care.</p>
        <p><strong>Clinical Excellence:</strong> Regular training, peer reviews, and evidence-based practices to ensure the highest standards in medical treatment and surgical outcomes.</p>
        <p><strong>Continuous Improvement:</strong> Periodic audits, feedback systems, and adoption of innovative technologies to enhance efficiency and service delivery.</p>
        <p><strong>Ethics & Transparency:</strong> Upholding honesty, confidentiality, and integrity in every patient interaction while ensuring transparent communication.</p>
        <p><strong>Patient-Centered Care:</strong> Treating every individual with dignity, respect, and empathy, while tailoring treatments to their unique needs.</p>
        <p>
            By following this policy, we strive to create a culture of trust, accountability, 
            and excellence, ensuring that our hospital remains a preferred destination for 
            world-class healthcare.
        </p>
    `

  };
 
  // On component load, restore section from localStorage
  ngOnInit() {
    const saved = localStorage.getItem('aboutActiveSection');
 
  
    if (saved && this.sectionContents[saved]) {
      this.activeSection = saved;
    } else {
      
      this.activeSection = 'profile';
      localStorage.setItem('aboutActiveSection', 'profile');
    }
  }
 
  //  Change section and save to localStorage
  loadSection(section: string) {
    if (!this.sectionContents[section]) return;
    this.activeSection = section;
    localStorage.setItem('aboutActiveSection', section);
  }
}
 