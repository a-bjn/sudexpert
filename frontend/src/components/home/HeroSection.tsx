"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Shield, Truck, Award, Sparkles, ChevronDown } from "lucide-react";

// Floating Badge - uses CSS animation instead of Framer Motion infinite loop
function FloatingBadge({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute glass rounded-2xl shadow-soft-lg animate-float ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const LOOP_END_SECONDS = 5;

  // Lazy video: load src and play only when hero enters viewport (saves initial bandwidth/CPU)
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let hasLoaded = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasLoaded) {
              video.src = "/welder-scene.mp4";
              hasLoaded = true;
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "100px", threshold: 0.01 }
    );
    observer.observe(container);

    const onTimeUpdate = () => {
      if (video.currentTime >= LOOP_END_SECONDS) video.currentTime = 0;
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") video.play().catch(() => {});
      else video.pause();
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      video.removeEventListener("timeupdate", onTimeUpdate);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
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

  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    })
  };

  const titleWords = ["EXCELENȚĂ", "ÎN SUDURĂ"];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-orange-50/30"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs - CSS animations (no GSAP) */}
        <div className="gradient-orb-1 animate-orb-1 absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-orange-200/40 to-amber-100/30 rounded-full blur-2xl will-change-transform" />
        <div className="gradient-orb-2 animate-orb-2 absolute top-1/3 -right-32 w-[400px] h-[400px] bg-gradient-to-bl from-blue-100/30 to-sky-50/20 rounded-full blur-2xl will-change-transform" />
        <div className="gradient-orb-3 animate-orb-3 absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-gradient-to-t from-orange-100/30 to-transparent rounded-full blur-2xl will-change-transform" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center w-full py-16 sm:py-20">

          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5 sm:space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Echipamente Premium de Sudură
              </span>
            </motion.div>

            {/* Main Title - word-level animation (lighter than per-letter) */}
            <div className="overflow-hidden">
              <h1 className="bebas-neue-regular text-8xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.85]">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className={`block ${i === 1 ? "gradient-text mt-2" : "text-slate-800"}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed"
            >
              Descoperă echipamente de sudură de înaltă calitate, alese de
              <span className="text-orange-600 font-semibold"> profesioniști</span> pentru
              precizie și durabilitate excepționale.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4"
            >
              <Link href="/magazin" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-orange-500 text-white rounded-2xl font-semibold text-base sm:text-lg shadow-orange overflow-hidden min-h-[48px]"
                >
                  <span className="relative z-10">Explorează Magazinul</span>
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <Link href="/despre" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-slate-700 rounded-2xl font-semibold text-base sm:text-lg border-2 border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors shadow-soft min-h-[48px]"
                >
                  <Play className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span>Despre Noi</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-8 border-t border-slate-200"
            >
              {[
                { value: 30, suffix: "+", label: "Ani Experiență" },
                { value: 500, suffix: "+", label: "Produse" },
                { value: 1000, suffix: "+", label: "Clienți" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="bebas-neue-regular text-2xl sm:text-3xl md:text-4xl text-slate-800">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Creative Image (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Decorative Ring - hidden on mobile */}
            <div className="absolute w-[110%] h-[110%] rounded-full border-2 border-dashed border-orange-200/50 animate-rotate-slow hidden lg:block" />

            {/* Outer Glow */}
            <div className="absolute w-[90%] h-[90%] bg-gradient-to-br from-orange-400/20 to-amber-300/10 rounded-full blur-2xl animate-pulse-glow hidden lg:block" />

            {/* Video – flipped horizontally, no overlays */}
            <div
              ref={imageRef}
              className="relative w-full max-w-md mx-auto lg:w-[85%] lg:max-w-none aspect-square overflow-hidden rounded-2xl shadow-xl animate-morph"
            >
              <video
                ref={videoRef}
                poster="/hero-background.png"
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                className="w-full h-full object-cover scale-x-[-1]"
                aria-hidden
                style={{ backgroundColor: "var(--color-slate-100, #f1f5f9)" }}
              />
            </div>

            {/* Floating Badges - hidden on mobile to avoid overflow */}
            <FloatingBadge
              className="p-4 -left-8 top-[15%] hidden lg:block"
              delay={1}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Garanție</div>
                  <div className="text-sm text-slate-500">2 Ani</div>
                </div>
              </div>
            </FloatingBadge>

            <FloatingBadge
              className="p-4 -right-4 top-[35%] hidden lg:block"
              delay={1.3}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Livrare</div>
                  <div className="text-sm text-slate-500">24-48h</div>
                </div>
              </div>
            </FloatingBadge>

            <FloatingBadge
              className="p-4 -left-4 bottom-[20%] hidden lg:block"
              delay={1.6}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Calitate</div>
                  <div className="text-sm text-slate-500">Premium</div>
                </div>
              </div>
            </FloatingBadge>
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
