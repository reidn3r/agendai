import { NotificationModel } from "@/models/NotificationModel";
import { MessageSquare, User } from "lucide-react";
import NotificationDialog from "./notification-dialog";
import { Dialog, DialogTrigger } from "../ui/dialog";



export default function NotificationCard({ notification } : {
    notification: NotificationModel
}){

    return(
        <div className="flex flex-row 
            items-center justify-between p-4 my-2 
            rounded-md shadow-lg border border-neutral-950/50 bg-[#171717]">

            <div className="flex flex-row items-center gap-4">
                <div className="flex flex-col">
                    
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-neutral-400" />
                        <p className="font-bold text-md text-white">{ notification.to.slice(0, 7) } {notification.to.length > 7 ? "..." : ""} </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-neutral-400" />
                        <p className="font-thin text-neutral-400"> { notification.message.slice(0, 3) } {notification.message.length > 3 ? "..." : "" }</p>
                    </div>
                </div>
            </div>

            <Dialog>
                <DialogTrigger>
                    <div
                        className="
                            px-4 py-2 mx-4
                            text-sm font-medium text-white 
                            bg-[#4845D2] rounded-md shadow-md
                            hover:bg-[#5b59e0] hover:shadow-lg transition-all duration-300
                            cursor-pointer
                        "
                    >
                        Ver mais
                    </div>
                </DialogTrigger>
                <NotificationDialog
                    to={notification.to}
                    message={notification.message}
            
                />
            </Dialog>
            
        </div>
    )
}