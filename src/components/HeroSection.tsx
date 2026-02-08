'use client';
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import placeholderImages from "@/lib/placeholder-images.json";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: "800+", label: t.hero.happyClients },
    { value: "180+", label: t.hero.projectsCompleted },
  ];

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative bg-secondary/30 overflow-hidden pt-24 md:pt-28">
      {/* Background Image */}
      <div className="absolute inset-x-0 top-0 bottom-0 z-0 px-1 md:px-2 pt-1">
        <div className="relative mx-auto w-full max-w-full h-[calc(100%-0.25rem)] rounded-3xl border-4 border-white overflow-hidden">
          <div className="absolute inset-x-0 -top-12 bottom-0">
            <Image
              src="/assets/HeroBG.png"
              alt="Professional cleaning background"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-10" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl z-10" />

      <div className="relative z-20 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
          {/* Left Content */}
          <motion.div
            style={{ y: yContent, opacity }}
            className="space-y-8 animate-slide-in-from-left will-change-transform"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.hero.badge}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              {t.hero.title}{" "}
              <span className="text-gradient">{t.hero.titleHighlight}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/services">
                <Button variant="hero" size="xl">
                  {t.hero.cta}
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4">
              {[t.hero.expertTeam, t.hero.qualityService, t.hero.affordablePrices].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6 pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center bg-card rounded-xl px-6 py-3 shadow-card">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            style={{ y: yImage, opacity }}
            className="relative flex justify-center lg:justify-end animate-slide-in-from-right will-change-transform"
          >
            <div className="relative">
              {/* Decorative blob */}
              <div className="absolute inset-0 bg-primary/10 blob-shape scale-100" />

              {/* Main image */}
              <Image
                src={placeholderImages.hero.cleaning.src}
                alt="Professional cleaning equipment"
                width={placeholderImages.hero.cleaning.width}
                height={placeholderImages.hero.cleaning.height}
                data-ai-hint={placeholderImages.hero.cleaning.hint}
                className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-lg rounded-3xl shadow-elevated animate-float"
              />

              {/* Floating badge */}
              <div className="absolute -left-4 top-1/4 bg-card rounded-xl p-3 shadow-elevated z-20 animate-fade-in-up">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-base">3+</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.hero.yearsExperience}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
