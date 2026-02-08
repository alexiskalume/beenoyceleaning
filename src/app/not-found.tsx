'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <div className="text-center p-8">
        <SearchX className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/">
            <Button variant="hero">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
