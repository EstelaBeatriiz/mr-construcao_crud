import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCriarProdutoMutation } from '../../services/api';
import { ProductForm } from '../../components/products/ProductForm';
import type { ProdutoDTO } from '../../types/profuto.types';
import { AppRoutes } from '../../routes/paths';

export function CadastrarProduto() {
  const [criarProduto, { isLoading }] = useCriarProdutoMutation();
  const navigate = useNavigate();
  const [erroServidor, setErroServidor] = useState<string | null>(null);

  async function handleSalvar(dados: ProdutoDTO) {
    setErroServidor(null);
    try {
      await criarProduto(dados).unwrap();
      alert('Produto cadastrado com sucesso!');
      navigate(AppRoutes.PRODUCTS_LIST);
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErroServidor(apiErr?.data?.message || 'Falha ao cadastrar produto.');
    }
  }

  return (
    <div>
      <h2>Cadastro de Produto</h2>
      {erroServidor && <div style={{ color: 'red', marginBottom: 10 }}>{erroServidor}</div>}
      <ProductForm
        mode="create"
        onSubmit={handleSalvar}
        isLoading={isLoading}
        onCancel={() => navigate(AppRoutes.PRODUCTS_LIST)}
      />
    </div>
  );
}