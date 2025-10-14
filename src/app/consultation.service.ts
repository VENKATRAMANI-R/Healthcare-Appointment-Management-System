import { Injectable, EventEmitter } from '@angular/core';



export interface PrescriptionItem {
  medicineName: string;
  dose: string;
  frequency: string;
  duration?: string;
  notes?: string;
}

export interface Consultation {
  id?: string;
  appointmentId?: string;
  patientId: string;
  patientName?: string;
  doctorId?: string;
  doctorName: string;
  date: string;
  notes?: string;
  prescription?: PrescriptionItem[];
  // attachments?: Attachment[];
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  consultationSelected = new EventEmitter<Consultation>();

  private consultations: Consultation[] = [
    {
      id: '1',
      patientId: 'P001',
      patientName: 'Arjun',
      doctorId: 'D001',
      doctorName: 'Dr. Amal Krishna',
      date: '2025-09-21',
      notes: 'Patient complained of fever and cough.',
      prescription: [
        { medicineName: 'Paracetamol', dose: '500mg', frequency: 'Twice a day', duration: '5 days' }
      ]
    },
    {
      id: '2',
      patientId: 'P001',
      patientName: 'Arjun',
      doctorId: 'D002',
      doctorName: 'Dr. Venkat Ramani',
      date: '2025-09-19',
      notes: 'Severe headache reported. Prescribed MRI scan.'
    },
    {
      id: '3',
      patientId: 'P001',
      patientName: 'Arjun',
      doctorId: 'D003',
      doctorName: 'Dr. Guru Sakthi',
      date: '2025-09-15',
      notes: 'Routine pediatric check-up. Vaccination updated.',
      prescription: [
        { medicineName: 'Vitamin Syrup', dose: '5ml', frequency: 'Once daily', duration: '30 days' }
      ]
    },
    {
      id: '4',
      patientId: 'P001',
      patientName: 'Arjun',
      doctorId: 'D004',
      doctorName: 'Dr. Aravindh R.',
      date: '2025-09-10',
      notes: 'Post-surgery consultation. Healing process good.'
    },
    {
      id: '5',
      patientId: 'P001',
      patientName: 'Arjun',
      doctorId: 'D005',
      doctorName: 'Dr. AmarSri',
      date: '2025-09-05',
      notes: 'Skin allergy treatment advised. Prescribed ointment.',
      prescription: [
        { medicineName: 'Hydrocortisone Cream', dose: 'Apply thin layer', frequency: 'Twice daily', duration: '7 days' }
      ]
    }
  ];

  getConsultations(): Consultation[] {
    return [...this.consultations];
  }

  selectConsultation(consultation: Consultation) {
    this.consultationSelected.emit(consultation);
  }
}