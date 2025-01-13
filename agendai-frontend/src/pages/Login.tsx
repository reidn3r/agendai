import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function onSubmit(event) {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página
    console.log(formData); // Mostra os dados no console (ou envia para a API)
    // Aqui você pode adicionar lógica para autenticação
  }

  return (
    <>
      <div className="bg-slate-950 main-content">
        <div className="login-container">
          <h1 className="text-4xl pb-4 text-white">Login</h1>
          <form className="login-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="text-white block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-white block mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="btn btn-primary w-full mt-4">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
