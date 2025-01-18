import { User, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { SecretariaModel } from '../../models/SecretariaModel';

export default function CreateSecretariaDialog(){

    const [secretariaData, setSecretariaData] = useState<SecretariaModel>({cpf: "", name: ""});
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSecretariaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Dados da secretária:", secretariaData);
    };
    
    return (
        <DialogContent className="bg-[#4845D2]/20 backdrop-blur-sm shadow-md text-white border-none">
            <DialogHeader>
            <DialogTitle>Nova Secretária</DialogTitle>
            <DialogDescription>Preencha com os dados necessários</DialogDescription>
            <form onSubmit={handleSubmit} className="items-center">
                <div className="flex flex-col mt-4">
                <label htmlFor="name" className="flex items-center gap-2">
                    <User className="text-white" size={16} />
                    Nome Completo
                </label>
                <input
                    type="text"
                    className="rounded-sm px-2 py-1 border border-neutral-300"
                    name="name"
                    id="name"
                    placeholder="Lorem Ipsum"
                    value={secretariaData.name}
                    onChange={handleInputChange}
                />
                </div>

                <div className="flex flex-col mt-4">
                <label htmlFor="cpf" className="flex items-center gap-2">
                    <FileText className="text-white" size={16} />
                    CPF
                </label>
                <input
                    type="text"
                    className="rounded-sm px-2 py-1 border border-neutral-300"
                    name="cpf"
                    id="cpf"
                    placeholder="xxx.yyy.zzz-xy"
                    value={secretariaData.cpf}
                    onChange={handleInputChange}
                />
                </div>

                <Button type="submit" className="mt-4 bg-[#4845D2] hover:bg-[#4845D250] text-white">
                Enviar
                </Button>
            </form>
            </DialogHeader>
        </DialogContent>
    );
}