import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Produto, ProdutoDTO, AtualizarProdutoParams } from '../types/profuto.types';
import type { Cliente, ClienteDTO, AtualizarClienteParams } from '../types/cliente.types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('@MRConstrucao:token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Produtos', 'Clientes', 'Orcamentos'],
  endpoints: (builder) => ({
    // PRODUTOS
    listarProdutos: builder.query<Produto[], string | void>({
      query: (busca) =>
        busca ? `/produtos?busca=${encodeURIComponent(busca)}` : '/produtos',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Produtos' as const, id })),
              { type: 'Produtos', id: 'LIST' },
            ]
          : [{ type: 'Produtos', id: 'LIST' }],
    }),
    obterProdutoPorId: builder.query<Produto, string>({
      query: (id) => `/produtos/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Produtos', id }],
    }),
    criarProduto: builder.mutation<Produto, ProdutoDTO>({
      query: (body) => ({
        url: '/produtos',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Produtos', id: 'LIST' }],
    }),
    atualizarProduto: builder.mutation<Produto, AtualizarProdutoParams>({
      query: ({ id, dados }) => ({
        url: `/produtos/${id}`,
        method: 'PUT',
        body: dados,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Produtos', id },
        { type: 'Produtos', id: 'LIST' },
      ],
    }),
    excluirProduto: builder.mutation<{ success?: boolean }, string>({
      query: (id) => ({
        url: `/produtos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Produtos', id },
        { type: 'Produtos', id: 'LIST' },
      ],
    }),

    // CLIENTES
    listarClientes: builder.query<Cliente[], string | void>({
      query: (busca) =>
        busca ? `/clientes?busca=${encodeURIComponent(busca)}` : '/clientes',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Clientes' as const, id })),
              { type: 'Clientes', id: 'LIST' },
            ]
          : [{ type: 'Clientes', id: 'LIST' }],
    }),
    obterClientePorId: builder.query<Cliente, string>({
      query: (id) => `/clientes/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Clientes', id }],
    }),
    criarCliente: builder.mutation<Cliente, ClienteDTO>({
      query: (body) => ({
        url: '/clientes',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Clientes', id: 'LIST' }],
    }),
    atualizarCliente: builder.mutation<Cliente, AtualizarClienteParams>({
      query: ({ id, dados }) => ({
        url: `/clientes/${id}`,
        method: 'PUT',
        body: dados,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Clientes', id },
        { type: 'Clientes', id: 'LIST' },
      ],
    }),
    excluirCliente: builder.mutation<{ success?: boolean }, string>({
      query: (id) => ({
        url: `/clientes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Clientes', id },
        { type: 'Clientes', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useListarProdutosQuery,
  useObterProdutoPorIdQuery,
  useCriarProdutoMutation,
  useAtualizarProdutoMutation,
  useExcluirProdutoMutation,
  useListarClientesQuery,
  useObterClientePorIdQuery,
  useCriarClienteMutation,
  useAtualizarClienteMutation,
  useExcluirClienteMutation,
} = api;