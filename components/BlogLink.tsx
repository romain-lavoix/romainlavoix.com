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
}
import cls from '../utils/cls'

const BlogLink = ({
  title,
  route = '/',
  selectedRoute,
  setSelectedRoute,
}: Props) => {
  const activated = route === selectedRoute

  return (
    <Link href={route}>
      <a
        className={cls([
          'mb-1 flex  h-8 items-center justify-center rounded',
          activated ? 'bg-black' : 'hover:bg-gray-200',
        ])}
        onClick={() => setSelectedRoute(route)}
      >
        <span className="flex w-full p-2">
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

export default BlogLink
