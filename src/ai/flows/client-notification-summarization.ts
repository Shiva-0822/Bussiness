'use server';

/**
 * @fileOverview A flow that uses GenAI to confirm that all customer order information has been received before sending a notification to the client.
 *
 * - confirmOrderInformation - A function that handles the order information confirmation process.
 * - ConfirmOrderInformationInput - The input type for the confirmOrderInformation function.
 * - ConfirmOrderInformationOutput - The return type for the confirmOrderInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConfirmOrderInformationInputSchema = z.object({
  name: z.string().describe('Customer name'),
  phoneNumber: z.string().describe('Customer phone number'),
  deliveryAddress: z.string().describe('Customer delivery address'),
  location: z.string().describe('Customer location (city/village)'),
  oilType: z.string().describe('Type of oil ordered'),
  quantity: z.number().describe('Quantity of oil ordered in liters'),
});
export type ConfirmOrderInformationInput = z.infer<
  typeof ConfirmOrderInformationInputSchema
>;

const ConfirmOrderInformationOutputSchema = z.object({
  isComplete: z.boolean().describe('Whether all order information is complete.'),
  summary: z.string().describe('A summary of the order information.'),
});
export type ConfirmOrderInformationOutput = z.infer<
  typeof ConfirmOrderInformationOutputSchema
>;

export async function confirmOrderInformation(
  input: ConfirmOrderInformationInput
): Promise<ConfirmOrderInformationOutput> {
  return confirmOrderInformationFlow(input);
}

const confirmOrderInformationPrompt = ai.definePrompt({
  name: 'confirmOrderInformationPrompt',
  input: {schema: ConfirmOrderInformationInputSchema},
  output: {schema: ConfirmOrderInformationOutputSchema},
  prompt: `You are a system designed to validate customer order information for a food oil delivery service.

  You will receive the following information:
  - Name: {{{name}}}
  - Phone Number: {{{phoneNumber}}}
  - Delivery Address: {{{deliveryAddress}}}
  - Location: {{{location}}}
  - Oil Type: {{{oilType}}}
  - Quantity: {{{quantity}}} liters

  Determine if all the necessary information is present to process the order.

  If all information is present, set isComplete to true and provide a concise summary of the order.
  If any information is missing, set isComplete to false and indicate what information is missing.
  Ensure the summary includes all available information.
  `,
});

const confirmOrderInformationFlow = ai.defineFlow(
  {
    name: 'confirmOrderInformationFlow',
    inputSchema: ConfirmOrderInformationInputSchema,
    outputSchema: ConfirmOrderInformationOutputSchema,
  },
  async input => {
    const {output} = await confirmOrderInformationPrompt(input);
    return output!;
  }
);
