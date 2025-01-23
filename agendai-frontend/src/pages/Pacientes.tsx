import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"

import HelloHeader from "@/components/hello-header";
import PatientCard from "@/components/patient/patient-card";
import GradientBackground from "@/components/ui/gradient-background";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Pacientes() {

    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:5173/patient/list");
                setPatients(response.data);
                setFilteredPatients(response.data);
            } catch (error) {
                alert("Erro ao buscar pacientes:");
            }
        };
        fetchPatients();
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = patients.filter((patient) =>
            patient.name.toLowerCase().includes(term) ||
            patient.cpf.includes(term)
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
                    username="Lorem"
                    message="Aqui está a lista de pacientes cadastrados"
                />

                <div className="flex flex-col items-center justify-center">
                    <input
                        type="text"
                        placeholder="Pesquisar por nome ou CPF"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="my-4 px-4 py-2 text-black border rounded-lg shadow-sm w-3/4 focus:outline-none focus:ring-2 focus:ring-[#4845D2]"
                    />

                    <p className="my-8">
                        {filteredPatients.length === 0 ? (
                            <>Ainda <span className="text-red-700">não há</span> pacientes ou nenhum resultado encontrado.</>
                        ) : (
                            <>No momento, temos <span className="text-[#006FEE] font-bold">{filteredPatients.length}</span> pacientes encontrados</>
                        )}
                    </p>

                    {/* Renderizar lista de pacientes filtrados */}
                    {filteredPatients.map((patient) => (
                        <PatientCard
                            key={patient.cpf}
                            cpf={patient.cpf}
                            name={patient.name}
                            address={patient.address}
                        />
                    ))}
                </div>
            </div>
        </GradientBackground>
    );
}
