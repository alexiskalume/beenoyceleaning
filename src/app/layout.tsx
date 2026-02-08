import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from './providers';
import SchemaOrg from '@/components/SchemaOrg';

const siteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
const siteName = 'Been Oy - Ammattimaiset siivouspalvelut';
const description = 'Been Oy tarjoaa laadukkaita koti- ja yrityssiivouspalveluita Vantaalla. Asiantunteva tiimi, ympäristöystävälliset tuotteet ja 100 % tyytyväisyystakuu.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: description,
  keywords: ["siivouspalvelu", "kotisiivous", "yrityssiivous", "Vantaa", "Helsinki", "ammattisiivous", "Been Oy", "cleaning service"],
  
  openGraph: {
    type: "website",
    locale: "fi_FI",
    alternateLocale: 'en_US',
    url: siteUrl,
    title: siteName,
    description: description,
    images: [
      {
        url: '/assets/service-residential.jpg', // Using a landscape-friendly image for OG
        width: 1200,
        height: 630,
        alt: 'Puhdas ja siisti olohuone, Been Oy siivouspalvelu',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: description,
    images: [`${siteUrl}/assets/service-residential.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The language context is client-side, so we can't dynamically set the lang attribute here for SEO.
  // Defaulting to 'fi' as it's the primary language of the business. The client-side will handle toggling.
  return (
    <html lang="fi" className="scroll-smooth">
      <body>
        <Providers>
            <Header />
            <main>{children}</main>
            <Footer />
        </Providers>
        <SchemaOrg />
      </body>
    </html>
  );
}
