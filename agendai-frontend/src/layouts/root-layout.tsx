import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar, { UserType } from "@/components/navbar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const user:UserType = {
        nome: "Zilda",
        type: "ADM"
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar user={user} />
                <div className="flex-1 flex flex-col">
                    <Navbar user={user} />
                    <main className="flex-1 flex overflow-auto bg-gray-100">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}