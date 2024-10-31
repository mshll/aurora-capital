import { getUser } from '@/actions/token';
import { myProfile } from '@/actions/users';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { formatCurrency } from '@/lib/utils';

async function DashBoardLayout({ children, ...props }) {
  const user = await getUser();
  const me = await myProfile();

  return (
    <>
      <main className='relative flex min-h-screen flex-col items-center justify-center' {...props}>
        <SidebarProvider>
          <AppSidebar user={user} me={me} />
          <SidebarInset>
            <header className='mb-3 flex h-16 shrink-0 flex-col items-start justify-between gap-2 md:flex-row md:items-center'>
              <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 h-4' />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className='hidden md:block'>
                      <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='hidden md:block' />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className='mx-6 items-center gap-2 self-center truncate text-ellipsis rounded-full border bg-card px-6 py-1 text-xs font-semibold tracking-wider'>
                Balance: {formatCurrency(me.balance, false)}
              </div>
            </header>
            <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </main>
    </>
  );
}
export default DashBoardLayout;
