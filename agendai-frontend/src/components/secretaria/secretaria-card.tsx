import {
    AlertDialog,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import DeleteSecretariaDialog from "./delete-secretaria-dialog";
import axios from 'axios';
import { SecretariaModel } from "@/models/SecretariaModel";
import { Trash, User } from "lucide-react";


export default function SecretariaCard({ nome, cpf, secretarias, setSecretarias } : {
    nome:string, 
    cpf:string,
    secretarias : SecretariaModel[],
    setSecretarias: (data:SecretariaModel[]) => void
    }){

    const onConfirm = async() => {
        try{
            const response = await axios.delete(`http://localhost:8080/professional/delete/secretary/${cpf}`);
            console.log(response);
            const newArray = secretarias.filter((s) => s.cpf !== cpf);
            setSecretarias(newArray);
        }
        catch(err:any){
            alert("Erro ao deletar secretária")
        }
    }

    return(
        <div className="flex flex-row items-center p-4 my-2 rounded-md shadow-lg border border-neutral-950/50 bg-[#171717] hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-neutral-800 rounded-full">
                <User className="text-white" size={24} />
            </div>

            <div className="flex flex-col mx-4 flex-grow">
                <p className="font-bold text-white text-lg"> {nome || "Nome não informado"} </p>
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
                <DeleteSecretariaDialog onConfirm={onConfirm} />
            </AlertDialog>
        </div>
    );
}