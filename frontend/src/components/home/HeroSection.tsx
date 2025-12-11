"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sparksContainerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgImageRef.current, {
        scale: 1.15,
        x: -30,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(glowRef.current, {
        opacity: 0.8,
        scale: 2,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.from(badgeRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
      });

      const titleChars = titleRef.current?.querySelectorAll(".char");
      if (titleChars) {
        gsap.from(titleChars, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          stagger: 0.03,
          duration: 1,
          ease: "power4.out",
          delay: 0.3,
        });
      }

      gsap.to(".masterpiece", {
        textShadow:
          "0 0 10px rgba(255, 107, 0, 0.8), 0 0 40px rgba(255, 107, 0, 0.4)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      });

      const buttons = buttonsRef.current?.querySelectorAll("a");
      if (buttons && buttons.length > 0) {
        gsap.fromTo(
          buttons,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            stagger: 0,
            duration: 0.8,
            delay: 1.2,
            ease: "power3.out",
          }
        );
      }

      const statNumbers = statsRef.current?.querySelectorAll(".stat-number");
      if (statNumbers) {
        gsap.from(statNumbers, {
          opacity: 0,
          scale: 0.5,
          stagger: 0.15,
          duration: 0.8,
          delay: 1.5,
          ease: "back.out(1.7)",
        });
      }

      const weldingPoints = [
        { x: 20, width: 4 },
        { x: 35, width: 3 },
        { x: 50, width: 5 },
        { x: 65, width: 7 },
        { x: 80, width: 8 },
      ];

      const createSpark = () => {
        if (!sparksContainerRef.current) return;

        const spark = document.createElement("div");
        spark.className = "spark";
        sparksContainerRef.current.appendChild(spark);

        const weldPoint = weldingPoints[Math.floor(Math.random() * weldingPoints.length)];
        
        const startX = weldPoint.x + (Math.random() - 0.5) * weldPoint.width;
        const startY = 75 + Math.random() * 15;
        
        const distanceFromCenter = startX - weldPoint.x;
        const expansionMultiplier = 2;
        const endX = startX + (distanceFromCenter * expansionMultiplier) + (Math.random() - 0.5) * 3;
        const endY = 5 + Math.random() * 25;

        const duration = 1.8 + Math.random() * 1.2;

        gsap.set(spark, {
          left: `${startX}%`,
          top: `${startY}%`,
          scale: Math.random() * 0.6 + 0.9,
          opacity: 0.6,
        });

        gsap.to(spark, {
          top: `${endY}%`,
          scale: 0.1,
          duration: duration,
          ease: "none",
          onComplete: () => spark.remove(),
        });

        gsap.to(spark, {
          left: `${endX}%`,
          duration: duration,
          ease: "power1.out",
        });

        gsap.to(spark, {
          opacity: 0,
          duration: duration * 0.6,
          delay: duration * 0.4,
          ease: "power2.out",
        });
      };

      const sparkInterval = setInterval(createSpark, 80);

      return () => clearInterval(sparkInterval);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      className="relative h-[90vh] min-h-[600px] w-full overflow-hidden"
    >
      <div ref={glowRef} className="hero-glow" />

      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgImageRef} className="absolute inset-0 scale-110">
          <img
            src="/hero-background.png"
            alt="Professional welder at work"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div
        ref={sparksContainerRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      <div className="container relative mx-auto px-4 md:px-8 lg:px-20 h-full flex items-center">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          {/* <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/10 border border-orange-600/20"
          >
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-400">
              Echipamente Profesionale de Sudură
            </span>
          </div> */}

          <h1
            ref={titleRef}
            className="bebas-neue-regular text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none text-white"
          >
            {splitText("PERFORMANȚĂ IN")}
            <span className="block text-orange-500 masterpiece">
              {splitText("SUDURĂ")}
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-2xl font-light md:text-3xl text-neutral-400 max-w-3xl leading-relaxed"
          >
            Echipamente de sudură premium, proiectate pentru precizie și
            durabilitate. Alese de profesioniști care caută excelență.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/magazin"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-8 py-4 text-lg font-semibold text-white hover:bg-orange-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Explorează Produsele
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/despre"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-transparent px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
            >
              Despre Noi
            </Link>
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20"
          >
            <div>
              <div className="stat-number bebas-neue-regular text-4xl md:text-6xl text-orange-500">
                30+
              </div>
              <div className="text-sm md:text-xl text-gray-300">Ani de Experiență</div>
            </div>
            <div>
              <div className="stat-number bebas-neue-regular text-4xl md:text-6xl text-orange-500">
                100+
              </div>
              <div className="text-sm md:text-xl text-gray-300">Produse</div>
            </div>
            <div>
              <div className="stat-number bebas-neue-regular text-4xl md:text-6xl text-orange-500">
                24/7
              </div>
              <div className="text-sm md:text-xl text-gray-300">Suport Tehnic</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
