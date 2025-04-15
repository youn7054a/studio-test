'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export function Dashboard() {
  // Mock data for demonstration
  const totalRevenue = 50000;
  const totalExpenses = 30000;
  const profit = totalRevenue - totalExpenses;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>${totalRevenue.toLocaleString()}</CardContent>
        </Card>
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>${totalExpenses.toLocaleString()}</CardContent>
        </Card>
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Profit</CardTitle>
          </CardHeader>
          <CardContent>${profit.toLocaleString()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
