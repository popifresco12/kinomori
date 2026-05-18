'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
export default function CartDrawer({ open, onClose }:{open:boolean,onClose:()=>void}) {
  const [items, setItems] = useState<{name:string,qty:number,price:number}[]>([]);
  return (
    <AnimatePresence>
      {open && <>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={onClose}/>
        <motion.aside initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:30,stiffness:300}}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/8 z-[61] p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-white">Your Order</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={22}/></button>
          </div>
          {!items.length && <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-600">
            <ShoppingBag size={48} strokeWidth={1}/>
            <p className="text-sm">Your cart is empty</p></div>}
          {items.length>0&&<div className="flex-1 overflow-y-auto space-y-3">{items.map((item,i)=>(
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
              <div><p className="text-white text-sm font-medium">{item.name}</p><p className="text-kin-gold text-sm">${item.price}</p></div>
              <div className="flex items-center gap-3">
                <button onClick={()=>setItems(prev=>prev.map((x,j)=>j===i?{...x,qty:x.qty-1}:x).filter(x=>x.qty>0))} className="text-gray-400 hover:text-white"><Minus size={14}/></button>
                <span className="text-white w-4 text-center">{item.qty}</span>
                <button onClick={()=>setItems(prev=>prev.map((x,j)=>j===i?{...x,qty:x.qty+1}:x))} className="text-gray-400 hover:text-white"><Plus size={14}/></button>
              </div></div>))}</div>}
        </motion.aside>
      </>}
    </AnimatePresence>
  );
}
