import { Button } from "./components/ui/button";

export default function App() {

  const handleClick = () => {
    alert("Teste");
  }

  return (
    <div className="flex flex-col w-100 items-center">
      <h1 className="text-3xl font-bold underline text-blue-900">
        Hello world!
      </h1>
      <Button
        onClick={handleClick}
      >Teste</Button>
    </div>
  )
}
