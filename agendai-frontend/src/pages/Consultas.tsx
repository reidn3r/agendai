
import HelloHeader from "@/components/hello-header";
import ConsultationCard from "@/components/consultation/consultation-card";
import GradientBackground from "@/components/ui/gradient-background";
import { ConsultationModel } from "@/models/ConsultationModel";
import { useEffect, useState } from "react";
import axios from 'axios';
import { user } from "@/layouts/root-layout";

export default function Notificacoes(){

    const [consultations, setNotifications] = useState<ConsultationModel[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await axios.get("http://localhost:8080/consultation/list");
            setNotifications(response.data);
        }
        fetchNotifications();
    })

    return (
        <GradientBackground firstColor="bg-[#4845D250]" secondColor="bg-[#4845D250]">
            <div>
                <HelloHeader
                    username={user.nome}
                    message="Aqui está a lista de notificações enviadas"
                />
                <div className="flex flex-col items-center justify-center">
                    <p className="my-16">
                        {consultations.length === 0 ? (
                            <>Ainda <span className="text-red-700">não foram</span> enviadas notificações.</>
                        ) : (
                            <>No momento, existem <span className="text-[#006FEE] font-bold">{consultations.length}</span> consultas agendadas.</>
                        )}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {consultations.map((consultation) => (
                            <ConsultationCard key={consultation.id} consultation={consultation} />
                        ))}
                    </div>
                </div>
            </div>
        </GradientBackground>
    );
}