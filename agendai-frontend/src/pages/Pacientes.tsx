import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"

import HelloHeader from "@/components/hello-header";
import PatientCard from "@/components/patient/patient-card";
import CreatePatientDialog from "@/components/patient/create-patient-dialog";
import GradientBackground from "@/components/ui/gradient-background";
import { useEffect, useState } from "react";
import { PatientModel } from "@/models/PatientModel";
import { user } from "@/layouts/root-layout";
import axios from 'axios';


export default function Pacientes() {

    const [patients, setPatients] = useState<PatientModel[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<PatientModel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const patientLength:number = patients.length;

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:8080/patient/list");
                console.log(response.data);
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
                    <input
                        type="text"
                        id="searchBar"
                        placeholder="Pesquisar por nome ou CPF"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="my-4 px-4 py-2 border rounded-lg shadow-sm w-3/4 text-black focus:outline-none focus:ring-2 focus:ring-[#4845D2]"
                    />

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
                                name={patient.nome}
                                cpf={patient.cpf}
                                Patients={[]}
                                setPatients={function (data: PatientModel[]): void {
                                    throw new Error("Function not implemented.");
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </GradientBackground>
    );
}