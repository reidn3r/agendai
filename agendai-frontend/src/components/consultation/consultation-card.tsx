import { ConsultationModel } from "@/models/ConsultationModel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

import { Trash, User } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

export default function ConsultationCard({ consultation }: { consultation: ConsultationModel }) {

    const deleteConsultation = async () => {
        const response = await axios.get("http://localhost:8080/consultation/list");
        setNotifications(response.data);
    }

    return (
    <div className="flex flex-row items-center p-4 my-2 rounded-md shadow-lg border border-neutral-950/50 bg-[#171717] hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-neutral-800 rounded-full">
                <User className="text-white" size={24} />
            </div>

            <div className="flex flex-col mx-4 flex-grow">
                <p className="font-bold text-white text-lg"> {consultation.patientName || "Nome não informado"} </p>
                <p className="text-sm text-neutral-400">DATA: {(new Date(consultation.data)).toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}) || "Data não informada"} </p>
            </div>

            <AlertDialog>
                <AlertDialogTrigger>
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-neutral-800 hover:bg-red-800 hover:text-white rounded-md transition-colors duration-300"
                    >
                        <Trash size={18} />
                        Deletar
                    </button>
                </AlertDialogTrigger>
                {/* <DeleteConsultaDialog onConfirm={onConfirm} /> */}
            </AlertDialog>
        </div>
    );
}