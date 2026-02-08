'use client';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import placeholderImages from "@/lib/placeholder-images.json";
import { Translations } from "@/lib/translations";

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/#about", label: t.nav.about },
    { href: "/#pricing", label: t.nav.pricing },
    { href: "/#contact", label: t.nav.contact },
  ];

  type ServiceObjectKey = keyof Omit<Translations['services'], 'subtitle' | 'title' | 'description' | 'learnMore'>;

  const serviceKeys = (Object.keys(t.services) as Array<keyof Translations['services']>)
    .filter((key): key is ServiceObjectKey => typeof t.services[key] === 'object');

  const services = serviceKeys.map(key => t.services[key].title);

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="pb-12 pt-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-green-vogue rounded-3xl text-primary-foreground p-6 md:p-8 pt-16 pb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src={placeholderImages.footer.logo.src}
                  alt="Been logo"
                  width={placeholderImages.footer.logo.width}
                  height={placeholderImages.footer.logo.height}
                  className="w-40 h-auto"
                />
              </Link>
              <p className="text-primary-foreground/70 mb-6">
                {t.footer.tagline}
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-1">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg mb-4">{t.footer.ourServices}</h4>
              <ul className="space-y-1">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-primary-foreground/70 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-4">{t.footer.contact}</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-primary-foreground/70 text-sm">
                    {t.contact.addressValue}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-primary-foreground/70 text-sm">{t.contact.phoneValue}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-primary-foreground/70 text-sm">{t.contact.emailValue}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary-foreground/10 text-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2026 Been Oy. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
