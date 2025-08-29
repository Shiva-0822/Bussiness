
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const products = [
    {
      name: 'Freedom Refined Sunflower Oil (1L Pouch)',
      description: 'Perfect for daily cooking, light and healthy. Ideal for families.',
      image: '/images/packet.png',
      hint: 'oil pouch',
    },
    {
      name: 'Freedom Refined Sunflower Oil (5L Can)',
      description: 'Best value for frequent use. Comes in a sturdy, easy-to-store can.',
      image: '/images/tin.png',
      hint: 'oil can',
    },
    {
      name: 'Freedom Refined Sunflower Oil (15L Tin)',
      description: 'Bulk option for businesses or large families, ensuring you never run out.',
      image: '/images/can.png',
      hint: 'oil tin',
    },
  ];
  

export function Products() {
  return (
    <section id="products" className="w-full py-12 md:py-16">
      <div className="container">
        <h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl">Our Products</h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          {products.map((product) => (
            <Card key={product.name} className="group overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint={product.hint}
                />
              </div>
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-semibold">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-xs text-muted-foreground">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
