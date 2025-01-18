import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RootLayout from "./layouts/root-layout";
import Secretaria from "./pages/Secretaria";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
        <RootLayout>
        <div className="bg-[#18181B] w-full min-h-screen text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/secretaria" element={<Secretaria />} />
          </Routes>
        </div>
        </RootLayout>
    </BrowserRouter>
  );
}
