"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import PriceCalculator from "@/components/calculator/PriceCalculator";
import ScrollReveal from "@/components/ui/ScrollReveal";

import PageHero from "@/components/ui/PageHero";

export default function CalculatorPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen">
            <PageHero
                title={t.calculator.title}
                description={t.calculator.subtitle}
            />

            <div className="container mx-auto px-4 py-12">
                <ScrollReveal delay={0.2} className="max-w-5xl mx-auto">
                    <PriceCalculator />
                </ScrollReveal>
            </div>
        </div>
    );
}
