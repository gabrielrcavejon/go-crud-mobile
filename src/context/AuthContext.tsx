import React, { createContext, useContext, useEffect, useState } from "react";
import {
  isLogado,
  login as loginService,
  logout as logoutService,
} from "../service/authService";
import { GetMe } from "../service/usuarioService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_JWT } from "../api/apiClient";

type User = {
  idusuario: number;
  nome: string;
  email: string;
} | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Carregar ao iniciar o app
  useEffect(() => {
    async function loadUser() {
      const token = await isLogado();
      if (token) {
        const response = await GetMe();

        if (!response.sucesso) {
          logout();
          return;
        }

        setUser({
          idusuario: response.data.idusuario,
          nome: response.data.nome,
          email: response.data.email,
        });
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function login(email: string, senha: string): Promise<boolean> {
    try {
      await loginService(email, senha);

      const response = await GetMe();

      if (!response.sucesso) {
        setUser(null);
        await AsyncStorage.removeItem(TOKEN_JWT);
        return false;
      }

      setUser(response.data);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function logout() {
    await logoutService();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
