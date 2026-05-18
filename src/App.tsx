import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/HomePage'
import StoryPage from './pages/StoryPage'
import MenuPage from './pages/MenuPage'
import ShopPage from './pages/ShopPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  )
}
