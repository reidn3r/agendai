
import HelloHeader from "@/components/hello-header";
import NotificationCard from "@/components/notification/notification-card";
import GradientBackground from "@/components/ui/gradient-background";
import { NotificationModel } from "@/models/NotificationModel";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Notificacoes(){

    const [notifications, setNotifications] = useState<NotificationModel[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await axios.get("http://localhost:8080/notifications/list");
            setNotifications(response.data);
        }
        fetchNotifications();
    })

    return (
        <GradientBackground firstColor="bg-[#4845D250]" secondColor="bg-[#4845D250]">
            <div>
                <HelloHeader
                    username="Lorem"
                    message="Aqui está a lista de notificações enviadas"
                />
                <div className="flex flex-col items-center justify-center">
                    <p className="my-16">
                        {notifications.length === 0 ? (
                            <>Ainda <span className="text-red-700">não foram</span> enviadas notificações.</>
                        ) : (
                            <>Até o momento, foram enviadas <span className="text-[#006FEE] font-bold">{notifications.length}</span> notificações.</>
                        )}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notifications.map((notification) => (
                            <NotificationCard key={notification.id} notification={notification} />
                        ))}
                    </div>
                </div>
            </div>
        </GradientBackground>
    );
}