'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();

  const routes = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      active: pathname === '/dashboard',
    },
    {
      href: '/leaves/new',
      label: 'New Request',
      active: pathname === '/leaves/new',
    },
  ];

  if (user?.role === 'MANAGER') {
    routes.push({
      href: '/admin/leaves',
      label: 'Manage Leaves',
      active: pathname === '/admin/leaves',
    });
  }

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              LMS
            </span>
          </Link>
          <div className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  route.active ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
                {user?.name} ({user?.role})
            </span>
            <Button variant="ghost" onClick={() => signOut()}>
                Logout
            </Button>
        </div>
      </div>
    </nav>
  );
}
