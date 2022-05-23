import { HomeIcon, DesktopComputerIcon } from '@heroicons/react/solid'
import {
  HomeIcon as HomeIconOutline,
  DesktopComputerIcon as DesktopComputerIconOutline,
} from '@heroicons/react/outline'
import Link from 'next/link'

type Props = {
  title: string
  route: string
  selectedRoute: any
  setSelectedRoute: any
  setSidebarOpen: any
}
import cls from '../utils/cls'

const BlogLink = ({
  title,
  route = '/',
  selectedRoute,
  setSelectedRoute,
  setSidebarOpen,
}: Props) => {
  const activated = route === selectedRoute

  return (
    <Link href={route}>
      <a
        className={cls([
          'flex rounded py-3 px-3.5 text-left text-sm font-medium antialiased',
          activated ? 'bg-black text-white' : 'text-black hover:bg-gray-200',
        ])}
        onClick={() => {
          setSelectedRoute(route)
          if (activated) {
            setSidebarOpen(false)
          }
        }}
      >
        {title}
      </a>
    </Link>
  )
}

export default BlogLink
