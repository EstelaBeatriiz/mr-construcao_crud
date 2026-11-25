import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './paths';
import { MainLayout } from '../components/layouts/MainLAyout';
import { ClienteDetalhes } from '../pages/clientes/clienteDetalhes';
import { ConsultarProduto } from '../pages/produtos/consultarProduto';
import { CadastrarProduto } from '../pages/produtos/cadastrarProduto';
import { CadastrarCliente } from '../pages/clientes/cadastrarCliente';
import { ConsultarCliente } from '../pages/clientes/consultarCliente';
import { ProdutoDetalhes } from '../pages/produtos/produtoDetalhes';

export const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <h2>Painel Inicial - Mr. Construção</h2> },
      { path: AppRoutes.PRODUCTS_LIST, element: <ConsultarProduto /> },
      { path: AppRoutes.PRODUCTS_NEW, element: <CadastrarProduto /> },
      { path: AppRoutes.PRODUCTS_EDIT, element: <ProdutoDetalhes /> },
      { path: AppRoutes.CLIENTS_LIST, element: <ConsultarCliente /> },
      { path: AppRoutes.CLIENTS_NEW, element: <CadastrarCliente /> },
      { path: AppRoutes.CLIENTS_EDIT, element: <ClienteDetalhes /> },
    ],
  },
]);