import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const navigate = useNavigate();

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
                    <button onClick={() => navigate("/login")} className="btn btn-navbar">
                        Log in 
                    </button>
                    <button onClick={() => alert("Info")} className="btn btn-navbar">
                        Info
                    </button>
                </div>
            </nav>

            <div className="bg-slate-950 main-content">
                <div className="login-container">
                <h1 className="text-4xl pb-4 text-white">Login</h1>
                <form className="login-form">
                    <div className="form-group">
                    <label htmlFor="email" className="text-white block mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu email"
                        className="input-field"
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password" className="text-white block mb-2">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        className="input-field"
                        required
                    />
                    </div>
                    <Button type="submit" className="btn btn-primary w-full mt-4">
                    Entrar
                    </Button>
                </form>
                </div>
            </div>
        </>
    )
}