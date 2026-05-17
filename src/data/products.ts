export interface Product {
  id: string; nameKey: string; category: 'sauces'|'spices'|'cookware'|'gifts';
  priceMAD: number; image: string; stock: number;
}

export const PRODUCTS: Product[] = [
  { id:'s1', nameKey:'shop.sauces.teriyaki',  category:'sauces',  priceMAD:85,  image:'🥢', stock:50 },
  { id:'s2', nameKey:'shop.sauces.chili',     category:'sauces',  priceMAD:65,  image:'🌶️', stock:30 },
  { id:'s3', nameKey:'shop.sauces.soy',       category:'sauces',  priceMAD:40,  image:'🍶', stock:80 },
  { id:'sp1',nameKey:'shop.spices.five_spice',category:'spices', priceMAD:55,  image:'🫚', stock:25 },
  { id:'sp2',nameKey:'shop.spices.sichuan',   category:'spices', priceMAD:70,  image:'🌿', stock:20 },
  { id:'c1', nameKey:'shop.cookware.wok',     category:'cookware',priceMAD:350, image:'🍳', stock:10 },
  { id:'c2', nameKey:'shop.cookware.bamboo',  category:'cookware',priceMAD:95,  image:'🎋', stock:40 },
  { id:'g1', nameKey:'shop.gifts.set_a',      category:'gifts',  priceMAD:220, image:'🎁', stock:15 },
  { id:'g2', nameKey:'shop.gifts.set_b',      category:'gifts',  priceMAD:380, image:'🎀', stock:8  },
];

export const CATEGORIES = [
  { key:'sauces',  labelKey:'shop.categories.sauces',  emoji:'🥢' },
  { key:'spices',  labelKey:'shop.categories.spices',  emoji:'🌿' },
  { key:'cookware',labelKey:'shop.categories.cookware',emoji:'🍳' },
  { key:'gifts',   labelKey:'shop.categories.gifts',   emoji:'🎁' },
] as const;
