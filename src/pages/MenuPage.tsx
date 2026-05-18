'use client';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import MetaTags from '@/seo/MetaTags';

const categories = [
  { key:'sushi', emoji:'🍣', label_en:'Sushi', label_es:'Sushi' },
  { key:'ramen', emoji:'🍜', label_en:'Ramen', label_es:'Ramen' },
  { key:'dimsum', emoji:'🥟', label_en:'Dim Sum', label_es:'Dim Sum' },
];
const items = [
  {cat:'sushi',name:'Dragon Roll',desc:'Eel, avocado, spicy mayo',price:'18'},
  {cat:'sushi',name:'Salmon Nigiri (8 pcs)',desc:'Fresh Norwegian salmon',price:'22'},
  {cat:'ramen',name:'Tonkotsu Ramen',desc:'Pork bone broth, chashu, egg',price:'16'},
  {cat:'ramen',name:'Spicy Miso Ramen',desc:'Miso, chili oil, corn',price:'15'},
  {cat:'dimsum',name:'Pork Xiao Long Bao (8)',desc:'Soup dumplings',price:'14'},
  {cat:'dimsum',name:'Har Gow (6)',desc:'Shrimp dumplings',price:'13'},
];

export default function MenuPage() {
  const { t, i18n } = useTranslation();
  const lng = i18n.language?.startsWith('es') ? 'es' : i18n.language?.startsWith('fr') ? 'fr' : 'en';
  return (
    <main>
      <MetaTags/>
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20"
        style={{background:'linear-gradient(135deg,#0a0a0a,#122212)'}}>
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}
          className="font-display text-5xl md:text-7xl font-bold text-white tracking-wide">
          Menu
        </motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3}}
          className="mt-5 text-lg text-gray-400 max-w-xl">
          Momiji · Sushi · Ramen · Dim Sum
        </motion.p>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-20 bg-white">
        {categories.map(cat=>(
          <div key={cat.key} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl">{cat.emoji}</span>
              <h2 className="font-display text-3xl font-bold text-gray-900">{cat.label_en}</h2>
              <div className="flex-1 h-px bg-gray-200"/>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {items.filter(i=>i.cat===cat.key).map((item,i)=>(
                <motion.div key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                  className="flex justify-between items-start p-5 rounded-2xl bg-gray-50 hover:bg-kin-gold/8 border border-transparent hover:border-kin-gold/20 transition-all group cursor-pointer">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-kin-dark transition-colors">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <span className="font-display font-bold text-kin-gold text-lg ml-4">{item.price}€</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
