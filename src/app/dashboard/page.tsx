import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import db from '@/lib/db';
import LeaveList from '@/components/LeaveList';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user?.id) return null;

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { leaveBalance: true },
  });

  const leaves = await db.leaveRequest.findMany({
    where: { userId: session.user.id },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.name} ({user?.role})</span>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <Button variant="outline">Sign Out</Button>
          </form>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Vacation: {user?.leaveBalance?.vacationDays ?? 0} days</p>
            <p>Sick: {user?.leaveBalance?.sickDays ?? 0} days</p>
            <p>Other: {user?.leaveBalance?.otherDays ?? 0} days</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">My Leave Requests</h2>
      <LeaveList leaves={leaves} />
    </div>
  );
}
