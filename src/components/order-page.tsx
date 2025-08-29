"use client";

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Fuel,
  Gauge,
  Home,
  Loader2,
  MapPin,
  PackageCheck,
  Phone,
  Send,
  UserRound,
  MessageCircle,
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  location: z.string().min(2, 'Please enter your city or village.'),
  oilType: z.string({ required_error: 'Please select an oil type.' }),
  quantity: z.coerce
    .number()
    .min(1, 'Quantity must be at least 1 liter.')
    .positive('Quantity must be a positive number.'),
});

type FormValues = z.infer<typeof formSchema>;

const oilTypes = ['Olive Oil', 'Organic Coconut Oil', 'Avocado Oil'];

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

  function generateWhatsAppLink(order: FormValues) {
    const ownerNumber = '918123363394'; // Owner WhatsApp number with country code
    const message = `New order received!%0AName: ${order.name}%0APhone: ${order.phoneNumber}%0AOil Type: ${order.oilType}%0AQuantity: ${order.quantity}L%0ADelivery Address: ${order.deliveryAddress}%0ALocation: ${order.location}`;
    return `https://wa.me/${ownerNumber}?text=${message}`;
  }

  function onSubmit(data: FormValues) {
    setIsLoading(true);
    const whatsappUrl = generateWhatsAppLink(data);
    window.open(whatsappUrl, '_blank');
    
    // Give a moment for the WhatsApp tab to open, then show success.
    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
    }, 1500);
  }
  
  function handleReset() {
    setIsSuccess(false);
    form.reset();
  }


  return (
    <>
      <Card className="w-full rounded-2xl border-2 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight md:text-4xl">Place Your Order</CardTitle>
          <CardDescription className="text-md pt-2 text-muted-foreground">
            Fill in your details below to schedule your oil delivery.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 p-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Full Name</FormLabel>
                      <div className="relative">
                        <UserRound className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="h-12 rounded-lg pl-12 text-base" />
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
                      <FormLabel className="text-lg">Phone Number</FormLabel>
                       <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input type="tel" placeholder="8123363394" {...field} className="h-12 rounded-lg pl-12 text-base" />
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
                    <FormLabel className="text-lg">Delivery Address</FormLabel>
                     <div className="relative">
                        <Home className="absolute left-3.5 top-4 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Textarea placeholder="e.g., 123 Main St, Apt 4B" {...field} className="rounded-lg pl-12 text-base" />
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
                      <FormLabel className="text-lg">City / Village</FormLabel>
                       <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="Springfield" {...field} className="h-12 rounded-lg pl-12 text-base" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="oilType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Type of Oil</FormLabel>
                       <div className="relative">
                        <Fuel className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-lg pl-12 text-base">
                              <SelectValue placeholder="Select an oil type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {oilTypes.map((type) => (
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
                    <FormLabel className="text-lg">Quantity (in Liters)</FormLabel>
                     <div className="relative">
                        <Gauge className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input type="number" placeholder="e.g., 1" {...field} className="h-12 rounded-lg pl-12 text-base" />
                        </FormControl>
                      </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <Button type="submit" disabled={isLoading} className="w-full py-6 text-lg font-bold" size="lg">
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <MessageCircle className="mr-2 h-5 w-5" />
                )}
                Place Order via WhatsApp
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <AlertDialog open={isSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Order Submitted!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
             Your order has been sent to the owner via WhatsApp. You can now close this window or place another order.
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
