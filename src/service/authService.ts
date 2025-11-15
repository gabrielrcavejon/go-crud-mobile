import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { TOKEN_JWT } from "../api/apiClient";
import { AxiosResponse } from "axios";

export interface LoginResponse {
  sucesso: boolean;
  data: string;
  mensagem: string;
}

export async function login(
  email: string,
  senha: string,
): Promise<AxiosResponse<LoginResponse>> {
  const response = await api.post<LoginResponse>("login", { email, senha });

  await AsyncStorage.setItem(TOKEN_JWT, response.data.data);

  return response;
}

export async function logout() {
  await AsyncStorage.removeItem(TOKEN_JWT);
}

export async function isLogado() {
  const token = await AsyncStorage.getItem(TOKEN_JWT);
  return !!token;
}
