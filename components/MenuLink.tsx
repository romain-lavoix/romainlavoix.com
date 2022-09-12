import { HomeIcon, DesktopComputerIcon } from '@heroicons/react/solid'
import { DocumentTextIcon } from '@heroicons/react/outline'
import Link from 'next/link'

type Props = {
  title: string
  icon: string
  route: string
}
import cls from '../lib/cls'
import { useContext } from 'react'
import { globalContext } from '../store/store'

const MenuLink = ({ title, icon, route = '/' }: Props) => {
  const { globalState, dispatch } = useContext(globalContext)
  const activated = route === globalState.selectedRoute

  function renderSwitch(icon: String, activated: boolean) {
    switch (icon) {
      case 'Home':
        return (
          <HomeIcon
            className={cls(['w-4', activated ? 'text-white' : 'text-black'])}
          />
        )
      case 'DesktopComputer':
        return (
          <DesktopComputerIcon
            className={cls(['w-4', activated ? 'text-white' : 'text-black'])}
          />
        )
      case 'DocumentTextIcon':
        return (
          <DocumentTextIcon
            className={cls(['w-4', activated ? 'text-white' : 'text-black'])}
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
          dispatch({ type: 'SELECT_ROUTE', payload: route })
          if (activated) {
            dispatch({ type: 'CLOSE_SIDEBAR' })
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
