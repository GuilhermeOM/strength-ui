import * as React from 'react'

import { SidebarLogo } from '@/components/sidebar/sidebar-logo'
import { SidebarUser } from '@/components/sidebar/sidebar-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

import SidebarContentCore from './content/sidebar-content-core'
import SidebarContentPlatform from './content/sidebar-content-platform'

export function SidebarMain({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-blue-600">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarContentPlatform />
        <SidebarContentCore />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser
          user={{
            name: 'Guilherme',
            email: 'guilherme.malta@example.com',
            avatar: '/avatars/shadcn.jpg',
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
