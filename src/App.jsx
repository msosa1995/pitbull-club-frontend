import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext'

// Páginas públicas
import Home from './pages/public/Home'
import Club from './pages/public/Club'
import RazaPitbull from './pages/public/RazaPitbull'
import RazaBully from './pages/public/RazaBully'
import EjemplaresPublico from './pages/public/EjemplaresPublico'
import Eventos from './pages/public/Eventos'
import Campeonatos from './pages/public/Campeonatos'
import Contacto from './pages/public/Contacto'

// Panel de administración
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Integrantes from './pages/Integrantes'
import IntegranteDetalle from './pages/IntegranteDetalle'
import IntegranteForm from './pages/IntegranteForm'
import Perros from './pages/Perros'
import PerroDetalle from './pages/PerroDetalle'
import PerroForm from './pages/PerroForm'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      {/* ══ RUTAS PÚBLICAS ══ */}
      <Route path="/" element={<Home />} />
      <Route path="/club" element={<Club />} />
      <Route path="/razas/pitbull" element={<RazaPitbull />} />
      <Route path="/razas/bully" element={<RazaBully />} />
      <Route path="/ejemplares" element={<EjemplaresPublico />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/campeonatos" element={<Campeonatos />} />
      <Route path="/contacto" element={<Contacto />} />

      {/* ══ AUTH ══ */}
      <Route path="/login" element={user ? <Navigate to="/panel" replace /> : <Login />} />

      {/* ══ PANEL ADMINISTRADOR ══ */}
      <Route path="/panel" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/integrantes" element={<PrivateRoute><Integrantes /></PrivateRoute>} />
      <Route path="/integrantes/nuevo" element={<PrivateRoute><IntegranteForm /></PrivateRoute>} />
      <Route path="/integrantes/:id" element={<PrivateRoute><IntegranteDetalle /></PrivateRoute>} />
      <Route path="/integrantes/:id/editar" element={<PrivateRoute><IntegranteForm /></PrivateRoute>} />
      <Route path="/perros" element={<PrivateRoute><Perros /></PrivateRoute>} />
      <Route path="/perros/nuevo" element={<PrivateRoute><PerroForm /></PrivateRoute>} />
      <Route path="/perros/:id" element={<PrivateRoute><PerroDetalle /></PrivateRoute>} />
      <Route path="/perros/:id/editar" element={<PrivateRoute><PerroForm /></PrivateRoute>} />

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
