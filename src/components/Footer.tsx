import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Instagram, Facebook, Globe } from 'lucide-react';
import DarkToggle from './DarkToggle';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-gray-300 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-2xl text-white mb-4">KINOMORI</h3>
          <p className="text-sm leading-relaxed">{t('hero.tagline')}</p>
        </div>
        <div className="space-y-2 text-sm">
          {[{Icon:MapPin,label:'address'},{Icon:Phone,label:'phone'},{Icon:Mail,label:'email'},{Icon:Globe,label:'web'}].map(({Icon,label})=>(
            <div key={label} className="flex items-center gap-2">
              <Icon size={14}/> <span>{label==='address'?'Tamraght, Morocco':label==='phone'?'+212 5XX-XXXXXX':label==='email'?'hello@kinomori.ma':'kinomori.ma'}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            {[Instagram,Facebook].map((Icon,i)=>(
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kin-gold/30 transition-colors">
                <Icon size={18} className="text-white"/>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <DarkToggle />
            <span className="text-xs text-gray-500">Dark mode</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 dark:border-slate-900 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Kinomori. All rights reserved.
      </div>
    </footer>
  );
}
