'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { updateLeaveStatus } from '@/lib/actions';
import { LeaveRequest, User, LeaveStatus } from '@prisma/client';

type LeaveWithUser = LeaveRequest & { user: User };

export default function LeaveList({
  leaves,
  isManager = false,
}: {
  leaves: LeaveWithUser[];
  isManager?: boolean;
}) {
  return (
    <div className="grid gap-4">
      {leaves.map((leave) => (
        <Card key={leave.id}>
          <CardHeader>
            <CardTitle>
              {leave.user.name} - {leave.type}
            </CardTitle>
            <CardDescription>
              {new Date(leave.startDate).toLocaleDateString()} to{' '}
              {new Date(leave.endDate).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p>Reason: {leave.reason}</p>
                <p>Status: <span className={`font-bold ${leave.status === 'APPROVED' ? 'text-green-600' : leave.status === 'REJECTED' ? 'text-red-600' : 'text-yellow-600'}`}>{leave.status}</span></p>
              </div>
              {isManager && leave.status === 'PENDING' && (
                <div className="flex gap-2">
                  <form action={updateLeaveStatus}>
                    <input type="hidden" name="id" value={leave.id} />
                    <input type="hidden" name="status" value="APPROVED" />
                    <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700">Approve</Button>
                  </form>
                  <form action={updateLeaveStatus}>
                    <input type="hidden" name="id" value={leave.id} />
                    <input type="hidden" name="status" value="REJECTED" />
                    <Button type="submit" variant="destructive">Reject</Button>
                  </form>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      {leaves.length === 0 && <p>No leave requests found.</p>}
    </div>
  );
}
