import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useObterClientePorIdQuery, useAtualizarClienteMutation } from '../../services/api';
import { ClientForm } from '../../components/clients/ClientForm';
import type{ ClienteDTO } from '../../types/cliente.types';
import { AppRoutes } from '../../routes/paths';

export function ClienteDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [erroServidor, setErroServidor] = useState<string | null>(null);

  const { data: cliente, isLoading: isLoadingDados, isError } = useObterClientePorIdQuery(
    id || '',
    { skip: !id }
  );
  const [atualizarCliente, { isLoading: isUpdating }] = useAtualizarClienteMutation();

  async function handleEditar(dadosAtualizados: ClienteDTO) {
    if (!id) return;
    setErroServidor(null);
    try {
      await atualizarCliente({ id, dados: dadosAtualizados }).unwrap();
      alert('Dados cadastrais do cliente atualizados com sucesso!');
      navigate(AppRoutes.CLIENTS_LIST);
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErroServidor(apiErr?.data?.message || 'Falha ao atualizar os dados na API.');
    }
  }

  if (isLoadingDados) return <p>Carregando dados cadastrais do cliente...</p>;

  if (isError || !cliente) {
    return (
      <div>
        <p>Cliente não encontrado ou erro na comunicação com o servidor.</p>
        <button onClick={() => navigate(AppRoutes.CLIENTS_LIST)}>
          Voltar para a consulta
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>EDITAR CLIENTE: {cliente.nomeCliente}</h2>
      {erroServidor && <div style={{ color: 'red', marginBottom: 15 }}>{erroServidor}</div>}
      <ClientForm
        mode="edit"
        initialValues={cliente}
        onSubmit={handleEditar}
        isLoading={isUpdating}
        onCancel={() => navigate(AppRoutes.CLIENTS_LIST)}
      />
    </div>
  );
}