
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Image src="/images/logo.png" alt="Guru Kottureshwara Shop Logo" width={32} height={32} className="h-8 w-8" />
          <span
            className={`ml-3 text-xs font-bold tracking-tight transition-colors ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
          >
            Guru Kottureshwara Shop
          </span>
        </div>
        {/* Future navigation can go here */}
      </div>
    </header>
  );
}
