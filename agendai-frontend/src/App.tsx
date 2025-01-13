import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Secretaria";
import Login from "./pages/Login";
import Default from "./pages/Default";
import Navbar, { UserType } from "./components/navbar";

export default function App() {

  const user: UserType = {
    nome: "Zilda",
    type: "SECRETARIA"
  }

  return (
    <BrowserRouter>
      <Navbar user={user} /> 
      <Routes>
        <Route path="/" element={ <Default/> } />
        <Route path="/login" element= { <Login /> }/>
        <Route path="/secretaria" element={ <Home/> } />
      </Routes>
    </BrowserRouter>
  )
}
