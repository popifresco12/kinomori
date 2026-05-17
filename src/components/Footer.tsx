import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-kin-dark text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-2xl text-white mb-4">KINOMORI</h3>
          <p className="text-sm leading-relaxed">{t('hero.tagline')}</p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2"><MapPin size={14}/> Tamraght, Morocco</div>
          <div className="flex items-center gap-2"><Phone size={14}/> +212 5XX-XXXXXX</div>
          <div className="flex items-center gap-2"><Mail size={14}/> hello@kinomori.ma</div>
        </div>
        <div className="flex gap-4">
          {[Instagram,Facebook].map((Icon,i)=>(
            <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kin-gold/30 transition-colors">
              <Icon size={18} className="text-white"/>
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Kinomori. All rights reserved.
      </div>
    </footer>
  );
}
