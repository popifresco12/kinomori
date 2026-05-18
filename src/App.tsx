import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import i18n from '@/i18n';
import '@/index.css';

const Home    = lazy(() => import('@/pages/HomePage'));
const Story   = lazy(() => import('@/pages/StoryPage'));
const Menu    = lazy(() => import('@/pages/MenuPage'));
const Shop    = lazy(() => import('@/pages/ShopPage'));
const Contact = lazy(() => import('@/pages/ContactPage'));

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (i18n.isInitialized) setReady(true);
    else i18n.once('initialized', () => setReady(true));
  }, []);

  // Fondo oscuro SIEMPRE visible mientras carga — no hay blanco
  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
      <div className="w-6 h-6 border-2 border-white/15 border-t-white rounded-full animate-spin" />
    </div>
  );

  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center" style={{ background: '#0a0a0a' }}>
              <div className="w-6 h-6 border-2 border-white/15 border-t-white rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/story" element={<Story/>} />
              <Route path="/menu" element={<Menu/>} />
              <Route path="/shop" element={<Shop/>} />
              <Route path="/contact" element={<Contact/>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </I18nextProvider>
  );
}
