'use client';

import {Calendar as CalendarComponent} from '@/components/ui/calendar';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {cn} from '@/lib/utils';
import {format} from 'date-fns';

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Button onClick={() => setDate(new Date())}>Today</Button>
      </div>
      <div className="mt-4 rounded-md border">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={setDate}
          className={cn('border-none')}
        />
      </div>
      {date ? (
        <p className="mt-2">
          Selected Date: {format(date, 'PPP')}
        </p>
      ) : (
        <p className="mt-2">Please select a date.</p>
      )}
    </div>
  );
}
