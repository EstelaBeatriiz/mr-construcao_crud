import React, { useState, useEffect } from 'react';
import type{ ClienteDTO } from '../../types/cliente.types';

export interface ClientFormProps {
  mode: 'create' | 'edit';
  initialValues?: ClienteDTO;
  onSubmit: (valores: ClienteDTO) => Promise<void> | void;
  isLoading?: boolean;
  onCancel?: () => void;
}

const VALORES_PADRAO: ClienteDTO = {
  nomeCliente: '',
  telefone: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  cep: '',
  pontoReferencia: '',
};

export function ClientForm({
  mode,
  initialValues,
  onSubmit,
  isLoading = false,
  onCancel,
}: ClientFormProps) {
  const [formState, setFormState] = useState<ClienteDTO>(
    initialValues || VALORES_PADRAO
  );
  const [validacaoErro, setValidacaoErro] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setFormState({ ...VALORES_PADRAO, ...initialValues });
    }
  }, [initialValues]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidacaoErro(null);

    if (
      !formState.nomeCliente.trim() ||
      !formState.telefone.trim() ||
      !formState.rua.trim() ||
      !formState.numero.trim() ||
      !formState.bairro.trim() ||
      !formState.cidade.trim() ||
      !formState.cep.trim()
    ) {
      setValidacaoErro(
        'Preencha Nome do Cliente, Telefone, Rua, Número, Bairro, Cidade e CEP.'
      );
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
    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
      {validacaoErro && <div style={{ color: 'red' }}>{validacaoErro}</div>}

      <input name="nomeCliente" value={formState.nomeCliente} onChange={handleChange} placeholder="Nome Cliente *" />
      <input name="telefone" value={formState.telefone} onChange={handleChange} placeholder="Telefone *" />
      <input name="rua" value={formState.rua} onChange={handleChange} placeholder="Rua *" />
      <input name="numero" value={formState.numero} onChange={handleChange} placeholder="Número *" />
      <input name="complemento" value={formState.complemento || ''} onChange={handleChange} placeholder="Complemento" />
      <input name="bairro" value={formState.bairro} onChange={handleChange} placeholder="Bairro *" />
      <input name="cidade" value={formState.cidade} onChange={handleChange} placeholder="Cidade *" />
      <input name="cep" value={formState.cep} onChange={handleChange} placeholder="CEP *" />
      <input name="pontoReferencia" value={formState.pontoReferencia || ''} onChange={handleChange} placeholder="Ponto de Referência" />

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