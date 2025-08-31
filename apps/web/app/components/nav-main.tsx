import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { redirect } from "next/dist/server/api-utils"
import Link from "next/link"

interface NavItem {
  title: string
  url: string
  icon?: Icon
}

export function NavMain({ item }: { item: NavItem }) {
  return (
    <SidebarGroup>

      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
            <Link href={item.url}>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link >
      </SidebarMenu>
    </SidebarGroupContent>

    </SidebarGroup >
  )
}
