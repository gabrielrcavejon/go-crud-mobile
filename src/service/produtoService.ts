import api from "../api/apiClient";

export interface Produto {
  idproduto: number;
  nome: string;
  descricao: string;
  idusuario: number;
}

export interface ProdutoResponse {
  sucesso: boolean;
  data: Produto[];
  mensagem: string;
}

export async function GetProdutos(): Promise<ProdutoResponse> {
  const response = await api.get<ProdutoResponse>("/produto");
  return response.data;
}
