'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createLeaveRequest } from '@/lib/actions';
import { useActionState, useState, useEffect } from 'react';
import { differenceInBusinessDays, parseISO } from 'date-fns';
import { CalendarIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LeaveRequestForm() {
  const [state, dispatch, isPending] = useActionState(createLeaveRequest, null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      const start = parseISO(startDate);
      const end = parseISO(endDate);

      if (end < start) {
        setError('End date cannot be before start date');
        setDays(0);
      } else {
        setError('');
        // Calculate business days (Mon-Fri) roughly for now, or just raw days
        // Using differenceInBusinessDays from date-fns if available, else raw diff
        // Since I installed date-fns, I'll use it.
        const diff = differenceInBusinessDays(end, start) + 1; // Inclusive
        setDays(diff > 0 ? diff : 0);
      }
    } else {
      setDays(0);
    }
  }, [startDate, endDate]);

  return (
    <Card className="mx-auto max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-primary" />
            Submit Leave Request
        </CardTitle>
        <CardDescription>
          Fill out the form below. Business days are calculated automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Leave Type</Label>
            <select
              id="type"
              name="type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="VACATION">Vacation</option>
              <option value="SICK">Sick Leave</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate" 
                name="startDate" 
                type="date" 
                required 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input 
                id="endDate" 
                name="endDate" 
                type="date" 
                required 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-2 rounded">
                <AlertCircle className="h-4 w-4" />
                {error}
            </div>
          )}
          
          {!error && days > 0 && (
            <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 p-2 rounded">
                <CheckCircle2 className="h-4 w-4" />
                Requesting <strong>{days}</strong> business day{days !== 1 ? 's' : ''}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="reason">Reason</Label>
            <Input id="reason" name="reason" placeholder="Reason for leave" required />
          </div>
          <Button type="submit" className="w-full" disabled={isPending || !!error}>
            {isPending ? 'Submitting...' : 'Submit Request'}
          </Button>
          {state?.message && (
            <div className={`p-3 rounded-md text-sm flex items-center justify-center font-medium ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {state.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
