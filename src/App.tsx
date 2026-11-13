import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './hooks/useAuth';
import type { UserRole } from './types/hospital';
import { LoginPage } from './pages/LoginPage';
import { CadastroPage } from './pages/CadastroPage';
import { SupabasePage } from './pages/SupabasePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecepcaoLayout } from './layouts/RecepcaoLayout';
import { EnfermagemLayout } from './layouts/EnfermagemLayout';
import { MedicoLayout } from './layouts/MedicoLayout';
import { GestaoLayout } from './layouts/GestaoLayout';
import { PainelQuiosquePage } from './pages/PainelQuiosquePage';
import { HospitalProvider } from './context/HospitalContext';

const queryClient = new QueryClient();

const ROLE_HOME: Record<UserRole, string> = {
  recepcao: '/recepcao',
  enfermagem: '/enfermagem',
  medico: '/medico',
  gestao: '/gestao',
  painel: '/painel',
};

function ProtectedRoute({ allowedRoles, children }: { allowedRoles: UserRole[]; children: React.ReactNode }) {
  const { profile, loading } = useAuth();

  if (loading) return <div style={{ padding: 32, textAlign: 'center' }}>Carregando sessão...</div>;
  if (!profile) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(profile.role)) {
    return <Navigate to={ROLE_HOME[profile.role]} replace />;
  }

  return <>{children}</>;
}

function RootRedirect() {
  const { profile, loading } = useAuth();
  if (loading) return null;
  if (!profile) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOME[profile.role]} replace />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HospitalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/supabase" element={<SupabasePage />} />

            <Route
              path="/recepcao/*"
              element={
                <ProtectedRoute allowedRoles={['recepcao']}>
                  <RecepcaoLayout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/enfermagem/*"
              element={
                <ProtectedRoute allowedRoles={['enfermagem']}>
                  <EnfermagemLayout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/medico/*"
              element={
                <ProtectedRoute allowedRoles={['medico']}>
                  <MedicoLayout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/gestao/*"
              element={
                <ProtectedRoute allowedRoles={['gestao']}>
                  <GestaoLayout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/painel"
              element={
                <ProtectedRoute allowedRoles={['painel']}>
                  <PainelQuiosquePage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </HospitalProvider>
    </QueryClientProvider>
  );
}