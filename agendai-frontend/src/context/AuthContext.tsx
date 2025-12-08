import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/axiosConfig';
import axios from "axios";

export type UserType = {
  nome: string;
  type: "ADMIN" | "SECRETARIA" | "NONE";
  email?: string;
}

type AuthContextType = {
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar se há usuário logado ao carregar a aplicação
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/api/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username: email, // O backend espera "username"
        password 
      });
      
      const { token, user: userData } = response.data;
      
      // Armazenar token no localStorage
      localStorage.setItem('token', token);
      
      // Atualizar estado do usuário
      setUser(userData);
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      throw new Error(error.response?.data?.message || 'Falha ao fazer login');
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Sempre limpar o estado e o token, mesmo se a requisição falhar
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};