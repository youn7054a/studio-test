'use server';
/**
 * @fileOverview An AI agent to categorize expenses based on their description.
 *
 * - categorizeExpense - A function that handles the expense categorization process.
 * - CategorizeExpenseInput - The input type for the categorizeExpense function.
 * - CategorizeExpenseOutput - The return type for the categorizeExpense function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CategorizeExpenseInputSchema = z.object({
  description: z.string().describe('The description of the expense.'),
});
export type CategorizeExpenseInput = z.infer<typeof CategorizeExpenseInputSchema>;

const CategorizeExpenseOutputSchema = z.object({
  category: z.string().describe('The suggested category for the expense.'),
  confidence: z.number().describe('The confidence level (0-1) of the categorization.'),
});
export type CategorizeExpenseOutput = z.infer<typeof CategorizeExpenseOutputSchema>;

export async function categorizeExpense(input: CategorizeExpenseInput): Promise<CategorizeExpenseOutput> {
  return categorizeExpenseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeExpensePrompt',
  input: {
    schema: z.object({
      description: z.string().describe('The description of the expense.'),
    }),
  },
  output: {
    schema: z.object({
      category: z.string().describe('The suggested category for the expense.'),
      confidence: z.number().describe('The confidence level (0-1) of the categorization.'),
    }),
  },
  prompt: `You are an expert in categorizing business expenses.

  Based on the description provided, suggest a category for the expense.
  Also, provide a confidence level (0-1) for your categorization.

  Description: {{{description}}}
  `,
});

const categorizeExpenseFlow = ai.defineFlow<
  typeof CategorizeExpenseInputSchema,
  typeof CategorizeExpenseOutputSchema
>({
  name: 'categorizeExpenseFlow',
  inputSchema: CategorizeExpenseInputSchema,
  outputSchema: CategorizeExpenseOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
