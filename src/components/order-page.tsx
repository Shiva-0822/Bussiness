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
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { confirmOrderInformation } from '@/ai/flows/client-notification-summarization';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [summaryInfo, setSummaryInfo] = React.useState<{
    isComplete: boolean;
    summary: string;
  } | null>(null);
  const [isSummaryOpen, setIsSummaryOpen] = React.useState(false);
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

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    try {
      const result = await confirmOrderInformation(data);
      setSummaryInfo(result);
      setIsSummaryOpen(true);
    } catch (error) {
      console.error('Error confirming order information:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description:
          'We could not verify your order details. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleConfirmOrder() {
    setIsConfirming(true);
    // In a real application, you would send the data to your backend
    // and trigger the SMS notification here.
    setTimeout(() => {
      setIsSummaryOpen(false);
      setIsSuccess(true);
      setIsConfirming(false);
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
                          <Input type="tel" placeholder="(123) 456-7890" {...field} className="h-12 rounded-lg pl-12 text-base" />
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
                  <Send className="mr-2 h-5 w-5" />
                )}
                Review Order
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Summary</DialogTitle>
            <DialogDescription>
              Please review your order details.
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm max-w-none rounded-md border bg-muted/50 p-4 text-sm text-muted-foreground">
             {summaryInfo?.summary.split('\n').map((line, i) => <p key={i} className="my-1">{line}</p>) ?? "Loading summary..."}
          </div>
          <DialogFooter className="sm:justify-between">
            {summaryInfo?.isComplete ? (
              <>
                <Button variant="outline" onClick={() => setIsSummaryOpen(false)}>
                  Edit Order
                </Button>
                <Button onClick={handleConfirmOrder} disabled={isConfirming} className="bg-primary hover:bg-primary/90">
                   {isConfirming ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <PackageCheck className="mr-2 h-4 w-4" />
                  )}
                  Confirm & Place Order
                </Button>
              </>
            ) : (
              <Button className="w-full" onClick={() => setIsSummaryOpen(false)}>
                Return to Edit
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Order Placed Successfully!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Thank you for your order. We have received your request and will process it shortly. You will receive a confirmation message from our team soon.
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
