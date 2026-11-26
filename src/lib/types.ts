export type Category =
  | "shoes"
  | "apparel"
  | "equipment"
  | "electronics"
  | "lighting"
  | "nutrition"
  | "recovery"
  | "accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  stock: number;
  sourcingNote?: string;
};

export type CartLine = { productId: string; size: string; color: string; qty: number };

export type Order = {
  id: string;
  date: string;
  email: string;
  items: { name: string; size: string; color: string; qty: number; price: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
  name: string;
  address: string;
  city: string;
  postcode: string;
  shippingMethod: string;
  payment: string;
};

export const CATEGORIES: { id: Category; name: string; image: string; blurb: string }[] = [
  { id: "shoes", name: "Shoes", image: "/stock/prod-shoe.jpg", blurb: "Trail, road & race-day" },
  { id: "apparel", name: "Apparel", image: "/stock/cat-apparel.jpg", blurb: "Tees, shorts, jackets & layers" },
  { id: "equipment", name: "Equipment", image: "/stock/cat-equipment.jpg", blurb: "Packs, vests & hydration" },
  { id: "electronics", name: "Electronics", image: "/stock/cat-electronics.jpg", blurb: "GPS watches & heart rate" },
  { id: "lighting", name: "Lighting", image: "/stock/prod-headlamp.jpg", blurb: "Headlamps & visibility" },
  { id: "nutrition", name: "Nutrition", image: "/stock/cat-nutrition.jpg", blurb: "Gels, bars & electrolytes" },
  { id: "recovery", name: "Recovery", image: "/stock/cat-recovery.jpg", blurb: "Rollers & massage" },
  { id: "accessories", name: "Accessories", image: "/stock/cat-accessories.jpg", blurb: "Headwear, eyewear & gloves" },
];

export const SUBCATEGORIES: Record<Category, string[]> = {
  shoes: ["Trail Shoes", "Road Shoes", "Racing Flats", "Shoe Care"],
  apparel: ["Tees", "Shorts", "Tights", "Jackets", "Vests & Layers", "Sports Bras"],
  equipment: ["Race Vests", "Backpacks", "Hydration", "Trekking Poles", "Packing Cubes"],
  electronics: ["GPS Watches", "Heart Rate", "Running Tech"],
  lighting: ["Headlamps", "Safety & Reflective"],
  nutrition: ["Energy Gels", "Hydration & Electrolytes", "Bars & Chews"],
  recovery: ["Massage & Rollers", "Stretching Aids"],
  accessories: ["Headwear", "Eyewear", "Socks", "Gloves"],
};
