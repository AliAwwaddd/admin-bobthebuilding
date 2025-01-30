import { UserRound, CircleUser } from 'lucide-react'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const roles = [
  {
    value: 'manager',
    label: 'Manager',
    icon: UserRound,
  },
  {
    value: 'worker',
    label: 'Worker',
    icon: CircleUser,
  },
  // {
  //   value: 'admin',
  //   label: 'Admin',
  //   icon: Circle,
  // },
]
