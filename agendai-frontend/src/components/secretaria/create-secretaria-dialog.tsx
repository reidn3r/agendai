import { User, FileText, MailCheck, LockIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { SecretariaModel } from '../../models/SecretariaModel';
import axios from 'axios';

export default function CreateSecretariaDialog({ secretarias, setSecretarias, isDialogOpen, setIsDialogOpen } :
    { 
        setSecretarias: (data:SecretariaModel[]) => void,
        secretarias : SecretariaModel[],
        setIsDialogOpen: (data:boolean) => void,
        isDialogOpen : boolean
    }){

    const [secretariaData, setSecretariaData] = useState<SecretariaModel>(
        {
            id: "",
            cpf: "",
            name: "",
            email: "",
            password: "",
        });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSecretariaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...secretariaData,
            type: "SECRETARIA"
        }
        const response = await axios.post("http://localhost:8080/professional/create", payload);
        if(response.status === 201){
            //Atualiza a lista em tela
            setSecretarias([
                ...secretarias,
                payload
            ])
            setIsDialogOpen(false);
        }
        else{
            alert("Erro ao criar nova secretária");
        }
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
                    className="rounded-sm px-2 py-1 border border-neutral-300 text-black"
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
                    className="rounded-sm px-2 py-1 border border-neutral-300 text-black"
                    name="cpf"
                    id="cpf"
                    placeholder="xxx.yyy.zzz-xy"
                    value={secretariaData.cpf}
                    onChange={handleInputChange}
                />
                </div>
                <div className="flex flex-col mt-4">
                <label htmlFor="cpf" className="flex items-center gap-2">
                    <MailCheck className="text-white" size={16} />
                    Email
                </label>
                <input
                    type="email"
                    className="rounded-sm px-2 py-1 border border-neutral-300 text-black"
                    name="email"
                    id="email"
                    placeholder="exemplo@email.com"
                    value={secretariaData.email}
                    onChange={handleInputChange}
                />
                </div>
                <div className="flex flex-col mt-4">
                <label htmlFor="password" className="flex items-center gap-2">
                    <LockIcon className="text-white" size={16} />
                    Senha
                </label>
                <input
                    type="password"
                    className="rounded-sm px-2 py-1 border border-neutral-300 text-black"
                    name="password"
                    id="password"
                    placeholder="*****"
                    value={secretariaData.password}
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