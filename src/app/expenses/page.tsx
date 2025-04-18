'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {categorizeExpense} from '@/ai/flows/categorize-expense';
import {useToast} from '@/hooks/use-toast';
import {useEffect} from 'react';
import {Card, CardContent} from '@/components/ui/card';

export default function Expenses() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState<
    {description: string; amount: number; category?: string}[]
  >([]);
  const {toast} = useToast();
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    async function getCategory() {
      if (description) {
        const result = await categorizeExpense({
          description: description,
        });
        setCategory(result?.category ?? null);
      }
    }
    getCategory();
  }, [description]);

  const addExpense = () => {
    if (description && amount) {
      setExpenses([
        ...expenses,
        {
          description: description,
          amount: parseFloat(amount),
          category: category ?? undefined,
        },
      ]);
      setDescription('');
      setAmount('');
      setCategory(null);
      toast({
        title: 'Expense Added',
        description: 'Your expense has been added successfully.',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Expense Tracking</h1>
      <Card className="rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              placeholder="Expense description"
              value={description}
              className="rounded-md shadow-sm"
              onChange={(e) => setDescription(e.target.value)}
            />
            {category && <p className="mt-2 text-sm text-muted-foreground">Suggested category: {category}</p>}
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              id="amount"
              placeholder="Expense amount"
              value={amount}
              className="rounded-md shadow-sm"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <Button className="mt-4 rounded-md shadow-sm" onClick={addExpense}>
          Add Expense
        </Button>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Expense List</h2>
        {expenses.length === 0 ? (
          <p className="text-muted-foreground">No expenses added yet.</p>
        ) : (
          <ul className="list-disc pl-5">
            {expenses.map((expense, index) => (
              <li key={index} className="text-sm">
                {expense.description} - ${expense.amount}
                {expense.category ? ` (Category: ${expense.category})` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
