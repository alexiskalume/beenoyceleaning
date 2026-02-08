"use client";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link"; // Added missing import if needed, or remove if not used (it was used in original code but missing in my previous rewrite)

const PricingSection = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t.pricing.basic, // "Basic"
      price: "45€",
      period: t.pricing.perVisit || "/h", // Fallback or use perVisit key
      description: t.pricing.basicDesc,
      features: t.pricing.basicFeatures,
      popular: false,
    },
    {
      name: t.pricing.standard, // "Standard"
      price: "55€",
      period: t.pricing.perVisit || "/h",
      description: t.pricing.standardDesc,
      features: t.pricing.standardFeatures,
      popular: true,
    },
    {
      name: t.pricing.premium, // "Premium"
      price: "65€",
      period: t.pricing.perVisit || "/h",
      description: t.pricing.premiumDesc,
      features: t.pricing.premiumFeatures,
      popular: false,
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container px-4 mx-auto">
        <ScrollReveal width="100%" className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">{t.pricing.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal
              key={plan.name}
              delay={index * 0.1}
              className="h-full"
              width="100%"
              viewportAmount={0.2}
            >
              <div
                className={`relative bg-card rounded-3xl p-8 shadow-card border transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${plan.popular
                  ? "border-primary shadow-elevated scale-105 z-10"
                  : "border-transparent hover:border-primary/20"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {t.pricing.mostPopular}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80">
                      <Check className="w-5 h-5 text-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    }`}
                >
                  {t.pricing.choosePlan}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
