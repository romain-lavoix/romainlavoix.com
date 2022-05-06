import MenuLink from './MenuLink'
import React, { useState } from 'react'
import { MailIcon } from '@heroicons/react/solid'

export default function Sidebar() {
  const [selectedRoute, setSelectedRoute] = useState('/')
  return (
    <nav
      className="fixed z-10 hidden h-full w-56 border-r-[1px] bg-gray-50 p-4 lg:block"
      aria-label="Sidebar"
    >
      <h1 className="pl-2 pb-6 text-sm font-bold antialiased">Romain Lavoix</h1>
      <MenuLink
        title="Home"
        icon="Home"
        route={'/'}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
      <MenuLink
        title="Setup"
        icon="DesktopComputer"
        route={'/setup'}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
    </nav>
  )
}
