import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import LeaveList from '@/components/LeaveList';

export default async function AdminLeavesPage() {
  const session = await auth();

  if (session?.user?.role !== 'MANAGER') {
    redirect('/dashboard');
  }

  const leaves = await db.leaveRequest.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Leave Requests</h1>
      <LeaveList leaves={leaves} isManager={true} />
    </div>
  );
}
