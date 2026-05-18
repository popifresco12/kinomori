import { lazy, Suspense } from 'react';
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

function LoadingFallback() {
  return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
    <div className="w-8 h-8 border-4 border-kin-gold border-t-transparent rounded-full animate-spin"/>
  </div>;
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<LoadingFallback/>}>
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
