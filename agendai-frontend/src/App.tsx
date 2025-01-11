import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Default from "./pages/Default";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Default/> } />
        <Route path="/home" element={ <Home/> } />
        <Route path="/login" element= { <Login /> }/>
      </Routes>
    </BrowserRouter>
  )
}
