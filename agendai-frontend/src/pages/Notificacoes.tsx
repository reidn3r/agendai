
import HelloHeader from "@/components/hello-header";
import SecretariaCard from "@/components/secretaria/secretaria-card";
import GradientBackground from "@/components/ui/gradient-background";

export default function Notificacoes(){
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
                        <> Ainda <span className="text-red-700">não há</span> registro de notificacoes. </>
                        ) : (
                        <>Até o momento, foram enviadas <span className="text-[#006FEE] font-bold">{notificacoesLength}</span> notificacoes </>
                        )}
                    </p>

                    {/* Renderizar lista de notificacoes iterativamente */}
                    {/* Criar Componente Para Notificacoes */}
                    <SecretariaCard 
                        cpf="000.111.222-33"
                        nome="Nome"
                    />

                </div>
            </div>
    </GradientBackground>
    )
}