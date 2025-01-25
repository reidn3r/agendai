import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RootLayout from "./layouts/root-layout";
import Secretaria from "./pages/Secretaria";
import Home from "./pages/Home";
import Notificacoes from "./pages/Notificacoes";
import Pacientes from "./pages/Pacientes";
import CreatePaciente from "./pages/CreatePaciente";  // Importe o arquivo CreatePaciente.tsx

export default function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <div className="bg-[#18181B] w-full min-h-screen text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/secretaria" element={<Secretaria />} />
            <Route path="/notificacoes" element={<Notificacoes />} />
            <Route path="/pacientes" element={<Pacientes />} />
            
            <Route path="/create-paciente" element={<CreatePaciente />} />
          </Routes>
        </div>
      </RootLayout>
    </BrowserRouter>
  );
}
