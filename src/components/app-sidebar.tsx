'use client'

import {
  FolderOpenDot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Users,
} from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { NavProjects } from '@/components/nav-projects'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useSession } from 'next-auth/react'

// This is sample data.
const data = {
  user: {
    name: 'Tempo Name for me',
    email: 'm@example.com',
    avatar: '',
  },
  teams: [
    {
      name: 'Beta Gamma Technik',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    // {
    //   name: 'Acme Corp.',
    //   logo: AudioWaveform,
    //   plan: 'Startup',
    // },
    // {
    //   name: 'Evil Corp.',
    //   logo: Command,
    //   plan: 'Free',
    // },
  ],
  navMain: [
    {
      title: 'Projects',
      url: '/projects',
      icon: FolderOpenDot,
      isActive: true,
      items: [
        {
          title: 'project 1',
          url: '/projects',
        },
        {
          title: 'project 2',
          url: '#',
        },
        {
          title: 'project 3',
          url: '#',
        },
      ],
    },
    {
      title: 'Employees',
      url: '/employees',
      icon: Users,
      items: [
        {
          title: 'Worker 1',
          url: '#',
        },
        {
          title: 'Worker 2',
          url: '#',
        },
        {
          title: 'Worker 3',
          url: '#',
        },
      ],
    },
    // {
    //   title: 'Documentation',
    //   url: '#',
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: 'Introduction',
    //       url: '#',
    //     },
    //     {
    //       title: 'Get Started',
    //       url: '#',
    //     },
    //     {
    //       title: 'Tutorials',
    //       url: '#',
    //     },
    //     {
    //       title: 'Changelog',
    //       url: '#',
    //     },
    //   ],
    // },
    // {
    //   title: 'Settings',
    //   url: '#',
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: 'General',
    //       url: '#',
    //     },
    //     {
    //       title: 'Team',
    //       url: '#',
    //     },
    //     {
    //       title: 'Billing',
    //       url: '#',
    //     },
    //     {
    //       title: 'Limits',
    //       url: '#',
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  if (!session) return null

  const user = {
    name: session.user.name || '',
    email: session.user.email || '',
    avatar: '',
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
