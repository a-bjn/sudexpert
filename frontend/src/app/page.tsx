"use client";

import HeroSection from "@/components/home/HeroSection";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Shield,
  Truck,
  Clock,
  Award,
  Star,
  Quote,
  Zap,
  CheckCircle2,
  Flame,
  Box,
  Wrench,
  Mail,
} from "lucide-react";

// ============================================
// SECTION: Trusted By / Partners
// ============================================
function TrustedBySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const partners = [
    { name: "ESAB", logo: "ESAB" },
    { name: "Lincoln Electric", logo: "LINCOLN" },
    { name: "Miller", logo: "MILLER" },
    { name: "Fronius", logo: "FRONIUS" },
    { name: "Kemppi", logo: "KEMPPI" },
    { name: "Bohler", logo: "BÖHLER" },
  ];

  return (
    <section ref={ref} className="py-16 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
            Parteneri de încredere
          </span>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="bebas-neue-regular text-2xl md:text-3xl text-slate-300 group-hover:text-orange-500 transition-colors duration-300 cursor-default">
                {partner.logo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: Featured Products
// ============================================
function FeaturedProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const products = [
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
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 uppercase tracking-widest mb-4">
              <Flame className="w-4 h-4" />
              Produse Recomandate
            </span>
            <h2 className="bebas-neue-regular text-4xl md:text-5xl lg:text-6xl text-slate-800">
              Cele Mai Vândute
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/magazin"
              className="group inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 font-medium transition-colors"
            >
              Vezi toate produsele
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/magazin/${product.id}`} className="group block">
                <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-200 hover:shadow-xl transition-all duration-300">
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-lg">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden">
                    <div className="w-32 h-32 bg-slate-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Box className="w-12 h-12 text-slate-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-slate-800">
                        {product.price} <span className="text-sm font-normal text-slate-500">RON</span>
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-orange-500 group-hover:text-white transition-all"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: Categories
// ============================================
function CategoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
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

  return (
    <section ref={ref} className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 uppercase tracking-widest mb-4">
            Explorează
          </span>
          <h2 className="bebas-neue-regular text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Categorii Principale
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Găsește exact ce ai nevoie din gama noastră completă de produse pentru sudură
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={category.href} className="group block h-full">
                <div className="relative h-full p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 overflow-hidden">
                  {/* Gradient hover effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${category.color}`} />

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {category.count}
                    </span>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: Features / Benefits
// ============================================
function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
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

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 uppercase tracking-widest mb-4">
            De ce să ne alegi
          </span>
          <h2 className="bebas-neue-regular text-4xl md:text-5xl lg:text-6xl text-slate-800">
            Beneficiile Tale
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className={`w-20 h-20 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:shadow-lg transition-shadow`}
              >
                <feature.icon className={`w-10 h-10 ${feature.color}`} />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: About / Story
// ============================================
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "30+", label: "Ani Experiență" },
    { value: "500+", label: "Produse în Stoc" },
    { value: "10k+", label: "Clienți Mulțumiți" },
    { value: "98%", label: "Rată Satisfacție" },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/welder-2.png"
                alt="Sudexpert - Echipamente de Sudură"
                fill
                className="object-cover object-center"
                priority
                quality={90}
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="bebas-neue-regular text-3xl text-slate-800">30+</div>
                  <div className="text-sm text-slate-500">Ani pe piață</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 uppercase tracking-widest mb-4">
              Despre Noi
            </span>
            <h2 className="bebas-neue-regular text-4xl md:text-5xl text-slate-800 mb-6">
              Tradiție și Inovație în Sudură
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Din 1994, Sudexpert s-a dedicat furnizării celor mai bune produse de sudură pentru
              profesioniști și entuziaști din România. Cu peste 30 de ani de experiență, am
              construit relații de încredere cu cei mai mari producători din lume.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Misiunea noastră este să oferim calitate excepțională, consultanță de specialitate
              și servicii impecabile pentru fiecare client. Fiecare produs este atent selectat
              pentru a îndeplini cele mai înalte standarde.
            </p>

            {/* Checkmarks */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                "Produse certificate",
                "Prețuri competitive",
                "Consultanță gratuită",
                "Livrare națională",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/despre">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors shadow-lg"
              >
                Află Mai Multe
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="bebas-neue-regular text-4xl md:text-5xl text-slate-800 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: Testimonials
// ============================================
function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Mihai Popescu",
      role: "Inginer Sudor, SC MetalWorks SRL",
      content: "Colaborăm cu Sudexpert de peste 5 ani. Calitatea produselor și profesionalismul echipei sunt de neegalat. Livrările sunt întotdeauna la timp.",
      rating: 5,
      avatar: "MP",
    },
    {
      name: "Elena Gheorghiu",
      role: "Manager Achiziții, Industrial Pro",
      content: "Cel mai bun furnizor cu care am lucrat. Prețuri excelente, consultanță de specialitate și suport post-vânzare impecabil. Recomand cu încredere!",
      rating: 5,
      avatar: "EG",
    },
    {
      name: "Alexandru Radu",
      role: "Proprietar, Atelier Radu",
      content: "De când am descoperit Sudexpert, nu mai cumpăr de altundeva. Gama variată de produse și calitatea constantă mă fac să revin de fiecare dată.",
      rating: 5,
      avatar: "AR",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 uppercase tracking-widest mb-4">
            Recenzii
          </span>
          <h2 className="bebas-neue-regular text-4xl md:text-5xl lg:text-6xl text-slate-800 mb-4">
            Ce Spun Clienții
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Peste 10.000 de clienți mulțumiți ne-au ales ca partener de încredere
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="h-full bg-white rounded-2xl p-8 shadow-soft border border-slate-100 hover:shadow-lg hover:border-orange-100 transition-all">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-orange-200 mb-6" />

                {/* Content */}
                <p className="text-slate-600 leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: CTA Banner
// ============================================
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="bebas-neue-regular text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Pregătit Să Începi?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Descoperă gama completă de produse profesionale pentru sudură.
            Calitate garantată, prețuri competitive, livrare rapidă.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/magazin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-orange-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
              >
                Explorează Magazinul
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-transparent text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Contactează-ne
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: Newsletter
// ============================================
function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="bebas-neue-regular text-3xl md:text-4xl text-slate-800 mb-4">
            Abonează-te la Newsletter
          </h2>
          <p className="text-slate-500 mb-8">
            Primește primii informații despre oferte speciale, produse noi și sfaturi de la experți.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adresa ta de email"
              className="flex-1 h-14 px-6 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="h-14 px-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-orange hover:shadow-lg transition-shadow"
            >
              Abonează-te
            </motion.button>
          </form>

          <p className="text-xs text-slate-400 mt-4">
            Prin abonare, ești de acord cu{" "}
            <Link href="/privacy" className="text-orange-500 hover:underline">
              Politica de Confidențialitate
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedBySection />
      <FeaturedProductsSection />
      <CategoriesSection />
      <FeaturesSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection />
    </main>
  );
}
