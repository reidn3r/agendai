import { Button } from "@/components/ui/button";
import GradientBackground from "@/components/ui/gradient-background";
import { Mail, LockIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "@/layouts/root-layout";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault(); 

    user.nome = "Renato Balancieri"
    user.type = formData.email === "admin@email.com" ? "ADMIN" : "SECRETARIA";

    const route:string = user.type === "ADMIN" ? "/secretaria" : "/consultas"
    navigate(route);
  }

  return (
    <GradientBackground
      firstColor="bg-[#006FEE]"
      secondColor="bg-[#AE7EDE]"
    >
      <div className="flex justify-center items-center h-screen w-full relative">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

        <form 
          onSubmit={onSubmit}
          className="relative px-12 py-8 rounded-lg shadow-lg border border-white/10 bg-[#002E6250]"
        >
          <div className="p-4 flex flex-col items-center">
            <p className="font-bold text-white text-lg">Login</p>
            <p className="font-bold text-neutral-300">Inicie sua sessão aqui!</p>
          </div>
    
          <div className="flex flex-col space-y-4">
            {/* Campo de E-mail */}
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-neutral-300">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                <input
                  className="w-full pl-10 p-2 border border-neutral-500 rounded-md bg-white/10 text-white placeholder:text-neutral-400"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Campo de Senha */}
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-neutral-300">Senha</label>
              <div className="relative mt-1">
                <LockIcon className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                <input
                  className="w-full pl-10 p-2 border border-neutral-500 rounded-md bg-white/10 text-white placeholder:text-neutral-400"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="*****"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="bg-[#4845D2] text-white hover:bg-[#4845D250] py-2 rounded-md"
            >
              Entrar
            </Button>

            <div className="mt-4 text-neutral-400">
              <p>O único agendamento inteligente de horários!</p>
            </div>
          </div>
        </form>
      </div>
    </GradientBackground>
  );
}