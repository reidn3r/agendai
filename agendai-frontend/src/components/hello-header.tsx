
export default function HelloHeader({ username, message }:{
    username:string,
    message:string
}){
    return(
        <div className="p-2">
            <p className="font-bold text-2xl">
                Olá, {username}! <span role="img" aria-label="wave">👋</span>
            </p>
            <p className="text-neutral-300 text-md">{message}</p>
        </div>
    )
}