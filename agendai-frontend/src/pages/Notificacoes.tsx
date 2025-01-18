
import HelloHeader from "@/components/hello-header";
import NotificationCard from "@/components/notification/notification-card";
import GradientBackground from "@/components/ui/gradient-background";
import { NotificationModel } from "@/models/NotificationModel";

export default function Notificacoes(){
    const notification:NotificationModel = {
        message: "Teste de mensaagem",
        to: "rdn.adn00@gmail.com"
    }

    const notificacoesLength:number = 5;

    return(
        <GradientBackground
            firstColor="bg-[#4845D250]"
            secondColor="bg-[#4845D250]"
            >
            <div>
                <HelloHeader
                    username="Lorem"
                    message="Aqui está a lista de notificações enviadas"
                />

                <div className="flex flex-col items-center justify-center">
                    <p className="my-16">
                        {notificacoesLength === 0 ? (
                        <> Ainda <span className="text-red-700">não foram</span> enviadas notificacoes. </>
                        ) : (
                        <>Até o momento, foram enviadas <span className="text-[#006FEE] font-bold">{notificacoesLength}</span> notificacoes </>
                        )}
                    </p>

                    {/* Renderizar lista de notificacoes iterativamente */}
                    <div className="grid grid-cols-3 gap-2 px-8 py-4 rounded-md border border-neutral-800/50 shadow-md bg-black/50 backdrop-blur-lg">
                        <NotificationCard 
                            notification={notification}
                        />
                </div>
            </div>
        </div>
    </GradientBackground>
    )
}