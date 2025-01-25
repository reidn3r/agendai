import { useState } from "react";
import axios from "axios";

export default function CreatePaciente() {
  const [nome, setNome] = useState(""); 
  const [dataNascimento, setDataNascimento] = useState(""); 
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const handleDataNascimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataNascimento(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5173/patient/create", {
        nome,
        dataNascimento,
        email,
        cpf,
        telefone,
      });
      alert("Paciente criado com sucesso!");
    } catch (error) {
      alert("Erro ao criar paciente.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg">
      <h2 className="text-2xl text-center text-white mb-4">Criar Paciente</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-white">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={handleNomeChange}
            placeholder="Digite o nome"
            className="w-full p-2 mt-2 border border-gray-600 rounded-lg text-white bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dataNascimento" className="block text-white">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            value={dataNascimento}
            onChange={handleDataNascimentoChange}
            placeholder="dd/mm/aaaa"
            className="w-full p-2 mt-2 border border-gray-600 rounded-lg text-white bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-white">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o email"
            className="w-full p-2 mt-2 border border-gray-600 rounded-lg text-white bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cpf" className="block text-white">CPF</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite o CPF"
            className="w-full p-2 mt-2 border border-gray-600 rounded-lg text-white bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="telefone" className="block text-white">Telefone</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Digite o telefone"
            className="w-full p-2 mt-2 border border-gray-600 rounded-lg text-white bg-gray-700"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Criar Paciente
          </button>
        </div>
      </form>
    </div>
  );
}
