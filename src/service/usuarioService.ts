import api from "../api/apiClient";

export interface UsuarioResponse {
  sucesso: boolean;
  data: {
    idusuario: number;
    nome: string;
    email: string;
  };
  mensagem: string;
}

export async function GetMe(): Promise<UsuarioResponse> {
  const response = await api.get<UsuarioResponse>("/usuario/me");
  return response.data;
}
