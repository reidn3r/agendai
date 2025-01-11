import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home(){

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login")    
    }
    return(
        <>
            <p className="bg-blue-300">Página Principal</p>
            <Button
                onClick={handleClick}
            >Ir para Login</Button>
        </>
    )
}