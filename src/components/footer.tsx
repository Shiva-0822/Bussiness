
'use client';

import Image from 'next/image';
import { ShareButtons } from '@/components/share-buttons';

export function Footer() {
  return (
    <footer className="w-full bg-purple-900 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-4">
            <Image src="/images/logo.png" alt="Guru Kottureshwara Shop Logo" width={40} height={40} className="h-10 w-10" />
            <span className="ml-3 text-lg font-bold">Guru Kottureshwara Shop</span>
          </div>
          <p className="mt-2 text-sm text-white/80">
            Your trusted local source for Freedom Refined Sunflower Oil.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#products" className="hover:text-primary transition-colors">Products</a></li>
            <li><a href="#order" className="hover:text-primary transition-colors">Order Now</a></li>
            <li><a href="#location" className="hover:text-primary transition-colors">Our Location</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <p className="mb-2 text-sm">Share our page</p>
          <ShareButtons />
        </div>
      </div>
      <div className="bg-purple-950/50 py-4">
        <div className="container mx-auto text-center text-xs md:text-sm">
          <p className="mb-1">
            📍 Kotturu, Vijayanagara District, Karnataka - 583134
          </p>
          <p>
            © 2025 Guru Kottureshwara Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
