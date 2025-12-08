import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Login from "./pages/Login";
import RootLayout from "./layouts/root-layout";
import Secretaria from "./pages/Secretaria";
import Home from "./pages/Home";
import Notificacoes from "./pages/Notificacoes";
import Consultas from "./pages/Consultas";
import Pacientes from "./pages/Pacientes";
import CreatePaciente from "./pages/CreatePaciente";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas - sem autenticação */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas - apenas ADMIN */}
          <Route
            path="/secretaria"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <RootLayout>
                  <div className="bg-[#18181B] w-full min-h-screen text-white">
                    <Secretaria />
                  </div>
                </RootLayout>
              </ProtectedRoute>
            }
          />

          {/* Rotas protegidas - ADMIN e SECRETARIA */}
          <Route
            path="/notificacoes"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SECRETARIA"]}>
                <RootLayout>
                  <div className="bg-[#18181B] w-full min-h-screen text-white">
                    <Notificacoes />
                  </div>
                </RootLayout>
              </ProtectedRoute>
            }
          />

          {/* Rotas protegidas - apenas SECRETARIA */}
          <Route
            path="/pacientes"
            element={
              <ProtectedRoute allowedRoles={["SECRETARIA"]}>
                <RootLayout>
                  <div className="bg-[#18181B] w-full min-h-screen text-white">
                    <Pacientes />
                  </div>
                </RootLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-paciente"
            element={
              <ProtectedRoute allowedRoles={["SECRETARIA"]}>
                <RootLayout>
                  <div className="bg-[#18181B] w-full min-h-screen text-white">
                    <CreatePaciente />
                  </div>
                </RootLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/consultas"
            element={
              <ProtectedRoute allowedRoles={["SECRETARIA"]}>
                <RootLayout>
                  <div className="bg-[#18181B] w-full min-h-screen text-white">
                    <Consultas />
                  </div>
                </RootLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}