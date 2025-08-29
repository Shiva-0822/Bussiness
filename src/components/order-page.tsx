
"use client";

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Droplet,
  Home,
  Loader2,
  MapPin,
  Phone,
  UserRound,
  Warehouse,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number.'),
  deliveryAddress: z
    .string()
    .min(10, 'Please enter a complete delivery address.'),
  location: z.string().min(2, 'Please enter your city or area.'),
  product: z.string({ required_error: 'Please select a product.' }),
  quantity: z.coerce
    .number()
    .min(1, 'Please enter a valid quantity.')
    .positive('Quantity must be a positive number.'),
});

type FormValues = z.infer<typeof formSchema>;

const products = ['Freedom Refined Sunflower Oil (1L Pouch)', 'Freedom Refined Sunflower Oil (5L Can)', 'Freedom Refined Sunflower Oil (15L Tin)'];

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z" />
    </svg>
  );

export function OrderPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      deliveryAddress: '',
      location: '',
      quantity: 1,
    },
  });

  function onSubmit(data: FormValues) {
    setIsLoading(true);
    const ownerNumber = '8088097066'; // Owner WhatsApp number
    const message = `New Order from Guru Kottureshwara Shop!\n\n*Customer:* ${data.name}\n*Phone:* ${data.phoneNumber}\n\n*Product:* ${data.product}\n*Quantity:* ${data.quantity}\n\n*Address:* ${data.deliveryAddress}\n*Location:* ${data.location}`;
    const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
      form.reset();
    }, 1500);
  }
  
  function handleReset() {
    setIsSuccess(false);
  }


  return (
    <>
      <div className="w-full">
        <div className="text-center px-0">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Order Your Freedom Oil</h2>
          <p className="text-md pt-2 text-muted-foreground">
            Fill in your details to get your cooking oil delivered.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
            <div className="space-y-6 p-0 md:p-0">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base md:text-lg">Full Name</FormLabel>
                      <div className="relative">
                        <UserRound className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="h-12 rounded-lg pl-12 border-black border" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base md:text-lg">Phone Number</FormLabel>
                       <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input type="tel" placeholder="e.g., 9876543210" {...field} className="h-12 rounded-lg pl-12 border-black border" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base md:text-lg">Delivery Address</FormLabel>
                     <div className="relative">
                        <Home className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Textarea placeholder="e.g., 123 Main St, Apt 4B, Springfield" {...field} className="rounded-lg pl-12 border-black border" />
                        </FormControl>
                      </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base md:text-lg">City / Area</FormLabel>
                       <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="e.g., Downtown" {...field} className="h-12 rounded-lg pl-12 border-black border" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base md:text-lg">Product</FormLabel>
                       <div className="relative">
                        <Warehouse className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-lg pl-12 border-black border">
                              <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {products.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base md:text-lg">Quantity</FormLabel>
                     <div className="relative">
                        <Droplet className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input type="number" placeholder="e.g., 1" {...field} className="h-12 rounded-lg pl-12 border-black border" />
                        </FormControl>
                      </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="p-0 pt-6 md:p-0 md:pt-6">
              <Button type="submit" disabled={isLoading} className="w-full py-6 text-lg font-bold" size="lg">
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : <WhatsAppIcon className="mr-2 h-6 w-6" />}
                Place Order
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
      <AlertDialog open={isSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Order Submitted!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
             Your order details have been sent to WhatsApp. You will be able to review before sending.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleReset} className="w-full">Place Another Order</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
