import { HomeIcon, DesktopComputerIcon } from '@heroicons/react/solid'
import {
  HomeIcon as HomeIconOutline,
  DesktopComputerIcon as DesktopComputerIconOutline,
} from '@heroicons/react/outline'
import Link from 'next/link'

type Props = {
  title: string
  icon: string
  route: string
  selectedRoute: any
  setSelectedRoute: any
  setSidebarOpen: any
}
import cls from '../utils/cls'

const MenuLink = ({
  title,
  icon,
  route = '/',
  selectedRoute,
  setSelectedRoute,
  setSidebarOpen,
}: Props) => {
  const activated = route === selectedRoute

  function renderSwitch(icon: String, activated: boolean) {
    switch (icon) {
      case 'Home':
        return (
          <HomeIcon
            className={cls([
              'w-4 text-white',
              activated ? 'text-white' : 'text-black',
            ])}
          />
        )
      case 'DesktopComputer':
        return (
          <DesktopComputerIcon
            className={cls([
              'w-4 text-white',
              activated ? 'text-white' : 'text-black',
            ])}
          />
        )
      default:
        return null
    }
  }

  return (
    <Link href={route}>
      <a
        className={cls([
          'mb-1 flex  h-8 items-center justify-center rounded',
          activated ? 'bg-black' : 'hover:bg-gray-200',
        ])}
        onClick={() => {
          setSelectedRoute(route)
          if (activated) {
            setSidebarOpen(false)
          }
        }}
      >
        <span className="flex w-full p-2">
          {renderSwitch(icon, activated)}
          <span
            className={cls([
              ' ml-3 text-left text-sm antialiased',
              activated ? 'text-white' : 'text-black',
            ])}
          >
            {title}
          </span>
        </span>
      </a>
    </Link>
  )
}

export default MenuLink
