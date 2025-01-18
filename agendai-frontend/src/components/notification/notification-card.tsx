import { NotificationModel } from "@/models/NotificationModel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function NotificationCard({ notification }: { notification: NotificationModel }) {
    return (
    <div className="flex flex-col gap-4 p-4 my-2 rounded-md shadow-lg border border-neutral-950/50 bg-[#171717]">
        <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
            <p className="font-bold text-md text-white">{notification.message}</p>
            {notification.tipo && (
            <span className="text-xs text-neutral-400">{notification.tipo}</span>
            )}
        </div>
        </div>

        <div className="mt-2">
            <Accordion type="multiple" className="w-full">
                <AccordionItem value="patients-list">
                <AccordionTrigger>Enviado para</AccordionTrigger>
                <AccordionContent>
                    {notification.patients.length > 0 ? (
                    <ul className="pl-4 list-disc text-neutral-300">
                        {notification.patients.map((patient) => (
                        <li key={patient.id} className="text-sm">
                            {patient.name} ({patient.email})
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p className="text-sm text-neutral-500">Nenhum paciente associado a esta notificação.</p>
                    )}
                </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </div>
    );
}