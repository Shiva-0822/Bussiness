
'use client';

import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

export function Owner() {
  return (
    <section id="owner" className="w-full bg-secondary py-12 md:py-16">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">Meet the Owner</h2>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <div className="relative h-40 w-40 flex-shrink-0">
            <Image
              src="/images/person.jpeg"
              alt="Shop Owner"
              width={160}
              height={160}
              className="h-full w-full rounded-full border-4 border-primary object-cover"
              data-ai-hint="portrait man"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">T. Chandrashekhar</h3>
            <p className="mt-2 text-muted-foreground">
              "I'm passionate about providing our community with high-quality products and friendly service. We've been a part of this neighborhood for years, and we're grateful for your continued support. Thank you for choosing Guru Kottureshwara Shop!"
            </p>
            <div className="mt-4 flex flex-col items-center space-y-2 md:items-start">
              <a
                href="tel:+91821391232901"
                className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="mr-2 h-4 w-4" />
                +91 821391232901
              </a>
              <a
                href="mailto:chandrashekar23@gmail.com"
                className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="mr-2 h-4 w-4" />
                chandrashekar23@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
