import { Dumbbell } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const content = [
  {
    title: 'Exercises',
    url: '#',
    icon: Dumbbell,
  },
]

export default function SidebarContentCore() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Core</SidebarGroupLabel>
      <SidebarMenu>
        {content.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
