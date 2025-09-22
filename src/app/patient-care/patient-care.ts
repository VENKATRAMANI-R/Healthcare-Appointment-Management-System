import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-patient-care',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-care.html',
  styleUrls: ['./patient-care.css']
})
export class PatientCare implements OnInit {
 
  // Sidebar menu
  menu = [
    { key: 'inpatient', label: 'In Patient Services' },
    { key: 'outpatient', label: 'Out Patient Services' },
    { key: 'homecare', label: 'Home Care Services' },
    { key: 'insurance', label: 'Health Insurance' },
    { key: 'faq', label: 'FAQ' }
  ];
 
  activeSection: string = 'inpatient';
  activeFaq: number | null = null;
 
  // Section contents
  sectionContents: { [key: string]: string } = {

    inpatient: `
      <h2>In-Patient Services</h2>
 
      <h3>Before Admission</h3>
      <ul>
        <li>All patients are issued a UHID (Unique Hospital ID) for records and identification.</li>
        <li>Please provide accurate details at registration/admission to ensure correct records and billing.</li>
        <li>Carry valid ID proof (Aadhar, Voter ID, PAN, DL, Passport) at admission or within 24 hours.</li>
      </ul>
 
      <h3>Accommodation – Room Categories</h3>
      <ul>
        <li><b>Non A/C:</b> Single, Deluxe Single, Double Bed, General Ward</li>
        <li><b>A/C:</b> Single, Deluxe Single, Executive, Suite</li>
      </ul>
 
      <h3>After Admission</h3>
      <ul>
        <li>Rooms are allotted based on preference and medical need. Only 2 bystanders are permitted. ICU patients' rooms can be retained or vacated (charges apply).</li>
        <li>Each patient is assigned a Customer Relations Executive (CRE) for assistance until discharge.</li>
        <li>All rooms have a Nurse Call System (including bathrooms). Use it for assistance.</li>
        <li>At night, stay in bed for safety and use the call system if needed.</li>
      </ul>
 
      <h3>Dietary Service</h3>
      <ul>
        <li>Fresh meals are delivered to your room. Doctors/Dietitians may prescribe special diets.</li>
        <li>Orders can be placed through food service staff or by calling extn: 8603/8604 (6:00 a.m.–9:00 p.m.).</li>
      </ul>
 
      <h3>Visiting Hours</h3>
      <ul>
        <li><b>General/Medical/Surgical Wards:</b> 4:00 p.m.–7:00 p.m.</li>
        <li>Specific units may differ—check with the ward nurse.</li>
      </ul>
 
      <h3>Visitor Guidelines</h3>
      <ul>
        <li>Two visitor passes are issued at admission and must be returned at billing.</li>
        <li>Maximum 2 visitors at a time; visits should be short and quiet.</li>
        <li>No visitors with infections, and children under 12 are discouraged.</li>
        <li>Do not sit on patient beds; check before giving food.</li>
        <li>Flowers and plants are not allowed in critical care areas.</li>
        <li>Cameras and recording devices are prohibited to protect privacy.</li>
      </ul>
    `,
 
    outpatient: `
      <h2>Out Patient Services</h2>
 
      <h3>After You Arrive</h3>
 
      <h4>Registration</h4>
      <ul>
        <li>First-time visitors must register at the kiosk, online link, or registration counter to receive a UHID (Unique Hospital ID).</li>
        <li>If you’ve visited before, staff at the counters can help you retrieve your UHID.</li>
      </ul>
 
      <h4>Wheelchair & Trolley Services</h4>
      <ul>
        <li>Wheelchairs and trolleys are available at hospital entrances.</li>
        <li>Attendants or Customer Relations staff will assist you in reaching your destination safely.</li>
      </ul>
 
      <h4>Payments</h4>
      <ul>
        <li>Payments can be made at billing counters, kiosks, or via mobile POS devices.</li>
        <li>Most hospitals accept cash, cards, and UPI.</li>
        <li>Billing should be completed before consultations, investigations, or procedures.</li>
      </ul>
 
      <h4>Queue Management</h4>
      <ul>
        <li>After check-in, your appointment time or token number will be displayed on digital screens outside the doctor’s OPD.</li>
      </ul>
 
      <h4>Investigations & Results</h4>
      <ul>
        <li>Payments for lab tests or procedures must be made at billing counters before proceeding.</li>
        <li>Test results are often shared via SMS/online portals, accessible with UHID and OTP verification.</li>
        <li>Reports can be downloaded and viewed on smartphones.</li>
      </ul>
 
      <h4>Review Appointments</h4>
      <ul>
        <li>For same-day reviews, visit the OPD directly after receiving results.</li>
        <li>Always book your next follow-up appointment before leaving the hospital.</li>
      </ul>
    `,
 
    homecare: `
      <h2>Home Care Services</h2>
 
      <h3>Doctor Visits at Home</h3>
      <ul>
        <li>Experienced doctors available for general consultations and follow-ups at your doorstep.</li>
        <li>Ideal for elderly patients, post-surgery recovery, and those with mobility challenges.</li>
      </ul>
 
      <h3>Nursing Care</h3>
      <ul>
        <li>Qualified nurses provide wound dressing, injections, IV therapy, and post-operative care at home.</li>
        <li>Monitoring of vital signs and recovery progress.</li>
      </ul>
 
      <h3>Physiotherapy</h3>
      <ul>
        <li>Certified physiotherapists available for rehabilitation, pain management, and mobility improvement.</li>
        <li>Customized exercise programs for post-stroke, orthopedic, or neurological conditions.</li>
      </ul>
 
      <h3>Diagnostic Services</h3>
      <ul>
       <li>Sample collection for blood tests and other investigations from home.</li>
       <li>Reports delivered via SMS, email, or hospital online portal.</li>
      </ul>
 
      <h3>Medical Equipment Rental</h3>
      <ul>
        <li>Rental and purchase of hospital beds, wheelchairs, oxygen concentrators, and other medical devices.</li>
        <li>Delivery and setup at patient’s home.</li>
      </ul>
 
      <h3>Elderly & Palliative Care</h3>
      <ul>
        <li>Specialized care programs for elderly patients and those requiring long-term support.</li>
        <li>Focus on pain relief, dignity, and quality of life in terminal illness cases.</li>
      </ul>
 
      <h3>Emergency Support</h3>
      <ul>
        <li>24/7 ambulance services available in case of sudden deterioration.</li>
        <li>Direct hospital admission coordination if required.</li>
      </ul>
    `,
      insurance: `
      <h2>Health Insurance</h2>
 
      <h3>Cashless Hospitalization</h3>
      <ul>
        <li>We are empaneled with leading public and private health insurance providers.</li>
        <li>Cashless admission facilities are available for eligible policyholders.</li>
        <li>Insurance desk assistance provided for documentation and approvals.</li>
      </ul>
 
      <h3>Pre-Authorization Process</h3>
      <ul>
        <li>Submit a valid health insurance card and ID proof at the insurance desk.</li>
        <li>Pre-authorization request sent to the insurer for approval before treatment.</li>
        <li>Emergency admissions are processed on priority with provisional approval.</li>
      </ul>
 
      <h3>Coverage & Benefits</h3>
      <ul>
        <li>Includes room charges, doctor consultations, nursing, diagnostics, and procedures (subject to policy terms).</li>
        <li>Some services like cosmetic procedures and non-medical expenses may not be covered.</li>
        <li>Coverage depends on insurer’s terms, conditions, and eligibility.</li>
      </ul>
 
      <h3>Reimbursement Claims</h3>
      <ul>
        <li>Patients may choose reimbursement if cashless is not available.</li>
        <li>Submit original bills, prescriptions, discharge summary, and reports to your insurer.</li>
        <li>Insurance desk support is provided for preparing claim documents.</li>
      </ul>
 
      <h3>TPA & Insurance Helpdesk</h3>
      <ul>
        <li>Dedicated Third Party Administrator (TPA) desk located at the hospital premises.</li>
        <li>Assistance provided for claim settlement, policy clarifications, and grievance redressal.</li>
        <li>Working hours: 9:00 AM – 7:00 PM (Mon–Sat).</li>
      </ul>
    `
  };
 
  // FAQ list
  faqs = [
        {
      question: 'How can I schedule an appointment with a specialist?',
      answer: 'You can schedule an appointment through our website, helpline, or by visiting the hospital reception desk.',
      open: false
    },
    {
      question: 'What details should I provide when booking a medical appointment?',
      answer: 'Please provide your full name, contact number, preferred doctor/department, and hospital ID (if available).',
      open: false
    },
    {
      question: 'Where should I go for registration on my first hospital visit?',
      answer: 'First-time visitors can register at the registration counter or self-service kiosks to get a UHID (Unique Hospital ID).',
      open: false
    },
    {
      question: 'If I already booked online/phone, where should I report upon arrival?',
      answer: 'You can directly approach the reception desk or the concerned OPD with your booking confirmation.',
      open: false
    },
    {
      question: 'Are credit/debit card payments and UPI accepted?',
      answer: 'Yes, payments can be made via cash, card, UPI, and in some cases, net banking. Foreign currency is not accepted.',
      open: false
    },
    {
      question: 'Can a relative stay overnight with me if I’m admitted?',
      answer: 'Yes, one bystander is allowed to stay overnight in most wards. In ICUs, restrictions may apply.',
      open: false
    },
    {
      question: 'How can I get investigation reports or medical documents?',
      answer: 'Reports can be collected from the lab counter or accessed online using your UHID and registered mobile number.',
      open: false
    },
    {
      question: 'What should I do if the doctor asks me to visit another department?',
      answer: 'You can book a follow-up consultation at the reception or kiosk for the new department as advised.',
      open: false
    }
  ];
 
  ngOnInit() {
    const saved = localStorage.getItem('patientCareActiveSection');
    if (saved && (saved === 'faq' || this.sectionContents[saved])) {
      this.activeSection = saved;
    } else {
      this.activeSection = 'inpatient';
      localStorage.setItem('patientCareActiveSection', 'inpatient');
    }
  }
 
  loadSection(section: string) {
    this.activeSection = section;
    localStorage.setItem('patientCareActiveSection', section);
    this.activeFaq = null; // reset FAQ when switching sections
  }
 
  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? null : index;
  }
}
 