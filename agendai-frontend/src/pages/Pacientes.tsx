import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"

import HelloHeader from "@/components/hello-header";
import PatientCard from "@/components/patient/patient-card";
import CreatePatientDialog from "@/components/patient/create-patient-dialog";
import GradientBackground from "@/components/ui/gradient-background";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PatientModel } from "@/models/PatientModel";
import { user } from "@/layouts/root-layout";
import axios from 'axios';


export default function Pacientes() {

    const navigate = useNavigate();
    const [patients, setPatients] = useState<PatientModel[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<PatientModel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const patientLength:number = patients.length;

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:8080/patient/list");
                setPatients(response.data);
                setFilteredPatients(response.data);
            } catch (error) {
                alert("Erro ao buscar pacientes:");
            }
        };
        fetchPatients();
    }, []);

    const handleSearch = (event:any) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = patients.filter((patient) =>
            patient.nome.toLowerCase().includes(term) ||
            patient.id.includes(term)
        );
        setFilteredPatients(filtered);
    };

    return (
        <GradientBackground
            firstColor="bg-[#4845D250]"
            secondColor="bg-[#4845D250]"
        >
            <div>
                <HelloHeader
                    username={user.nome}
                    message="Aqui está a lista de pacientes cadastrados"
                />

                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col md:flex-row w-3/4 items-center justify-between mb-4">
                            <input
                                type="text"
                                id="searchBar"
                                placeholder="Pesquisar por nome ou CPF"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="px-4 py-2 border rounded-lg shadow-sm w-full md:w-2/3 text-black focus:outline-none focus:ring-2 focus:ring-[#4845D2]"
                            />
                            <button
                                onClick={() => navigate("/create-paciente")}
                                className="mt-2 md:mt-0 md:ml-4 bg-[#4845D2] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#3732A5] transition"
                            >
                                Criar Paciente
                            </button>
                        </div>

                    <p className="my-8">
                        {filteredPatients.length === 0 ? (
                            <>Ainda <span className="text-red-700">não há</span> pacientes ou nenhum resultado encontrado.</>
                        ) : (
                            <>No momento, temos <span className="text-[#006FEE] font-bold">{filteredPatients.length}</span> pacientes encontrados</>
                        )}
                    </p>

                    {/* Renderizar lista de pacientes filtrados */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
                        {Array.isArray(filteredPatients) && filteredPatients.map((patient) => (
                            <PatientCard
                                key={patient.id}
                                id={patient.id}
                                name={patient.nome}
                                cpf={patient.cpf}
                                Patients={patients}
                                setFilteredPatients={setFilteredPatients}
                                setPatients={setPatients}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </GradientBackground>
    );
}