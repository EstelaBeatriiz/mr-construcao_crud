import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useListarProdutosQuery, useExcluirProdutoMutation } from '../../services/api';
import { AppRoutes } from '../../routes/paths';

export function ConsultarProduto() {
  const [busca, setBusca] = useState('');
  const { data: produtos, isLoading, isError, refetch } = useListarProdutosQuery(busca);
  const [excluirProduto, { isLoading: isDeleting }] = useExcluirProdutoMutation();

  async function handleExcluir(id: string, nome: string) {
    if (!window.confirm(`Deseja excluir "${nome}"?`)) return;
    try {
      await excluirProduto(id).unwrap();
      alert('Produto excluído com sucesso!');
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      alert(apiErr?.data?.message || 'Erro ao excluir produto.');
    }
  }

  return (
    <div>
      <h2>Consulta de Produtos</h2>
      <Link to={AppRoutes.PRODUCTS_NEW}>+ CADASTRAR PRODUTO</Link>

      <div style={{ margin: '12px 0' }}>
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar produto..."
        />
      </div>

      {isLoading && <p>Carregando produtos...</p>}

      {isError && (
        <div>
          <p>Erro ao conectar com a API de produtos.</p>
          <button onClick={() => refetch()}>Tentar novamente</button>
        </div>
      )}

      {!isLoading && !isError && (!produtos || produtos.length === 0) && (
        <p>Nenhum produto cadastrado.</p>
      )}

      {!isLoading && !isError && produtos && produtos.length > 0 && (
        <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Marca</th>
              <th>Preço (R$)</th>
              <th>Estoque</th>
              <th>Unidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.codigo}</td>
                <td>{prod.nomeProduto}</td>
                <td>{prod.marca || '-'}</td>
                <td>R$ {Number(prod.precoVenda).toFixed(2)}</td>
                <td>{prod.estoqueAtual}</td>
                <td>{prod.unidade}</td>
                <td>
                  <Link to={`/produtos/${prod.id}`}>Editar</Link>{' '}
                  <button
                    onClick={() => handleExcluir(prod.id, prod.nomeProduto)}
                    disabled={isDeleting}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}