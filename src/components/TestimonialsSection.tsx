'use client';
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t.testimonials.testimonial1.name,
      role: t.testimonials.testimonial1.role,
      content: t.testimonials.testimonial1.content,
      rating: 5,
    },
    {
      name: t.testimonials.testimonial2.name,
      role: t.testimonials.testimonial2.role,
      content: t.testimonials.testimonial2.content,
      rating: 5,
    },
    {
      name: t.testimonials.testimonial3.name,
      role: t.testimonials.testimonial3.role,
      content: t.testimonials.testimonial3.content,
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container px-4 mx-auto relative z-10">
        <ScrollReveal width="100%" className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">{t.testimonials.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              className="h-full"
              width="100%"
              viewportAmount={0.2}
            >
              <div
                className="bg-card p-8 rounded-3xl shadow-soft border border-border/50 h-full flex flex-col relative group hover:shadow-card transition-all duration-300"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-foreground/80 mb-6 flex-grow italic">
                  &quot;{testimonial.content}&quot;
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
