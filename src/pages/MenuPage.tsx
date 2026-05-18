'use client';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, Clock, Flame } from 'lucide-react';
import MetaTags from '@/seo/MetaTags';

const EMOJI: Record<string,string> = {
  dimsum:'🥟', ramen:'🍜', sushi:'🍣', teppanyaki:'🥩',
  padthai:'🍝', duck:'🦆', cocktails:'🍸', dessert:'🍡',
};
const TAG_ICON: Record<string,typeof Star|null> = {
  dimsum: Clock, ramen: Clock, sushi: Star, teppanyaki: Flame,
  padthai: Flame, duck: Star, cocktails: Star, dessert: Star,
};
const TAG_KEY: Record<string,string> = {
  dimsum:'handmade', ramen:'broth', sushi:'seasonal', teppanyaki:'wagyu',
  padthai:'signature', duck:'crispy', cocktails:'premium', dessert:'house',
};

export default function MenuPage() {
  const { t } = useTranslation();
  const dishes = (t('menu.dishes', { returnObjects: true }) as Record<string,{name:string;desc:string;price:string}>) || {};
  const keys = Object.keys(dishes);

  return (
    <div className="grain min-h-screen transition-colors bg-white dark:bg-slate-950 pb-20">
      <MetaTags titleKey="menu.page_title" descriptionKey="about.origin_text" />

      {/* ── Hero ── */}
      <section className="relative py-20 px-6 text-center overflow-hidden"
        style={{background:'linear-gradient(135deg,#1a2e1a 0%,#0a0a0a 50%,#1a2e1a 100%)'}}>
        <div className="absolute inset-0 pointer-events-none">
          {['#f59e0b','#ef4444','#10b981','#8b5cf6'].map((c,i)=>(
            <div key={i} className="absolute rounded-full animate-pulse"
              style={{top:`${10+i*20}%`,left:`${5+i*15}%`,width:`${10+i*6}px`,height:`${10+i*6}px`,background:c,opacity:.1+i*.06,filter:'blur(12px)',animationDuration:`${3+i*2}s`}}
            />
          ))}
        </div>
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.6}}
          className="font-display text-5xl md:text-7xl font-bold text-white tracking-wider relative z-10">
          {t('menu.page_title')}
        </motion.h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.15}}
          className="mt-4 text-xl text-amber-300/80 font-light relative z-10">
          Asia meets Morocco · 亚洲遇见摩洛哥
        </motion.p>
      </section>

      {/* ── Dishes grid ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {keys.map((key, i) => {
            const d = dishes[key];
            const Icon = TAG_ICON[key] || Star;
            return (
              <motion.article
                key={key}
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true, margin:'-50px'}}
                transition={{delay:i*0.07, duration:.5}}
                whileHover={{y:-4}}
                className="group relative rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 bg-white dark:bg-slate-900"
              >
                <div className="h-32 flex items-end justify-center pb-0 text-[5rem] leading-none bg-gradient-to-t from-amber-50 to-transparent dark:from-slate-800 group-hover:scale-110 transition-transform duration-500">
                  {EMOJI[key] || '🍽️'}
                </div>

                <div className="p-6 pt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">{d.name}</h3>
                    <span className="text-2xl font-black text-kin-gold">{d.price} {t('common.mad')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-amber-500"/>
                    <span className="text-xs text-amber-700 dark:text-amber-400 font-medium uppercase tracking-wider">
                      {t('menu.tag.' + TAG_KEY[key])}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{d.desc}</p>
                  <button className="mt-2 w-full py-2.5 rounded-xl border-2 border-kin-gold/30 text-kin-gold hover:bg-kin-gold hover:text-kin-dark font-semibold text-sm transition-all">
                    {t('common.add_to_cart')}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── Promo banner ── */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <motion.div initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
          className="rounded-3xl bg-gradient-to-r from-kin-dark to-slate-900 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">{t('menu.banner.title')}</h2>
            <p className="text-gray-300 mt-2">{t('menu.banner.subtitle')}</p>
          </div>
          <button className="px-8 py-4 rounded-full bg-kin-gold hover:bg-amber-400 text-kin-dark font-bold shadow-lg shadow-amber-500/30 transition-all whitespace-nowrap">
            {t('nav.contact')}
          </button>
        </motion.div>
      </section>
    </div>
  );
}
