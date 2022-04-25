import { HomeIcon } from '@heroicons/react/solid'
import { AppProps } from 'next/app'
import Link from 'next/link'

type Props = {
  title: String
}

const MenuLink = ({ title }: Props) => {
  return (
    <Link href="/">
      <span className="mb-1 flex  h-8 items-center justify-center rounded bg-black">
        <span className="flex w-full p-2">
          <HomeIcon className=" w-4 text-white" />
          <button className=" ml-3 text-left text-sm text-white antialiased">
            {title}
          </button>
        </span>
      </span>
    </Link>
  )
}

export default MenuLink
