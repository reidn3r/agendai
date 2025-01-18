import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"

import HelloHeader from "@/components/hello-header";
import SecretariaCard from "@/components/secretaria/secretaria-card";
import CreateSecretariaDialog from "@/components/secretaria/create-secretaria-dialog";
import GradientBackground from "@/components/ui/gradient-background";
import { useEffect, useState } from "react";
import { SecretariaModel } from "@/models/SecretariaModel";
import axios from 'axios';


export default function Secretaria(){

    const [secretarias, setSecretarias] = useState<SecretariaModel[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const secretariasLength:number = secretarias.length;

    useEffect(() => {
        const fetchSecretarias = async () => {
            try {
                const response = await axios.get("http://localhost:8080/professional/list/secretary");
                setSecretarias(response.data);
            } catch (error) {
                alert("Erro ao buscar secretárias:");
            }
            };
            fetchSecretarias();
    }, []);

    return(
        <GradientBackground
            firstColor="bg-[#4845D250]"
            secondColor="bg-[#4845D250]"
            >
            <div>
                <HelloHeader
                    username="Lorem"
                    message="Aqui está a lista de secretárias cadastrados"
                />

                <div className="flex flex-col items-center justify-center">
                    <p className="my-16">
                        {secretariasLength === 0 ? (
                        <>
                            Ainda <span className="text-red-700">não há</span> secretárias registradas. Que tal registrar a primeira?
                        </>
                        ) : (
                        <>No momento, temos <span className="text-[#006FEE] font-bold">{secretariasLength}</span> secretárias cadastradas</>
                        )}
                    </p>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger>
                            <p className="px-4 py-2 my-4 font-medium text-sm bg-[#4845D2] rounded-md shadow-md">Adicionar nova secretária</p>
                        </DialogTrigger>
                        <CreateSecretariaDialog
                            secretarias={secretarias}
                            isDialogOpen={isDialogOpen}
                            setIsDialogOpen={setIsDialogOpen}
                            setSecretarias={setSecretarias}
                        />
                    </Dialog>
                    
                    {/* Renderizar lista de secretárias cadastradas iterativamente */}
                    {secretarias.map((secretaria) => (
                        <SecretariaCard 
                            cpf={secretaria.cpf}
                            nome={secretaria.name}
                            secretarias={secretarias}
                            setSecretarias={setSecretarias}
                        />
                    ))}
                </div>
            </div>
    </GradientBackground>
    )
}