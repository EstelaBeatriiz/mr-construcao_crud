import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useObterProdutoPorIdQuery, useAtualizarProdutoMutation } from '../../services/api';
import { ProductForm } from '../../components/products/ProductForm';
import type{ ProdutoDTO } from '../../types/profuto.types';
import { AppRoutes } from '../../routes/paths';

export function ProdutoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [erroServidor, setErroServidor] = useState<string | null>(null);

  const { data: produto, isLoading, isError } = useObterProdutoPorIdQuery(id || '', {
    skip: !id,
  });
  const [atualizarProduto, { isLoading: isUpdating }] = useAtualizarProdutoMutation();

  async function handleEditar(dados: ProdutoDTO) {
    if (!id) return;
    setErroServidor(null);
    try {
      await atualizarProduto({ id, dados }).unwrap();
      alert('Produto atualizado com sucesso!');
      navigate(AppRoutes.PRODUCTS_LIST);
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErroServidor(apiErr?.data?.message || 'Falha ao atualizar produto.');
    }
  }

  if (isLoading) return <p>Carregando produto...</p>;
  if (isError || !produto) {
    return (
      <div>
        <p>Produto não encontrado.</p>
        <button onClick={() => navigate(AppRoutes.PRODUCTS_LIST)}>Voltar</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Editar Produto: {produto.nomeProduto}</h2>
      {erroServidor && <div style={{ color: 'red', marginBottom: 10 }}>{erroServidor}</div>}
      <ProductForm
        mode="edit"
        initialValues={produto}
        onSubmit={handleEditar}
        isLoading={isUpdating}
        onCancel={() => navigate(AppRoutes.PRODUCTS_LIST)}
      />
    </div>
  );
}