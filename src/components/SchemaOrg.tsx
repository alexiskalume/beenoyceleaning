import { translations } from "@/lib/translations";

const SchemaOrg = () => {
  // Hardcoding for SEO, as this is a server component. Using Finnish as primary.
  const siteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Been Oy",
    "image": `${siteUrl}/assets/been-logo.png`, // Using the logo
    "url": siteUrl,
    "telephone": translations.fi.contact.phoneValue,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": translations.fi.contact.addressValue.split(',')[0],
      "addressLocality": "Vantaa",
      "postalCode": "01370",
      "addressCountry": "FI"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 60.3013,
      "longitude": 25.0496
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    },
    "description": translations.fi.about.description,
    "serviceType": "Siivouspalvelu",
    "areaServed": {
      "@type": "City",
      "name": "Vantaa"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "3"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaOrg;
