'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CheckCircle, Home, Building2, Sparkles, Wind, Car, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import { Translations } from "@/lib/translations";

type ServiceKey = keyof Omit<Translations['services'], 'subtitle' | 'title' | 'description' | 'learnMore'>;

const ICONS: { [key in ServiceKey]: React.ElementType } = {
    residential: Home,
    commercial: Building2,
    deep: Sparkles,
    windows: Wind,
    vehicle: Car,
    eco: Leaf,
};

const ServiceDetailsClient = ({ serviceKey }: { serviceKey: ServiceKey }) => {
    const { t } = useLanguage();
    const service = t.services[serviceKey];

    const allServiceKeys = Object.keys(ICONS) as ServiceKey[];
    const otherServices = allServiceKeys.filter(key => key !== serviceKey).slice(0, 3);

    if (!service) {
        // This should technically be caught by the parent Server Component,
        // but as a fallback, we can use notFound.
        notFound();
    }

    return (
        <div className="bg-background">
            <PageHero
                title={service.title}
                description={service.description}
            />

            {/* Breadcrumbs */}
            <div className="bg-card py-3 border-b border-border">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
                        <ChevronRight className="w-4 h-4 mx-1" />
                        <Link href="/services" className="hover:text-primary transition-colors">{t.nav.services}</Link>
                        <ChevronRight className="w-4 h-4 mx-1" />
                        <span className="font-medium text-foreground">{service.title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-4">{t.servicePage.aboutTitle}</h2>
                            <div className="prose prose-lg max-w-none text-muted-foreground">
                                <p>{service.detailedDesc}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-6">{t.servicePage.featuresTitle}</h3>
                            <div className="space-y-4">
                                {service.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                            <CheckCircle className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-8 lg:sticky lg:top-24 h-fit">
                        <div className="bg-card p-6 rounded-2xl shadow-card">
                            <h3 className="text-xl font-bold mb-4">{t.servicePage.ctaTitle}</h3>
                            <p className="text-muted-foreground mb-6">{t.servicePage.ctaDesc}</p>
                            <Link href="/#contact">
                                <Button variant="hero" className="w-full">{t.nav.freeQuote}</Button>
                            </Link>
                        </div>

                        <div className="bg-card p-6 rounded-2xl shadow-card">
                            <h3 className="text-xl font-bold mb-4">{t.servicePage.otherServicesTitle}</h3>
                            <div className="space-y-2">
                                {otherServices.map(key => {
                                    const otherService = t.services[key];
                                    const Icon = ICONS[key];
                                    return (
                                        <Link href={`/services/${key}`} key={key} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-secondary-foreground" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{otherService.title}</h4>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto flex-shrink-0" />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsClient;
