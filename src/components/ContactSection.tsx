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

        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="grid md:grid-cols-3 gap-6 items-start">
              {/* Left - Contact Information without card */}
              <div className="md:col-span-1 space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.infoTitle}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{t.contact.phone}</div>
                      <a href="tel:+358468466704" className="text-gray-600 hover:text-blue-600">
                        +358 46 8466704
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{t.contact.email}</div>
                      <a href="mailto:cleaning@been.fi" className="text-gray-600 hover:text-blue-600">
                        cleaning@been.fi
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{t.contact.address}</div>
                      <p className="text-gray-600 leading-relaxed">
                        Santaradantie 7 C 49<br />
                        01370 Vantaa, Suomi
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{t.contact.hours}</div>
                      <p className="text-gray-600 leading-relaxed">
                        {t.contact.hoursValue}<br />
                        {t.contact.hoursWeekend}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats section */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600 mb-1">24/7</div>
                      <div className="text-gray-600 text-sm">Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600 mb-1">100%</div>
                      <div className="text-gray-600 text-sm">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600 mb-1">5+</div>
                      <div className="text-gray-600 text-sm">Years</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Contact Form */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-8">Get in Touch</h3>
                  <form className="space-y-8">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                        {t.contact.form.fullName}
                      </label>
                      <Input id="name" placeholder={t.contact.form.yourName} className="w-full border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 h-12" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                        {t.contact.form.emailLabel}
                      </label>
                      <Input id="email" type="email" placeholder={t.contact.form.emailPlaceholder} className="w-full border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 h-12" />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-3">
                        {t.contact.form.subject}
                      </label>
                      <Input id="subject" placeholder={t.contact.form.subjectPlaceholder} className="w-full border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 h-12" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                        {t.contact.form.messageLabel}
                      </label>
                      <Textarea
                        id="message"
                        placeholder={t.contact.form.messagePlaceholder}
                        className="w-full border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 min-h-[140px] resize-none"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-medium">
                      {t.contact.form.submit}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
