import { AuroraBackground } from "@/components/ui/aurora-background"
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Home() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Redirecionar usuários autenticados para suas páginas apropriadas
    useEffect(() => {
        if (user && user.type !== "NONE") {
            const route = user.type === "ADMIN" ? "/secretaria" : "/pacientes";
            navigate(route);
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen w-full">
            <AuroraBackground className="min-h-screen">
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex flex-col items-center justify-center min-h-screen w-full px-4"
                >
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-7xl font-bold pb-2 text-white">
                            Agend<span className="text-[#A5B4FC]">AI</span>
                        </h1>
                        <h4 className="text-md font-semibold my-4 text-slate-300">
                            Saúde em primeiro lugar com agendamentos <span className="text-[#A5B4FC]">eficientes</span>
                        </h4>
                        <Button 
                            className="bg-[#4845D2] text-white"
                            onClick={() => { navigate("/login") }}>
                            Entrar Agora
                        </Button>
                    </div>
                </motion.div>
            </AuroraBackground>
        </div>
    );
}