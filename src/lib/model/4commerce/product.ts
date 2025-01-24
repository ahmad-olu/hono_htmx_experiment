import { RecordModel } from "pocketbase";

export type ProductStatus = "draft" | "proposed" | "published" | "rejected";
export interface BaseProduct extends RecordModel {
  title: string;
  subtitle: string | null;
  description: string | null;
  is_giftCard: boolean;
  status: ProductStatus;
  width: number | null;
  weight: number | null;
  length: number | null;
  height: number | null;
  collection?: string | null;
  categories?: string | null; //? list or null
  type?: string | null;
  tags?: string | null; //? list or null
  discountable: boolean;
  created: string | null;
  updated: string | null;
  metadata?: Record<string, unknown> | null;
}

export interface CreateBaseProduct {
  title: string;
  subtitle: string | null;
  description: string | null;
  is_giftCard: boolean;
  status: ProductStatus;
  width: number | null;
  weight: number | null;
  length: number | null;
  height: number | null;
  collection?: string | null;
  categories?: string | null; //? list or null
  type?: string | null;
  tags?: string | null; //? list or null
  discountable: boolean;
  metadata?: Record<string, unknown> | null;
}

//   const products: Product[] = [
//     {
//       title: "Wireless Headphones",
//       subtitle: "Noise-cancelling over-ear headphones",
//       description: "Premium sound quality with active noise cancellation.",
//       is_giftCard: false,
//       status: "published",
//       width: 7,
//       weight: 250,
//       length: 20,
//       height: 10,
//       collection: null,
//       categories: "Electronics, Audio",
//       type: "Headphones",
//       tags: "wireless, noise-canceling, over-ear",
//       discountable: true,
//       metadata: null,
//     },
//     {
//       title: "Smartphone Stand",
//       subtitle: "Adjustable phone stand for desk use",
//       description: "Sturdy, portable stand with adjustable angles.",
//       is_giftCard: false,
//       status: "published",
//       width: 5,
//       weight: 150,
//       length: 15,
//       height: 20,
//       collection: null,
//       categories: "Accessories, Phone",
//       type: "Stand",
//       tags: "adjustable, portable, phone",
//       discountable: true,
//       metadata: null,
//     },
//     {
//       title: "Gaming Mouse",
//       subtitle: "High precision gaming mouse with RGB lighting",
//       description:
//         "Ergonomic design with customizable RGB lighting and high precision sensors.",
//       is_giftCard: false,
//       status: "published",
//       width: 3,
//       weight: 120,
//       length: 10,
//       height: 5,
//       collection: null,
//       categories: "Electronics, Gaming",
//       type: "Mouse",
//       tags: "gaming, RGB, ergonomic",
//       discountable: true,

//       metadata: null,
//     },
//     {
//       title: "Bluetooth Speaker",
//       subtitle: "Portable speaker with deep bass",
//       description:
//         "Compact Bluetooth speaker with a deep bass sound and waterproof design.",
//       is_giftCard: false,
//       status: "proposed",
//       width: 6,
//       weight: 200,
//       length: 18,
//       height: 8,
//       collection: null,
//       categories: "Electronics, Audio",
//       type: "Speaker",
//       tags: "bluetooth, portable, waterproof",
//       discountable: false,
//       metadata: null,
//     },
//     {
//       title: "E-Reader",
//       subtitle: "Portable e-book reader with adjustable light",
//       description:
//         "A lightweight e-reader with an adjustable backlight for reading in the dark.",
//       is_giftCard: false,
//       status: "draft",
//       width: 5,
//       weight: 180,
//       length: 12,
//       height: 1,
//       collection: null,
//       categories: "Electronics, Books",
//       type: "Reader",
//       tags: "ebook, adjustable light, portable",
//       discountable: true,
//       metadata: null,
//     },
//     {
//       title: "Leather Wallet",
//       subtitle: "Premium leather wallet with RFID blocking",
//       description: "Stylish leather wallet with built-in RFID protection.",
//       is_giftCard: false,
//       status: "published",
//       width: 4,
//       weight: 90,
//       length: 11,
//       height: 2,
//       collection: null,
//       categories: "Accessories, Fashion",
//       type: "Wallet",
//       tags: "leather, RFID, wallet",
//       discountable: false,
//       metadata: null,
//     },
//     {
//       title: "Yoga Mat",
//       subtitle: "Non-slip, thick yoga mat",
//       description: "Comfortable and durable yoga mat with non-slip surface.",
//       is_giftCard: false,
//       status: "published",
//       width: 6,
//       weight: 600,
//       length: 70,
//       height: 1,
//       collection: null,
//       categories: "Fitness, Sports",
//       type: "Mat",
//       tags: "yoga, non-slip, fitness",
//       discountable: true,
//       metadata: null,
//     },
//     {
//       title: "Portable Power Bank",
//       subtitle: "Fast charging power bank for devices",
//       description:
//         "High capacity portable power bank with quick charge functionality.",
//       is_giftCard: false,
//       status: "rejected",
//       width: 4,
//       weight: 250,
//       length: 12,
//       height: 5,
//       collection: null,
//       categories: "Electronics, Accessories",
//       type: "Power Bank",
//       tags: "portable, fast charge, electronics",
//       discountable: true,
//       metadata: null,
//     },
//     {
//       title: "Electric Kettle",
//       subtitle: "Boil water quickly with auto shut-off",
//       description:
//         "Fast boiling electric kettle with an automatic shut-off feature.",
//       is_giftCard: false,
//       status: "published",
//       width: 8,
//       weight: 500,
//       length: 18,
//       height: 20,
//       collection: null,
//       categories: "Home, Appliances",
//       type: "Kettle",
//       tags: "electric, boiling, auto-shutoff",
//       discountable: true,

//       metadata: null,
//     },
//     {
//       title: "Smartwatch",
//       subtitle: "Fitness-focused smartwatch with heart rate monitor",
//       description:
//         "Smartwatch with fitness tracking features, heart rate monitoring, and GPS.",
//       is_giftCard: false,
//       status: "draft",
//       width: 4,
//       weight: 150,
//       length: 5,
//       height: 1,
//       collection: null,
//       categories: "Electronics, Wearables",
//       type: "Smartwatch",
//       tags: "fitness, heart rate, wearables",
//       discountable: true,
//       metadata: null,
//     },
//     {
//       title: "Travel Backpack",
//       subtitle: "Spacious backpack with multiple compartments",
//       description: "Durable and spacious backpack perfect for travel.",
//       is_giftCard: false,
//       status: "published",
//       width: 8,
//       weight: 700,
//       length: 30,
//       height: 40,
//       collection: null,
//       categories: "Accessories, Travel",
//       type: "Backpack",
//       tags: "travel, backpack, durable",
//       discountable: false,
//       metadata: null,
//     },
//     {
//       title: "Winter Jacket",
//       subtitle: "Insulated winter jacket with waterproof lining",
//       description: "Warm winter jacket with waterproof and windproof features.",
//       is_giftCard: false,
//       status: "published",
//       width: 5,
//       weight: 900,
//       length: 15,
//       height: 25,
//       collection: null,
//       categories: "Clothing, Winter Wear",
//       type: "Jacket",
//       tags: "winter, insulated, waterproof",
//       discountable: false,

//       metadata: null,
//     },
//     {
//       title: "Coffee Maker",
//       subtitle: "Automatic coffee machine with grinder",
//       description:
//         "Make fresh coffee with an integrated grinder and automatic brewing.",
//       is_giftCard: false,
//       status: "published",
//       width: 12,
//       weight: 1200,
//       length: 30,
//       height: 25,
//       collection: null,
//       categories: "Home, Appliances",
//       type: "Coffee Maker",
//       tags: "coffee, automatic, grinder",
//       discountable: true,

//       metadata: null,
//     },
//     {
//       title: "Portable Speaker",
//       subtitle: "Compact Bluetooth speaker with powerful sound",
//       description:
//         "Wireless Bluetooth speaker with impressive sound quality in a compact design.",
//       is_giftCard: false,
//       status: "published",
//       width: 5,
//       weight: 300,
//       length: 15,
//       height: 7,
//       collection: null,
//       categories: "Electronics, Audio",
//       type: "Speaker",
//       tags: "portable, bluetooth, compact",
//       discountable: true,
//       metadata: null,
//     },
//     {
//       title: "Multifunctional Kitchen Blender",
//       subtitle: "Blender with multiple attachments for different tasks",
//       description:
//         "A versatile blender for all your kitchen tasks, including chopping and blending.",
//       is_giftCard: false,
//       status: "proposed",
//       width: 8,
//       weight: 1400,
//       length: 20,
//       height: 20,
//       collection: null,
//       categories: "Home, Appliances",
//       type: "Blender",
//       tags: "kitchen, multifunctional, blender",
//       discountable: true,
//       metadata: null,
//     },
//   ];

//   for (const element of products) {
//     const record = await pbDb.collection("4mini_ecommerce_ts").create(element);
//  }
