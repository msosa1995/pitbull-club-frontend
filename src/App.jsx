import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext'

// Páginas públicas
import Home from './pages/public/Home'
import Club from './pages/public/Club'
import RazaPitbull from './pages/public/RazaPitbull'
import RazaBully from './pages/public/RazaBully'
import EjemplaresPublico from './pages/public/EjemplaresPublico'
import EjemplarDetalle from './pages/public/EjemplarDetalle'
import Eventos from './pages/public/Eventos'
import Campeonatos from './pages/public/Campeonatos'
import Mapa from './pages/public/Mapa'
import Contacto from './pages/public/Contacto'

// Panel de administración (presidente/admin)
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Integrantes from './pages/Integrantes'
import IntegranteDetalle from './pages/IntegranteDetalle'
import IntegranteForm from './pages/IntegranteForm'
import Perros from './pages/Perros'
import PerroDetalle from './pages/PerroDetalle'
import PerroForm from './pages/PerroForm'

// Panel de miembro
import MiPanel from './pages/MiPanel'
import MiPerfil from './pages/MiPerfil'
import MisPerros from './pages/MisPerros'
import MiPerroForm from './pages/MiPerroForm'
import MisCamadas from './pages/MisCamadas'
import CambiarPassword from './pages/CambiarPassword'

function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ background: '#050505', minHeight: '100vh' }} />
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && !user.is_staff) return <Navigate to="/mi-panel" replace />
  return children
}

function MemberRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ background: '#050505', minHeight: '100vh' }} />
  if (!user) return <Navigate to="/login" replace />
  // Si debe cambiar password y no está en esa ruta, redirigir
  if (user.debe_cambiar_password) return <Navigate to="/cambiar-password" replace />
  return children
}

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return <div style={{ background: '#050505', minHeight: '100vh' }} />

  // Al login, redirigir según rol
  const postLoginRedirect = user
    ? (user.debe_cambiar_password ? '/cambiar-password' : user.is_staff ? '/panel' : '/mi-panel')
    : '/login'

  return (
    <Routes>
      {/* ══ RUTAS PÚBLICAS ══ */}
      <Route path="/" element={<Home />} />
      <Route path="/club" element={<Club />} />
      <Route path="/razas/pitbull" element={<RazaPitbull />} />
      <Route path="/razas/bully" element={<RazaBully />} />
      <Route path="/ejemplares" element={<EjemplaresPublico />} />
      <Route path="/ejemplares/:id" element={<EjemplarDetalle />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/campeonatos" element={<Campeonatos />} />
      <Route path="/mapa" element={<Mapa />} />
      <Route path="/contacto" element={<Contacto />} />

      {/* ══ AUTH ══ */}
      <Route path="/login" element={user ? <Navigate to={postLoginRedirect} replace /> : <Login />} />

      {/* ══ CAMBIAR PASSWORD (todos los usuarios autenticados) ══ */}
      <Route path="/cambiar-password" element={
        user ? <CambiarPassword forzado={user.debe_cambiar_password} /> : <Navigate to="/login" replace />
      } />

      {/* ══ PANEL ADMINISTRADOR (solo staff) ══ */}
      <Route path="/panel" element={<PrivateRoute adminOnly><Dashboard /></PrivateRoute>} />
      <Route path="/integrantes" element={<PrivateRoute adminOnly><Integrantes /></PrivateRoute>} />
      <Route path="/integrantes/nuevo" element={<PrivateRoute adminOnly><IntegranteForm /></PrivateRoute>} />
      <Route path="/integrantes/:id" element={<PrivateRoute adminOnly><IntegranteDetalle /></PrivateRoute>} />
      <Route path="/integrantes/:id/editar" element={<PrivateRoute adminOnly><IntegranteForm /></PrivateRoute>} />
      <Route path="/perros" element={<PrivateRoute adminOnly><Perros /></PrivateRoute>} />
      <Route path="/perros/nuevo" element={<PrivateRoute adminOnly><PerroForm /></PrivateRoute>} />
      <Route path="/perros/:id" element={<PrivateRoute adminOnly><PerroDetalle /></PrivateRoute>} />
      <Route path="/perros/:id/editar" element={<PrivateRoute adminOnly><PerroForm /></PrivateRoute>} />

      {/* ══ PANEL DE MIEMBRO ══ */}
      <Route path="/mi-panel" element={<MemberRoute><MiPanel /></MemberRoute>} />
      <Route path="/mi-perfil" element={<MemberRoute><MiPerfil /></MemberRoute>} />
      <Route path="/mis-perros" element={<MemberRoute><MisPerros /></MemberRoute>} />
      <Route path="/mis-perros/nuevo" element={<MemberRoute><MiPerroForm /></MemberRoute>} />
      <Route path="/mis-perros/:id/editar" element={<MemberRoute><MiPerroForm /></MemberRoute>} />
      <Route path="/mis-camadas" element={<MemberRoute><MisCamadas /></MemberRoute>} />
      <Route path="/mis-camadas/nuevo" element={<MemberRoute><MisCamadas /></MemberRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
