import { HomeIcon, DesktopComputerIcon } from '@heroicons/react/solid'
import {
  HomeIcon as HomeIconOutline,
  DesktopComputerIcon as DesktopComputerIconOutline,
} from '@heroicons/react/outline'
import Link from 'next/link'

type Props = {
  title: string
  route: string
  date: string
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
  date,
}: Props) => {
  const activated = route === selectedRoute

  return (
    <Link href={route}>
      <a
        className={cls([
          'mt-1 flex rounded py-3 px-3.5 text-left  text-sm antialiased',
          activated ? 'bg-black text-white' : 'text-gray-900 hover:bg-gray-200',
        ])}
        onClick={() => {
          setSelectedRoute(route)
          if (activated) {
            setSidebarOpen(false)
          }
        }}
      >
        <span>
          <div className="font-medium">{title}</div>
          <div className="mt-1 opacity-40">
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'long',
            }).format(new Date(date))}
          </div>
        </span>
      </a>
    </Link>
  )
}

export default BlogLink
