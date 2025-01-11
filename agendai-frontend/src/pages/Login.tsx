
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/Home")    
    }
    return(
        <>
            <p className="bg-neutral-300">Pagina de Login</p>
            <Button
                onClick={handleClick}
            >Ir para Home</Button>
        </>
    )
}