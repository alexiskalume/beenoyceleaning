import { translations } from "@/lib/translations";
import placeholderImages from "@/lib/placeholder-images.json";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ServiceDetailsClient from "./ServiceDetailsClient";

type ServiceKey = keyof Omit<typeof translations.en.services, 'subtitle' | 'title' | 'description' | 'learnMore'>;

// Generate static routes for all services
// Helper to get valid service keys
function getServiceKeys(locale: string = 'en') {
  const t = translations[locale as keyof typeof translations] || translations.en;
  return Object.keys(t.services).filter(key =>
    key !== 'title' &&
    key !== 'subtitle' &&
    key !== 'description' &&
    key !== 'learnMore'
  );
}

export async function generateStaticParams() {
  const keys = getServiceKeys('en');
  return keys.map((key) => ({
    serviceId: key,
  }));
}

// Generate dynamic metadata for each service page
export async function generateMetadata({ params }: { params: Promise<{ serviceId: string }> }): Promise<Metadata> {
  const { serviceId } = await params;

  // Type assertion to ensure serviceId is a valid key
  const serviceKey = serviceId as keyof typeof placeholderImages.services;

  const t = translations.fi; // Using Finnish for primary metadata
  const service = t.services[serviceKey];

  if (!service) {
    return { title: "Palvelua ei löytynyt" };
  }

  const siteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const title = service.title;
  const description = service.description;
  const imageUrl = `${siteUrl}${placeholderImages.services[serviceKey]?.src}`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `/services/${serviceId}`,
    },
    openGraph: {
      title: `${title} | Been Oy`,
      description: description,
      url: `${siteUrl}/services/${serviceId}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Been Oy`,
      description: description,
      images: [imageUrl],
    },
  };
}


const ServicePage = async ({ params }: { params: Promise<{ serviceId: string }> }) => {
  const { serviceId } = await params;
  // Type assertion to ensure serviceId is a valid key
  const serviceKey = serviceId as ServiceKey;

  // Validate if the service exists before rendering
  if (!translations.en.services[serviceKey]) {
    notFound();
  }

  return <ServiceDetailsClient serviceKey={serviceKey} />;
};

export default ServicePage;
