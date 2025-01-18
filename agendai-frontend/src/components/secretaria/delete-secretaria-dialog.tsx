import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

export default function DeleteSecretariaDialog({ onConfirm } : {
    onConfirm: () => void
} ){

    return(
        <AlertDialogContent className="bg-red-900/30 border-none">
            <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Tem certeza que deseja continuar?</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-200">
                A ação é irreversível. Isso irá deletar todos os registros dessa secretária do sistema permanentemente.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
                onClick={onConfirm}
                className="bg-red-800">Continuar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}