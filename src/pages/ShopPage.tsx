'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MetaTags from '@/seo/MetaTags';
import { motion } from 'framer-motion';
import { PRODUCTS, CATEGORIES, Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus } from 'lucide-react';
import { t } from 'i18next';

export default function Shop() {
  const { t } = useTranslation();
  const { add } = useCartStore();
  const [cat, setCat] = useState<string>('all');

  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);

  const stockBadge = (s:number) => s<5? {cls:'bg-red-100 text-red-700',label:t('shop.out_of_stock')}
    : s<20? {cls:'bg-amber-100 text-amber-700',label:t('shop.limited_stock')}
    : {cls:'bg-green-100 text-green-700',label:t('shop.in_stock')};

  return (
    <MetaTags titleKey="shop.page_title" descriptionKey="hero.tagline"/>
      <div className="max-w-7xl mx-auto px-6 py-14">
      <h1 className="font-display text-5xl font-bold mb-10 text-center">{t('shop.page_title')}</h1>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <button onClick={()=>setCat('all')} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${cat==='all'?'bg-kin-dark text-white':'bg-gray-100 hover:bg-gray-200'}`}>All</button>
        {CATEGORIES.map(c=>(
          <button key={c.key} onClick={()=>setCat(c.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${cat===c.key?'bg-kin-gold text-kin-dark':'bg-gray-100 hover:bg-gray-200'}`}>
            {c.emoji} {t(c.labelKey)}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p:Product)=>(
          <motion.div key={p.id} whileHover={{y:-6}} className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden">
            <div className="h-44 flex items-center justify-center text-7xl bg-gradient-to-br from-gray-50 to-gray-100">{p.image}</div>
            <div className="p-5 space-y-3">
              <p className="font-display text-lg font-bold">{t(p.nameKey)}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-kin-gold">{p.priceMAD} {t('common.mad')}</span>
                <Badge className={stockBadge(p.stock).cls}>{stockBadge(p.stock).label}</Badge>
              </div>
              <button onClick={()=>add(p)}
                className="w-full py-2.5 rounded-xl bg-kin-dark text-white hover:bg-kin-gold hover:text-kin-dark font-semibold text-sm transition-all">
                <Plus size={15} className="inline mr-1"/> {t('common.add_to_cart')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
