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
            <nav className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold">Menu Rápido</h1>
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
        </>
    )
}