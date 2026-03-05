'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'

interface SidebarWrapperProps {
  categories: string[]
}

export function SidebarWrapper({ categories }: SidebarWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)

  return <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} categories={categories} />
}
