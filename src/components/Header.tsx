'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import placeholderImages from "@/lib/placeholder-images.json";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/#about", label: t.nav.about },
    { href: "/#pricing", label: t.nav.pricing },
    { href: "/#contact", label: t.nav.contact },
  ];

  const languages = [
    { code: "fi", name: "Suomi", flag: "🇫🇮" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  const selectedLanguage = languages.find(lang => lang.code === language);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "pt-2" : "pt-4"
      )}
    >
      <div
        className={cn(
          "container mx-auto px-6 md:px-10 transition-all duration-500 rounded-full",
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg border border-white/20 max-w-[95%] md:max-w-6xl"
            : "bg-white/10 backdrop-blur-sm border border-white/10 max-w-[98%] md:max-w-7xl"
        )}
      >
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={placeholderImages.header.logo.src}
              alt="Been Oy"
              width={placeholderImages.header.logo.width}
              height={placeholderImages.header.logo.height}
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "transition-colors font-medium text-sm relative group",
                  isScrolled ? "text-slate-700 hover:text-primary" : "text-white hover:text-white/80"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right side - Phone, Language, CTA, Menu */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Phone - hidden on mobile */}
            <a
              href={`tel:${t.contact.phoneValue}`}
              className={cn(
                "hidden md:flex items-center gap-2 transition-colors",
                isScrolled ? "text-slate-600 hover:text-primary" : "text-white hover:text-white/80"
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="font-semibold text-sm hidden lg:inline">{t.contact.phoneValue}</span>
            </a>

            {/* Language Switcher - always visible */}
            <div className="flex items-center gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as "en" | "fi")}
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-1.5 rounded-full border transition-all duration-300",
                    language === lang.code
                      ? isScrolled
                        ? "border-primary bg-primary text-white shadow-sm"
                        : "border-primary bg-primary text-white shadow-sm"
                      : isScrolled
                      ? "border-slate-200 bg-white/50 hover:bg-white shadow-sm"
                      : "border-white/20 bg-white/40 hover:bg-white/60 backdrop-blur-sm"
                  )}
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">{lang.code}</span>
                </button>
              ))}
            </div>

            {/* CTA Button - hidden on mobile */}
            <Link href="/calculator" className="hidden md:flex">
              <Button variant="hero" size="sm" className="h-9 px-5 text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all active:scale-95">
                {t.nav.freeQuote}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "lg:hidden p-2 rounded-full transition-colors",
                isScrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/20"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-[calc(100%+8px)] left-0 right-0 bg-white/95 backdrop-blur-xl border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300 rounded-[2rem] shadow-2xl p-6 mx-2">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-slate-800 hover:text-primary hover:bg-slate-50 transition-all font-semibold px-4 py-3 rounded-2xl text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              
              {/* Language Switcher in Mobile Menu */}
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Language:</span>
                <div className="flex items-center gap-1.5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as "en" | "fi")}
                      className={cn(
                        "flex items-center gap-1 px-2 py-1.5 rounded-full border transition-all duration-300",
                        language === lang.code
                          ? "border-primary bg-primary text-white shadow-sm"
                          : "border-slate-200 bg-white/50 hover:bg-white shadow-sm"
                      )}
                    >
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span className="font-bold text-[10px] uppercase tracking-wider">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <a
                href={`tel:${t.contact.phoneValue}`}
                className="flex items-center justify-between gap-2 text-slate-700 bg-slate-50 px-4 py-3 rounded-2xl text-sm font-medium"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{t.contact.phoneValue}</span>
                </div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Call Now</span>
              </a>
              <Link href="/calculator" className="mt-4 w-full" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" className="w-full h-12 text-base font-bold rounded-2xl shadow-xl">
                  {t.nav.freeQuote}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
