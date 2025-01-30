import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Calendar,
  CheckCircle,
  Circle,
  HelpCircle,
  Lock,
  Timer,
} from 'lucide-react'

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

export const statuses = [
  {
    value: 'draft',
    label: 'Draft',
    icon: HelpCircle,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: Timer,
  },
  {
    value: 'todo',
    label: 'To Do',
    icon: Circle,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle,
  },
  {
    value: 'error',
    label: 'Error',
    icon: AlertTriangle,
  },
  {
    value: 'planned',
    label: 'Planned',
    icon: Calendar,
  },
  {
    value: 'private',
    label: 'Private',
    icon: Lock,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRight,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUp,
  },
]
