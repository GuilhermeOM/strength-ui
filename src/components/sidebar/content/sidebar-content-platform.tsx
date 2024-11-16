import { LayoutDashboard, Users } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import CollapsibleItem from './collapsible-item'

const content = [
  {
    title: 'Dashboard',
    url: '#',
    icon: LayoutDashboard,
    isActive: true,
    sub: [
      {
        title: 'Progress',
        url: '#',
      },
      {
        title: 'Compare',
        url: '#',
      },
      {
        title: 'Future',
        url: '#',
      },
    ],
  },
  {
    title: 'Community',
    url: '#',
    icon: Users,
    sub: [
      {
        title: 'Global',
        url: '#',
      },
      {
        title: 'Friends',
        url: '#',
      },
    ],
  },
]

export default function SidebarContentPlatform() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {content.map((item) =>
          item.sub !== undefined ? (
            <CollapsibleItem key={item.title} item={{ title: item.title, icon: item.icon }} subItems={item.sub} />
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
