import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCriarClienteMutation } from '../../services/api';
import { ClientForm } from '../../components/clients/ClientForm';
import type{ ClienteDTO } from '../../types/cliente.types';
import { AppRoutes } from '../../routes/paths';

export function CadastrarCliente() {
  const [criarCliente, { isLoading }] = useCriarClienteMutation();
  const navigate = useNavigate();
  const [erroServidor, setErroServidor] = useState<string | null>(null);

  async function handleSalvar(dados: ClienteDTO) {
    setErroServidor(null);
    try {
      await criarCliente(dados).unwrap();
      alert('Cliente cadastrado com sucesso no Mr. Construção!');
      navigate(AppRoutes.CLIENTS_LIST);
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErroServidor(apiErr?.data?.message || 'Falha ao cadastrar o cliente na API.');
    }
  }

  return (
    <div>
      <h2>CADASTRO CLIENTE</h2>
      {erroServidor && <div style={{ color: 'red', marginBottom: 15 }}>{erroServidor}</div>}
      <ClientForm
        mode="create"
        onSubmit={handleSalvar}
        isLoading={isLoading}
        onCancel={() => navigate(AppRoutes.CLIENTS_LIST)}
      />
    </div>
  );
}