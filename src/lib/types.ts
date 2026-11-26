export type Category = "apparel" | "equipment" | "accessories";

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
  isBestSeller?: boolean;
  stock: number;
  rating: number;
  reviews: number;
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
  { id: "apparel", name: "Apparel", image: "/stock/cat-apparel.jpg", blurb: "Tees, shorts, jackets & layers" },
  { id: "equipment", name: "Equipment", image: "/stock/cat-equipment.jpg", blurb: "Packs, vests & hydration" },
  { id: "accessories", name: "Accessories", image: "/stock/cat-accessories.jpg", blurb: "Headwear, eyewear & lights" },
];

export const SUBCATEGORIES: Record<Category, string[]> = {
  apparel: ["Tees", "Shorts", "Tights", "Jackets", "Vests & Layers", "Sports Bras"],
  equipment: ["Race Vests", "Backpacks", "Hydration", "Trekking Poles", "Fuel & Nutrition", "Packing Cubes"],
  accessories: ["Headwear", "Eyewear", "Headlamps", "Socks", "Gloves", "Recovery"],
};
