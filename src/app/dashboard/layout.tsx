import Navbar from '@/components/Navbar';
import { auth } from '@/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={session?.user} />
      <main className="flex-1 space-y-4 p-8 pt-6">{children}</main>
    </div>
  );
}
