import { type SVGProps } from 'react'
import { LucideIconList } from '@/shared/constants/icon'
import { Plus } from 'lucide-react'

interface IconRendererProps extends SVGProps<SVGSVGElement> {
  icon: string
}

export const IconRenderer = ({ icon, ...props }: IconRendererProps) => {
  const found = LucideIconList.find((i) => i.name === icon)
  const Icon = found ? found.Component : Plus
  return <Icon {...props} />
}
