import { useNavigate } from "react-router-dom";

export type UserType = {

    type: "NONE" | "SECRETARIA" | "ADM",
    nome: "Zilda"
}

export default function Navbar({ user } : { user: UserType }){

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login")    
    }

      
    return(
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
                    { user.type === "NONE" && (
                        <>
                            <button onClick={handleLogin} className="btn btn-navbar">
                                Log in 
                            </button>
                            <button onClick={() => alert("Info")} className="btn btn-navbar">
                                Info
                            </button>
                        </>
                    )}
                    { user.type === "SECRETARIA" && (
                        <>
                            <button onClick={handleLogin} className="btn btn-navbar">
                                Pacientes
                            </button>
                            <button onClick={() => alert("Consultas")} className="btn btn-navbar">
                                Consultas
                            </button>
                            <button onClick={() => alert("Log out")} className="btn btn-navbar">
                                Log out
                            </button>
                        </>
                    )}
                    { user.type === "ADM" && (
                        <>
                            <button onClick={handleLogin} className="btn btn-navbar">
                                Coisas de ADM
                            </button>
                            <button onClick={() => alert("Info")} className="btn btn-navbar">
                                Info
                            </button>
                            <button onClick={() => alert("Log out")} className="btn btn-navbar">
                                Log out
                            </button>
                        </>
                    )}
                </div>
            </nav>
    )
}