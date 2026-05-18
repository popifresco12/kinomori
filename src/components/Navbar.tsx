'use client';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { t } = useTranslation();
  const loc = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { to: '/',    key:'home' },
    { to: '/story',  key:'story' },
    { to: '/menu',   key:'menu' },
    { to: '/shop',   key:'shop' },
    { to: '/contact',key:'contact' },
  ];
  return (
    <motion.nav initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.4,ease:'easeOut'}}
      className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/70 border-b border-white/8">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight text-white hover: transition-colors" style={ color:#f59e0b }>
          KINOMORI
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {links.map(l => (
            <Link key={l.key} to={l.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                loc.pathname===l.to ? 'bg-kin-gold/15 text-kin-gold' : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
              }`}>
              {t('nav.'+l.key)}
            </Link>
          ))}
          <button className="ml-2 p-2 rounded-full bg-white/[0.07] text-white hover:bg-white/[0.13] transition-all">
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* Mobile */}
        <button className="md:hidden text-white" onClick={()=>setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
          className="md:hidden border-t border-white/6 bg-[#0a0a0a]/90 backdrop-blur-xl">
          {links.map(l => (
            <Link key={l.key} to={l.to} onClick={()=>setMobileOpen(false)}
              className="block px-6 py-3 text-gray-300 hover:text-white hover:bg-white/[0.05]">
              {t('nav.'+l.key)}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
