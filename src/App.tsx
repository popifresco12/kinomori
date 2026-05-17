import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/HomePage';
import Story from '@/pages/StoryPage';
import Shop from '@/pages/ShopPage';
import Contact from '@/pages/ContactPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// ── Menu Page (minimal placeholder — expand in v3.1) ────────────────────
function Menu() {
  const { t } = require('react-i18next').useTranslation('menu');
  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <h1 className="font-display text-5xl font-bold mb-8">{t('page_title')}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {['dimsum','ramen','sushi','teppanyaki'].map(k=>(
          <div key={k} className="p-8 rounded-2xl border border-gray-200 hover:border-kin-gold hover:shadow-lg transition-all">
            <h3 className="font-display text-xl font-bold mb-2">{t(`menu.${k}.name`)}</h3>
            <p className="text-gray-600 text-sm">{t(`menu.${k}.desc`)}</p>
            <p className="text-kin-gold font-bold mt-2">{t(`menu.${k}.price`)} {t('common.mad')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
