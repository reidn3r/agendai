import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

export default function Home(){

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login")    
    }

    const handleHome = () => {
        navigate("/home")    
    }

    const handleAction = (action) => {
        alert(`You clicked ${action}`);
      };
      
    return(
        <>
           <nav className="navbar bg-slate-900">
                <div className="navbar-left">
                    <button
                        onClick={() => navigate(-1)} // Navega para a página anterior
                        className="btn btn-navbar"
                        >◄
                    </button>
                    <h1 className="navbar-title">Agendai</h1>
                    </div>

                    <div className="navbar-right">
                    <button onClick={() => handleAction("Create")} className="btn btn-navbar">
                        Consultas 
                    </button>
                    <button onClick={() => handleAction("Read")} className="btn btn-navbar">
                        Pacientes
                    </button>
                </div>
            </nav>

            <div className="bg-slate-950 main-content">
                <div>
                    <h1 className="text-9xl pb-2">AGI</h1>
                    <h4 className="text-xl text-slate-300">Agendamentos Inteligentes</h4>
                </div>
            </div>
        </>
    )
}