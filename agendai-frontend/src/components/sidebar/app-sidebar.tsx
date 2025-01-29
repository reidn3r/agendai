import { Home, Users, Settings, LogOut, CrossIcon, BellIcon } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter
} from "@/components/ui/sidebar"
import { Link, useNavigate } from "react-router-dom"

type AppSidebarProps = {
    user: {
        type: "ADMIN" | "SECRETARIA" | "NONE"
        nome: string
    }
}


export function AppSidebar({ user }: AppSidebarProps) {
    
    //Componente que deve ser renderizado apenas se o usuário estiver autenticado

    const navigate = useNavigate()

    const getMenuItems = () => {
        switch (user.type) {
            case "ADMIN":
            return [
                {
                    title: "Secretárias",
                    url: "/secretaria",
                    icon: Users
                },
                {
                    title: "Médicos",
                    url: "/medicos",
                    icon: CrossIcon
                },
                {
                    title: "Notificações",
                    url: "/notificacoes",
                    icon: BellIcon
                }
            ]
            case "SECRETARIA":
            return [
                {
                title: "Pacientes",
                url: "/pacientes",
                icon: Settings
                },
                {
                title: "Consultas",
                url: "/consultas",
                icon: Users
                }
            ]
            default:
            return [
                {
                title: "Home",
                url: "/",
                icon: Home
                }
            ]
        }
    }

    return (
        <Sidebar className="border-r-[#4845D2]">
            <SidebarHeader className="px-4 py-2 bg-[#09090b]">
                <Link
                    to={"/"}
                >
                <img src="https://img.logoipsum.com/250.svg" className="max-w-36 mt-2" alt="" />
                </Link>
                {/* <h2 className="text-lg font-semibold text-white">AgendAI</h2> */}
            </SidebarHeader>
            
            <SidebarContent className="bg-[#09090b] text-white">
            <SidebarGroup>
            <SidebarGroupLabel className="text-white">Menu { user.type.toLowerCase() }</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {getMenuItems().map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <button onClick={() => navigate(item.url)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        </button>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 text-white bg-[#18181b] hover:bg-[#3f3f46">
            {user.type !== "NONE" && (
            <SidebarMenu>
                <SidebarMenuItem>
                <SidebarMenuButton 
                    className="hover:bg-[#18181b] hover:text-white"
                    asChild>
                    <button onClick={() => navigate("/")}>
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                    </button>
                </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            )}
        </SidebarFooter>
        </Sidebar>
    )
    }