import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Camera, MessageCircle, Globe, Clock } from 'lucide-react';

import { motion } from 'framer-motion';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#0a0a0a] text-gray-400 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <h3 className="font-display text-2xl text-white mb-3 tracking-wide">KINOMORI</h3>
            <p className="text-sm leading-relaxed text-gray-400">{t('hero.tagline')}</p>
          </motion.div>

          {/* Contacto */}
          <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.1}} className="space-y-3 text-sm">
            {[{Icon:MapPin,label:'Tamraght, Morocco'},{Icon:Phone,label:'+212 5XX-XXXXXX'},{Icon:Mail,label:'hello@kinomori.ma'},{Icon:Clock,label:'9:00 AM — 11:00 PM'}].map(({Icon,label},i)=>(
              <div key={i} className="flex items-center gap-3">
                <Icon size={15} className="text-kin-gold"/> <span>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Social + Dark Toggle */}
          <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.2}} className="flex flex-col items-start md:items-end gap-5">
            <div className="flex gap-3">
              {[Camera,MessageCircle,Globe].map((Icon,i)=>(
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 border border-white/6 flex items-center justify-center hover:bg-kin-gold/20 hover:border-kin-gold/40 transition-colors">
                  <Icon size={18} className="text-gray-400 group-hover:text-white"/>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3"><span className="text-xs text-gray-400">{t('common.language')}</span>
            </div>
          </motion.div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-white/6 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Kinomori. All rights reserved.</span>
          <a href="https://popifresco12.github.io/kinomori/sitemap.xml" className="hover:text-kin-gold transition-colors">sitemap.xml</a>
        </div>
      </div>
    </footer>
  );
}
