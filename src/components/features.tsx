
'use client';

import { ThumbsUp, Truck, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: <ThumbsUp className="h-6 w-6 text-accent-foreground" />,
    title: 'Trusted Quality',
    description: 'We supply only genuine Freedom Refined Sunflower Oil, a brand you trust.',
  },
  {
    icon: <Truck className="h-6 w-6 text-accent-foreground" />,
    title: 'Fast Local Delivery',
    description: 'Get your cooking oil delivered straight to your doorstep, quickly and reliably.',
  },
  {
    icon: <HeartHandshake className="h-6 w-6 text-accent-foreground" />,
    title: 'Friendly Service',
    description: 'As your local neighborhood shop, we are committed to your satisfaction.',
  },
];

export function Features() {
  return (
    <section id="features" className="w-full bg-background py-12 md:py-16">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">Why Choose Us?</h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 text-center md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md">
                {feature.icon}
              </div>
              <h3 className="mt-2 text-base font-bold">{feature.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
