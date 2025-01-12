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
            <nav className="navbar">
                <h1>Agendai</h1>
                <div className="space-x-4">
                    <button
                    onClick={() => handleAction("Create")}
                    className="btn btn-navbar"
                    >
                    Create
                    </button>
                    <button
                    onClick={() => handleAction("Read")}
                    className="btn btn-navbar"
                    >
                    Read
                    </button>
                    <button
                    onClick={() => handleAction("Update")}
                    className="btn btn-navbar"
                    >
                    Update
                    </button>
                    <button
                    onClick={() => handleAction("Delete")}
                    className="btn btn-navbar"
                    >
                    Delete
                    </button>
                </div>
            </nav>

            <div className="bg-slate-950">
                <h1 className="text-white text-5xl main-content">Bem-vindo ao sistema</h1>
                <p>Este é o conteúdo principal abaixo da barra de navegação.</p>
      </div>
        </>
    )
}