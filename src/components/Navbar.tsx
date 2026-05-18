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
    { to: '/', key:'home' },
    { to: '/story', key:'story' },
    { to: '/menu', key:'menu' },
    { to: '/shop', key:'shop' },
    { to: '/contact', key:'contact' },
  ];
  return (
    <motion.nav initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.4,ease:'easeOut'}}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 bg-white/80 border-b border-gray-100 border-gray-200 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold tracking-tight text-gray-900 text-gray-900 hover:text-kin-gold transition-colors">
          KINOMORI
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                loc.pathname===l.to ? 'bg-kin-gold/15 text-kin-gold' : 'text-gray-600 text-gray-600 hover:bg-gray-100 hover:bg-gray-100'
              }`}>
              {t('nav.' + l.key)}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2"><CartDrawer />
          <button onClick={()=>setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 hover:bg-gray-100">
            {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}}
          className="md:hidden border-t border-gray-100 border-gray-200 bg-white bg-white px-6 pb-4 space-y-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={()=>setMobileOpen(false)}
              className={`block py-3 px-4 rounded-xl text-base font-medium transition-all ${
                loc.pathname===l.to ? 'bg-kin-gold/15 text-kin-gold' : 'text-gray-700 text-gray-600 hover:bg-gray-50 hover:bg-gray-100'
              }`}>
              {t('nav.'+l.key)}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
