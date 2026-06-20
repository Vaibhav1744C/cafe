import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import AdminQR from './pages/AdminQR'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import StickyBar from './components/layout/StickyBar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/menu"     element={<Menu />} />
        <Route path="/admin/qr" element={<AdminQR />} />
      </Routes>
      <Footer />
      <StickyBar />
    </BrowserRouter>
  )
}

export default App
