'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import MetaTags from '@/seo/MetaTags';

const PRODUCTS = [
  { id:1, name:'Kinomori Tote Bag', price:25,  emoji:'👜', desc:'Organic cotton, embroidered logo' },
  { id:2, name:'Sushi Set Experience', price:150, emoji:'🎁', desc:'Private omakase for two' },
  { id:3, name:'Premium Soy Sauce', price:18,  emoji:'🫙', desc:"Chef's selection, 250ml" },
  { id:4, name:'Matcha Latte Gift Box', price:32, emoji:'🍵', desc:'12 sachets · Japanese grade' },
  { id:5, name:'Kinomori Apron', price:28,  emoji:'👨‍🍳', desc:'Heavy canvas, forest green' },
  { id:6, name:'Ramen Night Set', price:55, emoji:'🍜', desc:'DIY ramen kit for 4 people' },
];

const CATS = ['all','apparel','food','experience'];

export default function ShopPage() {
  const { t } = useTranslation();
  const [cat, setCat] = useState('all');
  const [cart, setCart] = useState<{name:string,qty:number,price:number}[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filtered = cat==='all' ? PRODUCTS : PRODUCTS.filter(p => p.id%2===0); // demo filter

  const addToCart = (p:typeof PRODUCTS[0]) => {
    setCart(prev => {
      const e = prev.find(x => x.name === p.name);
      return e ? prev.map(x => x.name===p.name?{...x,qty:x.qty+1}:x) : [...prev,{name:p.name,qty:1,price:p.price}];
    });
    setDrawerOpen(true);
  };

  return (
    <main>
      <MetaTags/>
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20" >
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}
          className="font-display text-5xl md:text-7xl font-bold text-white tracking-wide">Shop</motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3}}
          className="mt-5 text-lg text-gray-400 max-w-xl">Kinomori curated essentials</motion.p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {CATS.map(c => (
            <button key={c} onClick={()=>setCat(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                cat===c ? 'bg-[#f59e0b] text-[#0a0a0a]' : 'border border-white/12 text-gray-400 hover:border-white/30 hover:text-white'
              }`}>{c}</button>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-20 bg-white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p,i) => (
            <motion.div key={p.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}}
              className="rounded-2xl bg-gray-50 overflow-hidden hover:shadow-2xl hover:shadow-black/10 border border-transparent hover:/20 group cursor-pointer transition-all duration-500" >
              <div className="aspect-square flex items-center justify-center text-8xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:/10 group-hover:/5 transition-all duration-500"  >{p.emoji}</div>
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-gray-900 text-lg">{p.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-display font-bold text-xl" >{p.price}€</span>
                  <button onClick={()=>addToCart(p)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[#0a0a0a] font-semibold text-sm hover:bg-amber-400 transition-all shadow-md hover:shadow-lg active:scale-95" >
                    <Plus size={15}/> Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Drawer */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className={"absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"  + (drawerOpen?'opacity-100':'opacity-0 pointer-events-none')}
          onClick={()=>setDrawerOpen(false)}/>
        <div className={"absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/8 p-6 transform transition-transform pointer-events-auto duration-300" +(drawerOpen?'translate-x-0':'translate-x-full')}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-white">Your Order</h2>
            <button onClick={()=>setDrawerOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
          </div>
          {!cart.length && <p className="text-gray-600 text-sm">Your cart is empty</p>}
          {cart.map((item,i)=>(
            <div key={i} className="flex justify-between items-center py-3 border-b border-white/6">
              <div><p className="text-white text-sm font-medium">{item.name}</p><p className="text-sm" >{item.price}€ × {item.qty}</p></div>
              <span className="text-white font-semibold">{item.price*item.qty}€</span>
            </div>
          ))}
          {cart.length>0 && (
            <div className="mt-6 pt-4 border-t border-white/8">
              <div className="flex justify-between mb-4"><span className="text-gray-400">Total</span>
                <span className="font-display font-bold text-white text-xl">{cart.reduce((s,i)=>s+i.price*i.qty,0)}€</span></div>
              <button className="w-full py-3 rounded-full text-[#0a0a0a] font-bold hover:bg-amber-400 transition-all shadow-lg" >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
