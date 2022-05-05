import { HomeIcon, DesktopComputerIcon } from '@heroicons/react/solid'
import Link from 'next/link'

type Props = {
  title: String
  icon: String
}

const MenuLink = ({ title, icon }: Props) => {
  let ComponentIcon = null

  function renderSwitch(icon: String) {
    switch (icon) {
      case 'Home':
        return <HomeIcon className="w-4 text-white" />
      case 'DesktopComputer':
        return <DesktopComputerIcon className="w-4 text-white" />
      default:
        return null
    }
  }

  return (
    <Link href="/">
      <span className="mb-1 flex  h-8 items-center justify-center rounded bg-black">
        <span className="flex w-full p-2">
          {renderSwitch(icon)}
          <button className=" ml-3 text-left text-sm text-white antialiased">
            {title}
          </button>
        </span>
      </span>
    </Link>
  )
}

export default MenuLink
