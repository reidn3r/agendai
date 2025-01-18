import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

export default function NotificationDialog({ to, message } :
    { 
        to:string,
        message:string
    }){

    return (
        <DialogContent className="bg-[#4845D2]/20 backdrop-blur-sm shadow-md text-white border-none">
            <DialogHeader>
            <DialogTitle>
                <p>Enviado para:</p>
                <p className="text-neutral-200 text-sm font-normal">{ to }</p>
            </DialogTitle>
            <DialogDescription className="text-white">{ message }</DialogDescription>
            </DialogHeader>
        </DialogContent>
    );
}