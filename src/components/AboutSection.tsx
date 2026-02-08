"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import placeholderImages from "@/lib/placeholder-images.json";
import ScrollReveal from "@/components/ui/ScrollReveal";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <ScrollReveal direction="left" duration={0.6}>
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-accent/10 rounded-full text-accent font-medium text-sm">
                {t.about.subtitle}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {t.about.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.about.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 py-4">
                {[
                  t.about.feature1,
                  t.about.feature2,
                  t.about.feature3,
                  t.about.feature4
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1} direction="up" width="100%">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <div className="pt-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {t.nav.contact}
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Image */}
          <ScrollReveal direction="right" duration={0.8} delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-3xl transform rotate-3 -z-10" />
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform -rotate-3 -z-20" />
              <Image
                src={placeholderImages.about.cleanerPortrait.src}
                alt="Been Oy Cleaning Team"
                width={placeholderImages.about.cleanerPortrait.width}
                height={placeholderImages.about.cleanerPortrait.height}
                data-ai-hint={placeholderImages.about.cleanerPortrait.hint}
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
              />

              {/* Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-card hidden md:block animate-float">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-primary">100%</div>
                  <div className="text-sm font-medium text-muted-foreground w-24">
                    {t.about.ofExcellence}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
