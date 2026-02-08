"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <ScrollReveal width="100%" className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">{t.contact.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <ScrollReveal direction="left" className="h-full">
            <div className="bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground h-full shadow-elevated">
              <h3 className="text-2xl font-bold mb-8">{t.contact.infoTitle}</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">{t.contact.phone}</div>
                    <a href="tel:+358468466704" className="opacity-90 hover:opacity-100 transition-opacity">
                      +358 46 8466704
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">{t.contact.email}</div>
                    <a href="mailto:cleaning@been.fi" className="opacity-90 hover:opacity-100 transition-opacity">
                      cleaning@been.fi
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">{t.contact.address}</div>
                    <p className="opacity-90">
                      Santaradantie 7 C 49<br />
                      01370 Vantaa, Suomi
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">{t.contact.hours}</div>
                    <p className="opacity-90">
                      {t.contact.hoursValue}<br />
                      {t.contact.hoursWeekend}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" className="h-full" delay={0.2}>
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card h-full">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">
                      {t.contact.form.fullName}
                    </label>
                    <Input id="name" placeholder={t.contact.form.yourName} className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">
                      {t.contact.form.emailLabel}
                    </label>
                    <Input id="email" type="email" placeholder={t.contact.form.emailPlaceholder} className="bg-background" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground ml-1">
                    {t.contact.form.subject}
                  </label>
                  <Input id="subject" placeholder={t.contact.form.subjectPlaceholder} className="bg-background" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">
                    {t.contact.form.messageLabel}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t.contact.form.messagePlaceholder}
                    className="bg-background min-h-[150px] resize-none"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  {t.contact.form.submit} <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
