'use client';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { useCartStore } from '@/store/cartStore';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartDrawer() {
  const { t } = useTranslation();
  const { items, remove, clear, total, count } = useCartStore();
  const wa = 'https://wa.me/212600000000?text=' + encodeURIComponent(
    items.map(i => `${i.product.nameKey} x${i.qty} → ${i.product.priceMAD*i.qty} MAD`).join('\n') +
    `\nTotal: ${total()} MAD`
  );

  return (
    <Drawer>
      <DrawerTrigger>
        <button className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-kin-gold/90 hover:bg-kin-gold text-kin-dark font-semibold text-sm transition-all hover:scale-105">
          <ShoppingBag size={17} />
          {t('nav.cart')}
          {count() > 0 && <span className="absolute -top-1 -right-1 bg-kin-red text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{count()}</span>}
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <h2 className="font-display text-2xl text-kin-dark font-bold">{t('nav.cart')}</h2>
        </DrawerHeader>
        <div className="px-6 pb-6 space-y-4 overflow-y-auto max-h-[60vh]">
          {items.length === 0 ? <p className="text-gray-500 text-center py-8">{t('common.empty_cart')}</p> : (
            items.map(({ product, qty }) => (
              <motion.div key={product.id} layout initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-2xl">{product.image}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{t(product.nameKey)}</p>
                  <p className="text-xs text-gray-500">{product.priceMAD} {t('common.mad')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded-lg hover:bg-gray-200"><Minus size={14}/></button>
                  <span className="font-semibold text-sm w-6 text-center">{qty}</span>
                  <button onClick={() => remove(product.id)} className="p-1 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14}/></button>
                </div>
              </motion.div>
            ))
          )}
          {items.length > 0 && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-lg font-bold">
                <span>{t('common.subtotal')}</span>
                <span>{total()} {t('common.mad')}</span>
              </div>
              <a href={wa} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-base transition-all shadow-lg hover:shadow-xl">
                <MessageCircle size={20}/> {t('shop.checkout_whatsapp')}
              </a>
              <DrawerClose><button onClick={clear} className="w-full py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">{t('common.empty_cart')}</button></DrawerClose>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
