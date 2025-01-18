import { Link } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";

export default function Navbar() {
    return (
        <nav className="bg-[#09090b] h-16 px-4 flex items-center border-b border-slate-800">
            <div className="w-10">
                <SidebarTrigger className="hover:bg-slate-800 p-2 rounded-lg text-white" />
            </div>
            <div className="mx-auto">
                <Link
                    to={"/"}
                >
                    <img src="https://img.logoipsum.com/250.svg" alt="" />
                </Link>
                {/* <h1 className="text-xl font-bold text-white">Logo</h1> */}
            </div>
        </nav>
    )
}