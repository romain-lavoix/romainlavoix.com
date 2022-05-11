import MenuLink from './MenuLink'
import React, { useState } from 'react'
import { MailIcon, XIcon } from '@heroicons/react/solid'
import { Dialog, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import cls from '../utils/cls'

export default function Sidebar() {
  const [selectedRoute, setSelectedRoute] = useState('/')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  console.log(sidebarOpen)
  return (
    <>
      <nav
        className={cls([
          'fixed z-10 h-full w-56 border-r-[1px] bg-gray-50 p-4 transition ease-in-out lg:block',
          // !sidebarOpen && '-translate-x-96 transform-gpu',
        ])}
        aria-label="Sidebar"
      >
        <div className="flex items-center gap-4 pl-2 pb-6">
          <XIcon
            className={'w-4 rounded hover:bg-gray-200 lg:hidden'}
            onClick={() => setSidebarOpen(false)}
          />
          <h1 className="text-sm font-bold antialiased">Romain Lavoix</h1>
        </div>
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
      <MenuIcon
        className="m-4 h-10 w-10 rounded p-2 hover:bg-gray-200 lg:hidden"
        onClick={() => {
          setSidebarOpen(true)
        }}
      />
    </>
  )
}
