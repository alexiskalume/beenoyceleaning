"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Translations } from "@/lib/translations";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

// Define the keys that correspond to actual service objects in the translations
type ServiceKey = keyof Omit<Translations['services'], 'subtitle' | 'title' | 'description' | 'learnMore'>;

interface ServicesSectionProps {
  showTitle?: boolean;
}

const ServicesSection = ({ showTitle = true }: ServicesSectionProps) => {
  const { t } = useLanguage();

  // Filter keys to only include actual service objects
  const serviceKeys = (Object.keys(t.services) as Array<keyof Translations['services']>).filter(key => {
    // Runtime check to ensure the key exists in translations and is an object
    return typeof t.services[key] === 'object';
  });

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        {showTitle && (
          <ScrollReveal width="100%" className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">{t.services.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </ScrollReveal>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceKeys.map((key, index) => {
            const service = t.services[key];
            // Type guard
            if (typeof service !== 'object' || !('title' in service)) return null;

            // Safe access to placeholder images
            // We cast key to any or verify it matches the placeholder keys
            const imageKey = key as keyof typeof placeholderImages.services;
            const image = placeholderImages.services[imageKey];

            return (
              <ScrollReveal
                key={key}
                delay={index * 0.1}
                width="100%"
                viewportAmount={0.2}
              >
                <Card className="h-full hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 group bg-card border-transparent shadow-card overflow-hidden flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    {image && (
                      <Image
                        src={image.src}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={image.hint}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-foreground/80">
                          <Check className="w-4 h-4 mr-2 text-accent flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/services/${key}`} className="w-full relative z-10">
                      <Button variant="ghost" className="w-full justify-between group-hover:text-primary group-hover:bg-primary/5">
                        {t.services.learnMore || "Learn More"} <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
