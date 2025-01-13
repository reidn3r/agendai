import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import Navbar from "@/components/navbar";

export default function Home(){

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login")    
    }
      
    return(
        <>
            <div className="bg-slate-950 main-content">
                <div className="main-blocks w-full">
                    <div className="block">
                        <h1 className="text-9xl pb-2">AGI</h1>
                        <h4 className="text-xl text-slate-300">Agendamentos Inteligentes</h4>
                    </div>
                </div>
            </div>
        </>
    )
}