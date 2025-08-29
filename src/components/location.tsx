
'use client';

import { Button } from '@/components/ui/button';
import { Map } from 'lucide-react';

export function Location() {
  return (
    <section id="location" className="w-full py-12 md:py-16">
      <div className="container flex flex-col items-center">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">Find Us Here</h2>
        <div className="w-full max-w-4xl">
          <iframe
            src="https://maps.google.com/maps?q=Hugar%20Complex,Kotturu&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '0.5rem' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Guru Kottureshwara Shop Location"
          ></iframe>
        </div>
        <Button asChild className="mt-6">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Hugar+Complex,Kotturu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Map className="mr-2 h-5 w-5" />
            Get Directions
          </a>
        </Button>
      </div>
    </section>
  );
}
