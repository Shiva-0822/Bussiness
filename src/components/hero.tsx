
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative -mt-14 h-[70vh] w-full">
      <Image
        src="/images/oil.jpg"
        alt="Golden sunflower oil"
        fill
        className="object-cover"
        data-ai-hint="sunflower field"
        priority
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/60 text-center text-primary-foreground">
        <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl text-white">
          The Healthy Choice for a Happy Family.
        </h1>
        <p className="mt-6 max-w-3xl text-base text-white/80 md:text-lg">
          Your trusted local source for Freedom Refined Sunflower Oil. Pure, light, and healthy cooking for your loved ones.
        </p>
        <Button
          size="lg"
          className="mt-8 bg-primary px-10 py-7 text-xl font-bold text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <a href="#order">Place Your Order</a>
        </Button>
      </div>
    </section>
  );
}
