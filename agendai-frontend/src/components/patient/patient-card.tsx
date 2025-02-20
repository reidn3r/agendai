import {
    AlertDialog,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import DeletePatientDialog from "./delete-patient-dialog";
import axios from 'axios';
import { PatientModel } from "@/models/PatientModel";
import { Trash, User } from "lucide-react";


export default function PatientCard({ name, cpf, id, Patients, setPatients, setFilteredPatients } : {
    id:string
    name:string, 
    cpf:string,
    Patients : PatientModel[],
    setPatients: (data:PatientModel[]) => void,
    setFilteredPatients: (data:PatientModel[]) => void,
    }){

    const onConfirm = async() => {
        try{
            const response = await axios.delete(`http://localhost:8080/patient/delete/${id}`);
            
            console.log(response);
            
            const newArray = Patients.filter((s) => s.id != id);
            setPatients(newArray);
            setFilteredPatients(newArray);
        }
        catch(err:any){
            console.log(err);
            alert("Erro ao deletar paciente")
        }
    }

    return(
        <div className="flex flex-row items-center p-4 my-2 rounded-md shadow-lg border border-neutral-950/50 bg-[#171717] hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-neutral-800 rounded-full">
                <User className="text-white" size={24} />
            </div>

            <div className="flex flex-col mx-4 flex-grow">
                <p className="font-bold text-white text-lg"> {name || "Nome não informado"} </p>
                <p className="text-sm text-neutral-400">CPF: {cpf || "CPF não informado"} </p>
            </div>

            <AlertDialog>
                <AlertDialogTrigger>
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-neutral-800 hover:bg-red-800 hover:text-white rounded-md transition-colors duration-300"
                    >
                        <Trash size={18} />
                        Deletar
                    </button>
                </AlertDialogTrigger>
            <DeletePatientDialog
                onConfirm={onConfirm}
            />
            </AlertDialog>
        </div>
    );
}