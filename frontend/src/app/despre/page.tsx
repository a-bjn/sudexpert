"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap, Award, Truck, Headphones, Shield, Users,
  Clock, Target, Heart, ArrowRight,
  Factory, Globe, TrendingUp
} from "lucide-react";

export default function Despre() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { value: "30+", label: "Ani de Experiență", icon: Clock },
    { value: "5000+", label: "Clienți Mulțumiți", icon: Users },
    { value: "10000+", label: "Produse Livrate", icon: Truck },
    { value: "100%", label: "Satisfacție Garantată", icon: Heart },
  ];

  const values = [
    {
      icon: Award,
      title: "Calitate Superioară",
      description: "Oferim doar echipamente și consumabile de la producători de top, garantând durabilitate și performanță excepțională în fiecare produs.",
      color: "bg-orange-500",
    },
    {
      icon: Truck,
      title: "Livrare Rapidă",
      description: "Înțelegem importanța timpului tău. Asigurăm livrare rapidă în toată țara pentru a-ți menține proiectele în mișcare fără întreruperi.",
      color: "bg-blue-500",
    },
    {
      icon: Zap,
      title: "Expertiză Tehnică",
      description: "Echipa noastră de specialiști este pregătită să ofere consultanță tehnică pentru a alege soluția optimă pentru nevoile tale specifice.",
      color: "bg-emerald-500",
    },
    {
      icon: Headphones,
      title: "Suport Dedicat",
      description: "Suntem alături de tine înainte, în timpul și după achiziție. Echipa noastră de suport este mereu disponibilă pentru orice întrebare.",
      color: "bg-purple-500",
    },
    {
      icon: Shield,
      title: "Garanție Extinsă",
      description: "Toate produsele noastre beneficiază de garanție extinsă și politică de returnare flexibilă pentru liniștea ta.",
      color: "bg-rose-500",
    },
    {
      icon: Target,
      title: "Prețuri Competitive",
      description: "Oferim cele mai bune prețuri de pe piață fără a face compromisuri în ceea ce privește calitatea produselor și serviciilor.",
      color: "bg-amber-500",
    },
  ];

  const milestones = [
    { year: "1994", title: "Fondarea Companiei", description: "Sudexpert își începe activitatea în Brăila, România." },
    { year: "2000", title: "Extindere Națională", description: "Deschidem prima noastră rețea de distribuție la nivel național." },
    { year: "2010", title: "10.000 de Clienți", description: "Atingem pragul de 10.000 de clienți mulțumiți." },
    { year: "2020", title: "Transformare Digitală", description: "Lansăm platforma online pentru o experiență modernă de cumpărare." },
    { year: "2024", title: "30 de Ani de Excelență", description: "Celebrăm trei decenii de servicii de calitate în industria sudării." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Decorative Orbs */}
      <div className="absolute top-40 -right-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />

      {/* Hero Section */}
      <div className="relative pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-100 text-orange-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
            >
              <Factory className="w-4 h-4" />
              Din 1994 în serviciul dumneavoastră
            </motion.div>
            <h1 className="bebas-neue-regular text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-800 mb-4 sm:mb-6 px-2">
              Despre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Sudexpert
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed px-2">
              Cu peste 30 de ani de experiență în industria sudării, Sudexpert s-a impus
              ca lider de piață în furnizarea de echipamente și consumabile de sudură de înaltă calitate.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="relative py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-3 sm:mb-4" />
                  <div className="bebas-neue-regular text-3xl sm:text-4xl md:text-5xl text-slate-800 mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-xs sm:text-sm md:text-base">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <div className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6">
                <Globe className="w-4 h-4" />
                Povestea Noastră
              </div>
              <h2 className="bebas-neue-regular text-4xl md:text-5xl text-slate-800 mb-6">
                O Pasiune Pentru Excelență în Sudură
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Fondată în 1994, Sudexpert a început ca o mică afacere de familie cu o viziune
                  clară: să ofere profesioniștilor din domeniul sudării acces la echipamente și
                  consumabile de cea mai înaltă calitate.
                </p>
                <p>
                  De-a lungul anilor, am crescut constant, construind relații de lungă durată
                  cu clienții noștri și parteneri de încredere din întreaga lume. Astăzi, suntem
                  mândri să servim mii de profesioniști în toată România.
                </p>
                <p>
                  Misiunea noastră rămâne neschimbată: să fim partenerul de încredere pentru
                  toți cei care caută excelență în domeniul sudării, oferind produse premium
                  și servicii impecabile.
                </p>
              </div>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
                >
                  Contactează-ne
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/welder.png"
                  alt="Sudexpert - Echipamente de Sudură"
                  fill
                  className="object-cover object-center"
                  priority
                  quality={90}
                />
              </div>
              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100"
              >
                <TrendingUp className="w-8 h-8 text-emerald-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100"
              >
                <Award className="w-8 h-8 text-orange-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="relative py-16 md:py-24 bg-slate-50/50">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              De ce să ne alegi
            </div>
            <h2 className="bebas-neue-regular text-4xl md:text-5xl text-slate-800 mb-4">
              Valorile Noastre
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Ne dedicăm în fiecare zi pentru a oferi cele mai bune servicii și produse clienților noștri.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                  <div className={`w-14 h-14 rounded-xl ${value.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6">
              <Clock className="w-4 h-4" />
              Parcursul nostru
            </div>
            <h2 className="bebas-neue-regular text-4xl md:text-5xl text-slate-800 mb-4">
              Repere Importante
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-amber-500 to-orange-500" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-8 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-12 md:pl-0`}>
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                    <div className="bebas-neue-regular text-2xl text-orange-500 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{milestone.title}</h3>
                    <p className="text-slate-500">{milestone.description}</p>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-orange-500 rounded-full -translate-x-1/2 ring-4 ring-white shadow-lg" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl" />

            <div className="relative text-center">
              <h2 className="bebas-neue-regular text-4xl md:text-5xl text-white mb-4">
                Pregătit să Începi?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Descoperă gama noastră completă de produse și beneficiază de expertiza echipei noastre.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/magazin">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
                  >
                    Vezi Produsele
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                  >
                    Contactează-ne
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
