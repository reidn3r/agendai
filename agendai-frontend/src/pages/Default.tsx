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
    return(
        <>
            <p className="bg-red-300">Página Padrão</p>
            <Button
                onClick={handleLogin}
            >Ir para Login</Button>
            <Button
                onClick={handleHome}
            >Ir para Home</Button>
        </>
    )
}