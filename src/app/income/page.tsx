'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useToast} from '@/hooks/use-toast';
import {Card} from '@/components/ui/card';

export default function Income() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [income, setIncome] = useState<
    {description: string; amount: number}[]
  >([]);
  const {toast} = useToast();

  const addIncome = () => {
    if (description && amount) {
      setIncome([
        ...income,
        {description: description, amount: parseFloat(amount)},
      ]);
      setDescription('');
      setAmount('');
      toast({
        title: 'Income Added',
        description: 'Your income has been added successfully.',
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
      <h1 className="text-2xl font-bold">Income Tracking</h1>
      <Card className="rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              placeholder="Income description"
              value={description}
              className="rounded-md shadow-sm"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              id="amount"
              placeholder="Income amount"
              value={amount}
              className="rounded-md shadow-sm"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <Button className="mt-4 rounded-md shadow-sm" onClick={addIncome}>
          Add Income
        </Button>
      </Card>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Income List</h2>
        {income.length === 0 ? (
          <p className="text-muted-foreground">No income added yet.</p>
        ) : (
          <ul className="list-disc pl-5">
            {income.map((item, index) => (
              <li key={index} className="text-sm">
                {item.description} - ${item.amount}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
