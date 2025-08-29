import { OrderPage } from '@/components/order-page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Heart, Leaf, Smile } from 'lucide-react';
import Image from 'next/image';

const products = [
  {
    name: 'Olive Oil',
    description: 'Rich, fruity, and perfect for dressings and finishing.',
    image: 'https://picsum.photos/600/400?random=1',
    hint: 'olive oil',
  },
  {
    name: 'Organic Coconut Oil',
    description: 'A healthy and versatile oil for cooking, baking, and beauty.',
    image: 'https://picsum.photos/600/400?random=2',
    hint: 'coconut oil',
  },
  {
    name: 'Avocado Oil',
    description: 'Light, and with a high smoke point for all your cooking needs.',
    image: 'https://picsum.photos/600/400?random=3',
    hint: 'avocado oil',
  },
];

const features = [
  {
    icon: <Leaf className="h-10 w-10 text-primary-foreground" />,
    title: 'Premium Quality',
    description: 'Sourced from the finest ingredients for the best taste and nutrition.',
  },
  {
    icon: <Heart className="h-10 w-10 text-primary-foreground" />,
    title: 'Healthy Choice',
    description: 'Our oils are packed with nutrients to support a healthy lifestyle.',
  },
  {
    icon: <Smile className="h-10 w-10 text-primary-foreground" />,
    title: 'Enhances Flavor',
    description: 'Elevate your dishes with the rich and authentic taste of our oils.',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center">
            <Droplets className="h-8 w-8 text-foreground" />
            <span className="ml-3 text-2xl font-bold">OilFlow</span>
          </div>
          {/* Future navigation can go here */}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] w-full">
          <Image
            src="https://picsum.photos/1920/1280"
            alt="Bottle of olive oil"
            fill
            className="object-cover"
            data-ai-hint="olive oil bottle"
            priority
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/60 text-center text-primary-foreground">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              The Finest Culinary Oils, Delivered.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-primary-foreground/80 md:text-xl">
             From our groves to your kitchen, experience the taste of quality with our premium selection of cooking oils.
            </p>
            <Button size="lg" className="mt-8 px-8 py-6 text-lg font-bold" asChild>
              <a href="#order">Shop Now</a>
            </Button>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="w-full py-16 md:py-24">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">Our Oils</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {products.map((product) => (
                <Card key={product.name} className="group overflow-hidden rounded-xl border-2 shadow-md transition-all duration-300 hover:border-foreground/80 hover:shadow-2xl">
                   <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={product.hint}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full bg-secondary py-16 md:py-24">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">Why Choose Us?</h2>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 text-center md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-foreground text-primary-foreground">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Order Section */}
        <section id="order" className="w-full bg-background py-16 md:py-24">
            <div className="container max-w-3xl">
                 <OrderPage />
            </div>
        </section>

      </main>

      <footer className="w-full bg-foreground text-background">
        <div className="container py-8 text-center">
          <p>© {new Date().getFullYear()} OilFlow. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
