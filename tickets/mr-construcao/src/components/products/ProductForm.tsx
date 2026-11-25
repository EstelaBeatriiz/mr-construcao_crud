import React, { useState, useEffect } from 'react';
import type { ProdutoDTO } from '../../types/profuto.types';

export interface ProductFormProps {
  mode: 'create' | 'edit';
  initialValues?: ProdutoDTO;
  onSubmit: (valores: ProdutoDTO) => Promise<void> | void;
  isLoading?: boolean;
  onCancel?: () => void;
}

const VALORES_PADRAO: ProdutoDTO = {
  codigo: '',
  codigoBarras: '',
  nomeProduto: '',
  marca: '',
  familia: '',
  precoVenda: 0,
  estoqueAtual: 0,
  unidade: 'UN',
};

export function ProductForm({
  mode,
  initialValues,
  onSubmit,
  isLoading = false,
  onCancel,
}: ProductFormProps) {
  const [formState, setFormState] = useState<ProdutoDTO>(
    initialValues || VALORES_PADRAO
  );
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setFormState({ ...VALORES_PADRAO, ...initialValues });
    }
  }, [initialValues]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (!formState.codigo.trim() || !formState.nomeProduto.trim() || !formState.unidade.trim()) {
      setErro('Preencha Código, Nome do Produto e Unidade.');
      return;
    }
    onSubmit(formState);
  }

  const labelBotao = isLoading
    ? mode === 'edit'
      ? 'ATUALIZANDO...'
      : 'SALVANDO...'
    : mode === 'edit'
      ? 'EDITAR'
      : 'SALVAR';

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
      {erro && <div style={{ color: 'red' }}>{erro}</div>}

      <input name="codigo" value={formState.codigo} onChange={handleChange} placeholder="Código *" />
      <input name="codigoBarras" value={formState.codigoBarras || ''} onChange={handleChange} placeholder="Código de Barras (EAN-13)" />
      <input name="nomeProduto" value={formState.nomeProduto} onChange={handleChange} placeholder="Nome do Produto *" />
      <input name="marca" value={formState.marca || ''} onChange={handleChange} placeholder="Marca" />
      <input name="familia" value={formState.familia || ''} onChange={handleChange} placeholder="Família (ex: Alvenaria, Elétrica)" />
      <input type="number" step="0.01" name="precoVenda" value={formState.precoVenda} onChange={handleChange} placeholder="Preço de Venda *" />
      <input type="number" name="estoqueAtual" value={formState.estoqueAtual} onChange={handleChange} placeholder="Estoque Atual *" />
      <input name="unidade" value={formState.unidade} onChange={handleChange} placeholder="Unidade (ex: Saco, Metro, UN) *" />

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            CANCELAR
          </button>
        )}
        <button type="submit" disabled={isLoading}>
          {labelBotao}
        </button>
      </div>
    </form>
  );
}