'use client';
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PageHeroProps {
    title: string;
    description?: string;
    imageSrc?: string;
    className?: string;
}

const PageHero = ({
    title,
    description,
    imageSrc = "/placeholder-hero.jpg",
    className
}: PageHeroProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={ref} className={cn("relative w-full h-[400px] flex items-center justify-center overflow-hidden mb-8", className)}>
            {/* Background Image Container */}
            <motion.div
                style={{ y: yBg }}
                className="absolute inset-0 z-0 scale-110 will-change-transform"
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 container mx-auto px-4 text-center text-white will-change-transform"
            >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {title}
                </h1>
                {description && (
                    <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
                        {description}
                    </p>
                )}
            </motion.div>
        </div>
    );
};

export default PageHero;
