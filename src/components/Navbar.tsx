'use client';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import CartDrawer from './CartDrawer';
import DarkToggle from './DarkToggle';

export default function Navbar() {
  const { t } = useTranslation();
  const loc = useLocation();
  const links = [
    { to: '/', key:'home' },
    { to: '/story', key:'story' },
    { to: '/menu', key:'menu' },
    { to: '/shop', key:'shop' },
    { to: '/contact', key:'contact' },
  ];
  return (
    <motion.nav initial={{y:-30,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.5,ease:'easeOut'}}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight text-kin-dark hover:text-kin-gold transition-colors">
          KINOMORI
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                loc.pathname === l.to ? 'bg-kin-gold/15 text-kin-gold' : 'text-gray-600 hover:bg-gray-100 hover:text-kin-dark'
              }`}
            >
              {t('nav.' + l.key)}
            </Link>
          ))}
        </div>
        <DarkToggle />
        <CartDrawer />
      </div>
    </motion.nav>
  );
}
