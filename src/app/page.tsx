'use client';

import {Icons} from '@/components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import {Dashboard} from '@/components/dashboard';
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarTrigger />
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Icons.layoutDashboard className="mr-2 h-4 w-4" />
              <a href="#" onClick={() => router.push('/')}>
                Dashboard
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Icons.dollarSign className="mr-2 h-4 w-4" />
              <a href="#" onClick={() => router.push('/income')}>
                Income
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Icons.list className="mr-2 h-4 w-4" />
              <a href="#" onClick={() => router.push('/expenses')}>
                Expenses
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Icons.calendar className="mr-2 h-4 w-4" />
              <a href="#" onClick={() => router.push('/calendar')}>
                Calendar
              </a>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Dashboard />
      </SidebarInset>
    </SidebarProvider>
  );
}
