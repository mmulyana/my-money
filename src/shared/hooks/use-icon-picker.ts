import { useState, useMemo } from 'react'
import { LucideIconList, type LucideIconName } from '../constants/icon'

type Icons = {
  name: LucideIconName
  friendly_name: string
  Component: React.FC<React.SVGProps<SVGSVGElement>>
}

export const useIconPicker = () => {
  const icons: Icons[] = useMemo(() => {
    return LucideIconList.map(({ name, Component }) => ({
      name,
      friendly_name: name.replace(/([a-z])([A-Z])/g, '$1 $2'),
      Component,
    }))
  }, [])

  const [search, setSearch] = useState('')
  const filteredIcons = useMemo(() => {
    return icons.filter((icon) =>
      icon.name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search, icons])

  return { search, setSearch, icons: filteredIcons }
}
