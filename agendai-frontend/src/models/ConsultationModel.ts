export interface ConsultationModel {
  id: string;
  data: string; // LocalDateTime chega como string ISO (ex: "2025-12-08T12:49:00")
  estado: string; 
  secretaryId: string;
  secretaryName: string;
  medicId: string;
  medicName: string;
  patientId: string;
  patientName: string;
}


export interface ConsultationCreateDTO {
    date: string;       // LocalDateTime em formato ISO
    secretaryId: string;
    medicId: string;
    patientId: string;
}