import logo from '@/assets/strength-logo.webp'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'

export function SidebarLogo() {
  const { state } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className={state === 'collapsed' ? 'outline outline-1 outline-muted' : ''}>
          <div
            className={`flex aspect-square size-8 items-center justify-center overflow-clip rounded-lg text-sidebar-primary-foreground ${state === 'expanded' && 'outline outline-1 outline-muted'}`}
          >
            <img src={logo} alt="tiny rhino" className="size-8" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Strength</span>
            <span className="truncate text-xs">You getting stronger</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
