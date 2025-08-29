
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative -mt-16 h-[70vh] w-full">
      <Image
        src="/images/hero.jpg"
        alt="Golden sunflower oil"
        fill
        className="object-cover"
        data-ai-hint="sunflower field"
        priority
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-end bg-black/60 pb-20 text-center text-primary-foreground md:pb-24">
        <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl text-white">
          Freedom Refined Sunflower Oil – Pure, Light, and Healthy for Your Family.
        </h1>
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
