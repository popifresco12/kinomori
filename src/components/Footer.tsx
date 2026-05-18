'use client';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail } from 'lucide-react';

// clsx no instalado — usamos template literals en su lugar

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div className="space-y-4">
          <h3 className="font-display text-2xl font-bold text-white">KINOMORI</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Asia meets Morocco in every bite — Tamraght, Morocco
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Phone].map((Icon,i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/[0.07] flex items-center justify-center text-gray-400 hover:text-kin-gold hover:bg-white/[0.11] transition-all">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase opacity-60">Explore</h4>
          <ul className="space-y-2.5 text-sm text-gray-500">
            {['/','/story','/menu','/shop','/contact'].map(to=>(
              <li key={to}><Link to={to} className="hover:text-kin-gold transition-colors">{to==='/'?'Home':to.slice(1).replace(/^./,c=>c.toUpperCase())}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase opacity-60">Visit Us</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li className="flex gap-2.5"><MapPin size={14} className="mt-0.5 text-kin-gold"/>Tamraght, Morocco</li>
            <li className="flex gap-2.5"><Phone size={14} className="mt-0.5 text-kin-gold"/>+212 528 000 000</li>
            <li className="flex gap-2.5"><Mail size={14} className="mt-0.5 text-kin-gold"/>hola@kinomori.ma</li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase opacity-60">Hours</h4>
          <ul className="space-y-2.5 text-sm text-gray-500">
            <li className="flex justify-between"><span>Mon–Thu</span><span className="text-white/70">12:00 – 23:00</span></li>
            <li className="flex justify-between"><span>Fri–Sat</span><span className="text-white/70">12:00 – 01:00</span></li>
            <li className="flex justify-between"><span>Sunday</span><span className="text-kin-gold">Closed</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.04] py-6 text-center text-gray-600 text-xs">
        © {new Date().getFullYear()} Kinomori. All rights reserved.
      </div>
    </footer>
  );
}
