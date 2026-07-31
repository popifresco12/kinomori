import { HashRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MetaTags from './components/MetaTags';

// Lazy load all pages for code splitting
const Home = lazy(() => import('./pages/HomePage'));
const StoryPage = lazy(() => import('./pages/StoryPage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Loading fallback for lazy components
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
    }}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <MetaTags />
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </HashRouter>
    </HelmetProvider>
  );
}