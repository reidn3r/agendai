import { Button } from "../ui/button"
import {
    AlertDialog,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import DeleteSecretariaDialog from "./delete-secretaria-dialog";
import axios from 'axios';
import { SecretariaModel } from "@/models/SecretariaModel";


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
        <div className="flex flex-row p-4 my-2 rounded-sm shadow-md border border-neutral-950/50 bg-[#171717]">
            <div className="flex flex-col mx-4">
                <p className="font-bold text-white"> { nome }</p>
                <p className="text-sm text-neutral-400"> { cpf }</p>                        
            </div>

            <AlertDialog>
                <AlertDialogTrigger>
                    <Button className="bg-red-950 hover:bg-red-900">Deletar</Button>
                </AlertDialogTrigger>
                <DeleteSecretariaDialog
                    onConfirm={onConfirm}
                />
            </AlertDialog>
        </div>
    )
}