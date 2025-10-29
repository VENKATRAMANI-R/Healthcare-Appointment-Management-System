
export interface UserNotification {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentId: number;
  message: string;
  date: string;
  startTime: string;
  timestamp: string;
  doctorName?: string;
  patientName?: string;
}
