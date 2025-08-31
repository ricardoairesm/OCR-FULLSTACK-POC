import * as React from "react"

import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { IconRocket } from "@tabler/icons-react"
import { NavMain } from "./nav-main"
import { useSession } from "../lib/auth-client"

const dataTest = {
  navMain: [
    {
      title: "OCR Text Recognition",
      url: "/dashboard/ocr",
    },
    {
      title: "My Previous Imports",
      url: "/dashboard/images",
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconRocket className="!size-5" />
                <span className="text-base font-semibold">OCR + LLM POC</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {dataTest.navMain.map((navMain) => {
          return (
            <NavMain item={navMain} />
          )
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session ? {email: session.user.email, name: session.user.name, avatar: session.user.image || undefined} :  {email: "placeholder@gmail.com", name: "Jhon Doe", avatar: ""}} />
      </SidebarFooter>
    </Sidebar>
  )
}
