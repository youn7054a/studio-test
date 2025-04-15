'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {Area, AreaChart, CartesianGrid, XAxis, YAxis} from 'recharts';
import {useEffect, useState} from 'react';
import {getAppointments} from '@/services/calendar';

export function Dashboard() {
  const [appointments, setAppointments] = useState<
    {title: string; start: Date; end: Date}[]
  >([]);

  useEffect(() => {
    async function loadAppointments() {
      const today = new Date();
      const nextWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      );
      const fetchedAppointments = await getAppointments(today, nextWeek);
      setAppointments(fetchedAppointments);
    }

    loadAppointments();
  }, []);

  // Mock data for demonstration
  const totalRevenue = 50000;
  const totalExpenses = 30000;
  const profit = totalRevenue - totalExpenses;

  const data = [
    {name: 'Jan', income: 4000, expenses: 2400},
    {name: 'Feb', income: 3000, expenses: 1398},
    {name: 'Mar', income: 2000, expenses: 9800},
    {name: 'Apr', income: 2780, expenses: 3908},
    {name: 'May', income: 1890, expenses: 4800},
    {name: 'Jun', income: 2390, expenses: 3800},
    {name: 'Jul', income: 3490, expenses: 4300},
  ];

  const chartConfig = {
    income: {
      label: 'Income',
      color: 'hsl(var(--primary))',
    },
    expenses: {
      label: 'Expenses',
      color: 'hsl(var(--destructive))',
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>All Revenue!!!!!!!!!!!!!!!!!!!~</CardTitle>
          </CardHeader>
          <CardContent>${totalRevenue.toLocaleString()}</CardContent>
        </Card>
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>All Expenses</CardTitle>
          </CardHeader>
          <CardContent>${totalExpenses.toLocaleString()}</CardContent>
        </Card>
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Profit</CardTitle>
          </CardHeader>
          <CardContent>${profit.toLocaleString()}</CardContent>
        </Card>
        <Card className="rounded-lg shadow-md md:col-span-2">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
                <ChartLegend>
                  <ChartLegendContent />
                </ChartLegend>
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.5)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive) / 0.5)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="rounded-lg shadow-md md:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <p className="text-muted-foreground">No appointments scheduled.</p>
            ) : (
              <ul className="list-none pl-0">
                {appointments.map((appointment, index) => (
                  <li key={index} className="text-sm">
                    {appointment.title} - {appointment.start.toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

