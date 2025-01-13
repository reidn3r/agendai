import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

export default function Secretaria(){

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login")    
    }
      
    return(
        <>
           <nav className="navbar bg-slate-900">
                <div className="navbar-left">
                    <button
                        onClick={() => navigate(-1)} // Navega para a página anterior
                        className="btn btn-navbar"
                        >◄
                    </button>
                    <h1 className="navbar-title">AGI</h1>
                    </div>

                    <div className="navbar-right">
                    <button onClick={handleLogin} className="btn btn-navbar">
                        Log in 
                    </button>
                    <button onClick={() => alert("Info")} className="btn btn-navbar">
                        Info
                    </button>
                </div>
            </nav>

            <div className="bg-slate-950 main-content">
                <div className="main-blocks w-full">
                    <div className="block">
                        <h1 className="text-9xl pb-2">AGI</h1>
                        <h4 className="text-xl text-slate-300">Agendamentos Inteligentes</h4>
                    </div>

                    
                    <div className="text-white flex items-center">
                        <div className="flex flex-col">
                            <button onClick={handleLogin} className="btn btn-navbar">
                                Log in 
                            </button>
                            <button onClick={() => alert("Info")} className="btn btn-navbar">
                                Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}