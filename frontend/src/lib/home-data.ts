import type { LucideIcon } from "lucide-react";
import { Zap, Box, Wrench, Shield, Award, Truck, Clock } from "lucide-react";

// ============================================
// Partners / Trusted By
// ============================================
export const PARTNERS = [
  { name: "ESAB", logo: "ESAB" },
  { name: "Lincoln Electric", logo: "LINCOLN" },
  { name: "Miller", logo: "MILLER" },
  { name: "Fronius", logo: "FRONIUS" },
  { name: "Kemppi", logo: "KEMPPI" },
  { name: "Bohler", logo: "BÖHLER" },
] as const;

// ============================================
// Featured Products
// ============================================
export const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Electrozi E6013 Ø3.2mm",
    description: "Electrozi rutilici universali pentru sudare MMA",
    price: 89,
    badge: "Popular",
    image: "/products/electrozi-1.jpg",
  },
  {
    id: 2,
    name: "Sârmă MIG ER70S-6",
    description: "Sârmă solidă pentru sudare MIG/MAG",
    price: 156,
    badge: "Nou",
    image: "/products/sarma-1.jpg",
  },
  {
    id: 3,
    name: "Mască Sudură Auto",
    description: "Mască cu filtru automat DIN 9-13",
    price: 245,
    badge: null,
    image: "/products/masca-1.jpg",
  },
  {
    id: 4,
    name: "Aparat Sudură MIG 200A",
    description: "Invertor profesional cu sinergic",
    price: 1890,
    badge: "Top",
    image: "/products/aparat-1.jpg",
  },
] as const;

// ============================================
// Categories
// ============================================
export type CategoryItem = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  count: string;
};

export const CATEGORIES: CategoryItem[] = [
  {
    name: "Electrozi de Sudură",
    description: "Electrozi rutilici, bazici și speciali",
    href: "/magazin?category=electrozi",
    icon: Zap,
    color: "from-orange-500 to-amber-500",
    count: "150+ produse",
  },
  {
    name: "Sârmă de Sudură",
    description: "Sârmă MIG/MAG și TIG de calitate",
    href: "/magazin?category=sarma",
    icon: Box,
    color: "from-blue-500 to-cyan-500",
    count: "80+ produse",
  },
  {
    name: "Echipamente",
    description: "Aparate și invertoare profesionale",
    href: "/magazin?category=echipamente",
    icon: Wrench,
    color: "from-emerald-500 to-teal-500",
    count: "60+ produse",
  },
  {
    name: "Accesorii",
    description: "Măști, mănuși și consumabile",
    href: "/magazin?category=accesorii",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
    count: "200+ produse",
  },
];

// ============================================
// Features / Benefits
// ============================================
export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
};

export const FEATURES: FeatureItem[] = [
  {
    icon: Award,
    title: "Calitate Premium",
    description: "Produse certificate de la branduri recunoscute internațional",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Truck,
    title: "Livrare Rapidă",
    description: "Livrare în 24-48h în toată România, gratuită peste 500 RON",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Clock,
    title: "Suport 24/7",
    description: "Echipa noastră de experți este disponibilă oricând ai nevoie",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Shield,
    title: "Garanție Extinsă",
    description: "Garanție de până la 3 ani pentru toate echipamentele",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

// ============================================
// About / Stats
// ============================================
export const ABOUT_STATS = [
  { value: "30+", label: "Ani Experiență" },
  { value: "500+", label: "Produse în Stoc" },
  { value: "10k+", label: "Clienți Mulțumiți" },
  { value: "98%", label: "Rată Satisfacție" },
] as const;

export const ABOUT_CHECKMARKS = [
  "Produse certificate",
  "Prețuri competitive",
  "Consultanță gratuită",
  "Livrare națională",
] as const;

// ============================================
// Testimonials
// ============================================
export const TESTIMONIALS = [
  {
    name: "Mihai Popescu",
    role: "Inginer Sudor, SC MetalWorks SRL",
    content:
      "Colaborăm cu Sudexpert de peste 5 ani. Calitatea produselor și profesionalismul echipei sunt de neegalat. Livrările sunt întotdeauna la timp.",
    rating: 5,
    avatar: "MP",
  },
  {
    name: "Elena Gheorghiu",
    role: "Manager Achiziții, Industrial Pro",
    content:
      "Cel mai bun furnizor cu care am lucrat. Prețuri excelente, consultanță de specialitate și suport post-vânzare impecabil. Recomand cu încredere!",
    rating: 5,
    avatar: "EG",
  },
  {
    name: "Alexandru Radu",
    role: "Proprietar, Atelier Radu",
    content:
      "De când am descoperit Sudexpert, nu mai cumpăr de altundeva. Gama variată de produse și calitatea constantă mă fac să revin de fiecare dată.",
    rating: 5,
    avatar: "AR",
  },
] as const;
