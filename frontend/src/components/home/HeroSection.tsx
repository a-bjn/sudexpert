"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Play, Shield, Truck, Award, Sparkles, ChevronDown, Zap } from "lucide-react";

// Spark Particle Component
function SparkParticle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full"
      initial={{
        opacity: 0,
        scale: 0,
        x: Math.random() * 100 - 50,
        y: 0
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1, 0],
        y: [0, -150 - Math.random() * 100],
        x: [0, (Math.random() - 0.5) * 150]
      }}
      transition={{
        duration: 2 + Math.random(),
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
        ease: "easeOut"
      }}
      style={{
        boxShadow: "0 0 10px rgba(251, 191, 36, 0.8), 0 0 20px rgba(249, 115, 22, 0.5)"
      }}
    />
  );
}

// Floating Badge Component
function FloatingBadge({
  children,
  className = "",
  delay = 0,
  x = 0,
  y = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={`absolute glass rounded-2xl shadow-soft-lg ${className}`}
      initial={{ opacity: 0, scale: 0.8, x: x - 20, y: y + 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        x,
        y: [y, y - 10, y],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        x: { duration: 0.6, delay },
        y: {
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.6
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Animated Counter
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), 1500);
    return () => clearTimeout(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring physics for cursor following (reduced range for smoother effect)
  const springConfig = { damping: 30, stiffness: 120 };
  const imageX = useSpring(useTransform(cursorX, [0, 1], [-8, 8]), springConfig);
  const imageY = useSpring(useTransform(cursorY, [0, 1], [-8, 8]), springConfig);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      cursorX.set((e.clientX - rect.left) / rect.width);
      cursorY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background gradient orbs animation
      gsap.to(".gradient-orb-1", {
        x: 50,
        y: -30,
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".gradient-orb-2", {
        x: -40,
        y: 40,
        scale: 0.9,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".gradient-orb-3", {
        x: 30,
        y: 50,
        scale: 1.1,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.03,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    })
  };

  const titleText = "EXCELENȚĂ";
  const subtitleText = "ÎN SUDURĂ";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-orange-50/30"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="gradient-orb-1 absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-orange-200/40 to-amber-100/30 rounded-full blur-3xl" />
        <div className="gradient-orb-2 absolute top-1/3 -right-32 w-[400px] h-[400px] bg-gradient-to-bl from-blue-100/30 to-sky-50/20 rounded-full blur-3xl" />
        <div className="gradient-orb-3 absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-gradient-to-t from-orange-100/30 to-transparent rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

        {/* Decorative dots */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-40 w-3 h-3 bg-blue-400/50 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-amber-400/60 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-20">

          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Echipamente Premium de Sudură
              </span>
            </motion.div>

            {/* Main Title */}
            <div className="overflow-hidden">
              <h1 className="bebas-neue-regular text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.85]">
                <span className="block text-slate-800">
                  {titleText.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="block gradient-text mt-2">
                  {subtitleText.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed"
            >
              Descoperă echipamente de sudură de înaltă calitate, alese de
              <span className="text-orange-600 font-semibold"> profesioniști</span> pentru
              precizie și durabilitate excepționale.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link href="/magazin">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold text-lg shadow-orange btn-shine overflow-hidden"
                >
                  <span className="relative z-10">Explorează Magazinul</span>
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <Link href="/despre">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-700 rounded-2xl font-semibold text-lg border-2 border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors shadow-soft"
                >
                  <Play className="w-5 h-5 text-orange-500" />
                  <span>Despre Noi</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200"
            >
              {[
                { value: 30, suffix: "+", label: "Ani Experiență" },
                { value: 500, suffix: "+", label: "Produse" },
                { value: 1000, suffix: "+", label: "Clienți" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="bebas-neue-regular text-3xl md:text-4xl text-slate-800">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Creative Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="relative flex items-center justify-center"
          >
            {/* Decorative Ring - CSS animation */}
            <div className="absolute w-[110%] h-[110%] rounded-full border-2 border-dashed border-orange-200/50 animate-rotate-slow" />

            {/* Outer Glow */}
            <div className="absolute w-[90%] h-[90%] bg-gradient-to-br from-orange-400/20 to-amber-300/10 rounded-full blur-2xl animate-pulse-glow" />

            {/* Image Container with Blob Shape - CSS animation for morphing */}
            <motion.div
              ref={imageRef}
              style={{ x: imageX, y: imageY }}
              className="relative w-[85%] aspect-square overflow-hidden shadow-2xl animate-morph"
            >
              {/* Image */}
              <motion.img
                src="/hero-background.png"
                alt="Professional welder at work"
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-transparent to-transparent" />

              {/* Sparks Effect */}
              <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2">
                {[...Array(8)].map((_, i) => (
                  <SparkParticle key={i} delay={i * 0.3} />
                ))}
              </div>
            </motion.div>

            {/* Floating Badges */}
            <FloatingBadge
              className="p-4 -left-8 top-[15%]"
              delay={1}
              x={-32}
              y={0}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Garanție</div>
                  <div className="text-sm text-slate-500">2 Ani</div>
                </div>
              </div>
            </FloatingBadge>

            <FloatingBadge
              className="p-4 -right-4 top-[35%]"
              delay={1.3}
              x={16}
              y={0}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Livrare</div>
                  <div className="text-sm text-slate-500">24-48h</div>
                </div>
              </div>
            </FloatingBadge>

            <FloatingBadge
              className="p-4 -left-4 bottom-[20%]"
              delay={1.6}
              x={-16}
              y={0}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Calitate</div>
                  <div className="text-sm text-slate-500">Premium</div>
                </div>
              </div>
            </FloatingBadge>

            {/* Corner Decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-orange rotate-12"
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-slate-400 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-orange-500" />
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
