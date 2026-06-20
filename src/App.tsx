import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import Menu from '@/pages/Menu'
import AdminQR from '@/pages/AdminQR'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminLayout from '@/pages/admin/AdminLayout'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminMenu from '@/pages/admin/AdminMenu'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyBar from '@/components/layout/StickyBar'
import { useAdminAuth } from '@/hooks/useAdminAuth'

function AdminSection() {
  const { isAuthenticated, login, logout, error } = useAdminAuth()

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} error={error} />
  }

  return (
    <AdminLayout onLogout={logout}>
      {/* Relative paths — parent route already matched /admin/* */}
      <Routes>
        <Route index          element={<AdminDashboard />} />
        <Route path="menu"    element={<AdminMenu />} />
        <Route path="qr"      element={<AdminQR />} />
        <Route path="*"       element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
            <StickyBar />
          </>
        } />
        <Route path="/menu" element={
          <>
            <Navbar />
            <Menu />
            <Footer />
            <StickyBar />
          </>
        } />

        {/* Admin — all /admin/* routes handled here, no public nav */}
        <Route path="/admin/*" element={<AdminSection />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
