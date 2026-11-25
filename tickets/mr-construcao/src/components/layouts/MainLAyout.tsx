import { Outlet, NavLink } from 'react-router-dom';
import { AppRoutes } from '../../routes/paths';

export function MainLayout() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <header style={{ marginBottom: 16, borderBottom: '1px solid #ccc', paddingBottom: 8 }}>
        <h1>Mr. Construção</h1>
        <span>Vendedor em Atendimento: Balcão Central</span>
      </header>

      <div style={{ display: 'flex', gap: 24 }}>
        <aside style={{ minWidth: 180 }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <NavLink to={AppRoutes.HOME}>Início</NavLink>
            <NavLink to={AppRoutes.PRODUCTS_LIST}>Produtos</NavLink>
            <NavLink to={AppRoutes.CLIENTS_LIST}>Clientes</NavLink>
          </nav>
        </aside>

        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}