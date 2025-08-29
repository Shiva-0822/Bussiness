
'use client';

import { OrderPage } from '@/components/order-page';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Products } from '@/components/products';
import { Owner } from '@/components/owner';
import { Features } from '@/components/features';
import { Location } from '@/components/location';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <Hero />
        <Products />
        <section id="order" className="w-full bg-background py-12 md:py-16">
            <div className="container max-w-3xl">
                 <OrderPage />
            </div>
        </section>
        <Owner />
        <Features />
        <Separator className="h-1" />
        <Location />
      </main>

      <Footer />
    </div>
  );
}
