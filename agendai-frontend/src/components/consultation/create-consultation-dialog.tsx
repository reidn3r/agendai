import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Calendar, User, Stethoscope } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Ajuste import conforme sua biblioteca UI
import { useAuth } from "@/context/AuthContext";


interface Props {
    onSuccess: () => void; // Função para recarregar a lista após criar
}

// Interfaces auxiliares para os selects
interface GenericMedic { id: string; name: string; }
interface GenericPatients { id: string; nome: string; }

export default function CreateConsultationDialog({ onSuccess }: Props) {
    const { user } = useAuth();

    if (!user) return;

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Dados para os selects
    const [medics, setMedics] = useState<GenericMedic[]>([]);
    const [patients, setPatients] = useState<GenericPatients[]>([]);

    // Form State
    const [date, setDate] = useState("");
    const [selectedMedic, setSelectedMedic] = useState("");
    const [selectedPatient, setSelectedPatient] = useState("");

    // Carregar Médicos e Pacientes ao abrir o modal (ou ao montar)
    useEffect(() => {
        // MOCKS: Substitua pelos endpoints reais da sua API
        axios.get("http://localhost:8080/list/medic").then(res => setMedics(res.data));
        axios.get("http://localhost:8080/patient/list").then(res => setPatients(res.data));
        
        // Exemplo temporário para funcionar visualmente:
        // setMedics([{id: "uuid-med-1", name: "Dr. House"}, {id: "uuid-med-2", name: "Dra. Grey"}]);
        // setPatients([{id: "uuid-pat-1", name: "João Silva"}, {id: "uuid-pat-2", name: "Maria Oliveira"}]);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                date: new Date(date).toISOString().replace("Z", ""),
                secretaryId: user.id, // ID da secretária logada
                medicId: selectedMedic,
                patientId: selectedPatient
            };

            console.log("\n\n\n\n\n\n" + user.id + "\n\n\n\n\n\n\n");

            await axios.post("http://localhost:8080/consultation/create", payload);
            
            setOpen(false); // Fecha o modal
            setDate("");
            setSelectedMedic("");
            setSelectedPatient("");
            onSuccess(); // Atualiza a lista pai
        } catch (error) {
            console.error("Erro ao criar consulta:", error);
            alert("Erro ao criar consulta. Verifique o console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-[#4845D2] text-white px-4 py-2 rounded-md hover:bg-[#3b38b0] transition-colors font-semibold shadow-md">
                    <Plus size={20} />
                    Nova Consulta
                </button>
            </DialogTrigger>
            <DialogContent className="bg-[#171717] border-neutral-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Agendar Consulta</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    
                    {/* Input de Data */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                            <Calendar size={16} /> Data e Hora
                        </label>
                        <input 
                            type="datetime-local" 
                            required
                            className="bg-neutral-900 border border-neutral-700 rounded-md p-2 text-white focus:outline-none focus:border-[#4845D2]"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    {/* Select Médico */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                            <Stethoscope size={16} /> Médico
                        </label>
                        <select 
                            required
                            className="bg-neutral-900 border border-neutral-700 rounded-md p-2 text-white focus:outline-none focus:border-[#4845D2]"
                            value={selectedMedic}
                            onChange={(e) => setSelectedMedic(e.target.value)}
                        >
                            <option value="" disabled>Selecione um médico</option>
                            {medics.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Select Paciente */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                            <User size={16} /> Paciente
                        </label>
                        <select 
                            required
                            className="bg-neutral-900 border border-neutral-700 rounded-md p-2 text-white focus:outline-none focus:border-[#4845D2]"
                            value={selectedPatient}
                            onChange={(e) => setSelectedPatient(e.target.value)}
                        >
                            <option value="" disabled>Selecione um paciente</option>
                            {patients.map(p => (
                                <option key={p.id} value={p.id}>{p.nome}</option>
                            ))}
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="mt-4 bg-[#4845D2] hover:bg-[#3b38b0] text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
                    >
                        {loading ? "Agendando..." : "Confirmar Agendamento"}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}