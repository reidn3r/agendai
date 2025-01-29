import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar from "@/components/navbar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export type UserType = {
    nome:string,
    type: "ADMIN" | "SECRETARIA" | "NONE"
}

export const user:UserType = {
    nome: "Renato Balancieri",
    type: "SECRETARIA"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar user={user} />
                <div className="flex-1 flex flex-col">
                    <Navbar />
                    <main className="flex-1 flex overflow-auto bg-gray-100">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}