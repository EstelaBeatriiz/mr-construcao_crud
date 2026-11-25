import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useListarClientesQuery, useExcluirClienteMutation } from '../../services/api';
import { AppRoutes } from '../../routes/paths';

export function ConsultarCliente() {
  const [busca, setBusca] = useState('');
  const { data: clientes, isLoading, isError, refetch } = useListarClientesQuery(busca);
  const [excluirCliente, { isLoading: isDeleting }] = useExcluirClienteMutation();

  async function handleExcluir(id: string, nome: string) {
    if (!window.confirm(`Deseja realmente excluir o cliente "${nome}"?`)) return;
    try {
      await excluirCliente(id).unwrap();
      alert('Cliente removido com sucesso!');
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      alert(apiErr?.data?.message || 'Falha ao excluir cliente na API.');
    }
  }

  return (
    <div>
      <h2>Consulta de Clientes</h2>
      <Link to={AppRoutes.CLIENTS_NEW}>+ CADASTRAR CLIENTE</Link>

      <div style={{ margin: '12px 0' }}>
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome ou telefone..."
        />
      </div>

      {isLoading && <p>Carregando carteira de clientes...</p>}

      {isError && (
        <div>
          <p>Erro ao conectar com a API de clientes. Verifique se o servidor está ativo.</p>
          <button onClick={() => refetch()}>Tentar novamente</button>
        </div>
      )}

      {!isLoading && !isError && (!clientes || clientes.length === 0) && (
        <p>Nenhum cliente localizado no catálogo.</p>
      )}

      {!isLoading && !isError && clientes && clientes.length > 0 && (
        <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Nome do Cliente</th>
              <th>Telefone</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Ponto de Referência</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cli) => (
              <tr key={cli.id}>
                <td>{cli.nomeCliente}</td>
                <td>{cli.telefone}</td>
                <td>{cli.bairro}</td>
                <td>{cli.cidade}</td>
                <td>{cli.pontoReferencia || '-'}</td>
                <td>
                  <Link to={`/clientes/${cli.id}`}>Editar</Link>{' '}
                  <button
                    onClick={() => handleExcluir(cli.id, cli.nomeCliente)}
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