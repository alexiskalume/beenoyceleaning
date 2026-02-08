import ServicesSection from "@/components/ServicesSection";
import { Metadata } from "next";
import { translations } from "@/lib/translations";
import { Sparkles } from "lucide-react";

const t = translations.fi; // For metadata

export const metadata: Metadata = {
  title: t.nav.services,
  description: t.services.description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `${t.nav.services} | Been Oy`,
    description: t.services.description,
    url: "/services",
  },
};

import PageHero from "@/components/ui/PageHero";

const ServicesPage = () => {
  return (
    <>
      <PageHero
        title={t.services.title}
        description={t.services.description}
      />

      {/* Services Section */}
      <ServicesSection showTitle={false} />
    </>
  );
};

export default ServicesPage;
