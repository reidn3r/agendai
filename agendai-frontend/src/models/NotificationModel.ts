import { PatientModel } from "./PatientModel";

export interface NotificationModel {
    id: string;
    message: string;
    tipo?: string;
    patients: PatientModel[];
}