import { Outlet } from 'react-router-dom'

import Header from '@/components/header'
import { SidebarMain } from '@/components/sidebar/sidebar-main'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function AppLayout() {
  return (
    <div>
      <SidebarProvider>
        <SidebarMain />
        <SidebarInset>
          <Header />
        </SidebarInset>
        <main>
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}
