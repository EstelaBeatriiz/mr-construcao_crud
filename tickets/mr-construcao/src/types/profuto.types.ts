export interface Produto {
  id: string;
  codigo: string;
  codigoBarras?: string;
  nomeProduto: string;
  marca?: string;
  familia?: string;
  precoVenda: number;
  estoqueAtual: number;
  unidade: string;
}

export type ProdutoDTO = Omit<Produto, 'id'>;

export interface AtualizarProdutoParams {
  id: string;
  dados: ProdutoDTO;
}