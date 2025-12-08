import HelloHeader from "@/components/hello-header";
import ConsultationCard from "@/components/consultation/consultation-card";
import GradientBackground from "@/components/ui/gradient-background";
import CreateConsultationDialog from "@/components/consultation/create-consultation-dialog"; // Importe o modal
import { ConsultationModel } from "@/models/ConsultationModel";
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { user } from "@/layouts/root-layout";

export default function Consultas(){

    const [consultations, setConsultations] = useState<ConsultationModel[]>([]);

    const fetchConsultations = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/consultation/list");
            setConsultations(response.data);
        } catch (error) {
            console.error("Erro ao buscar consultas", error);
        }
    }, []);

    useEffect(() => {
        fetchConsultations();
    }, [fetchConsultations]);

    return (
        <GradientBackground firstColor="bg-[#4845D250]" secondColor="bg-[#4845D250]">
            <div>
                <HelloHeader
                    username={user.nome}
                    message="Aqui está a lista de consultas marcadas"
                />
                
                <div className="flex flex-col items-center justify-center px-4">
                    
                    {/* Cabeçalho da Lista com Botão de Adicionar */}
                    <div className="w-full max-w-5xl flex justify-between items-center mt-8 mb-4">
                        <h2 className="text-xl font-bold text-white">Consultas</h2>
                        {/* Passamos a função de recarregar para o modal */}
                        <CreateConsultationDialog onSuccess={fetchConsultations} />
                    </div>

                    <p className="mb-8 text-neutral-300">
                        {consultations.length === 0 ? (
                            <>Ainda <span className="text-red-700 font-bold">não foram</span> criadas consultas.</>
                        ) : (
                            <>No momento, existem <span className="text-[#006FEE] font-bold">{consultations.length}</span> consultas agendadas.</>
                        )}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
                        {consultations.map((consultation) => (
                            <ConsultationCard key={consultation.id} consultation={consultation} />
                        ))}
                    </div>
                </div>
            </div>
        </GradientBackground>
    );
}