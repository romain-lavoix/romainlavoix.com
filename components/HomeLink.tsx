import { HomeIcon } from '@heroicons/react/solid'
import Link from 'next/link'

type Props = {
  title: String
  link: URL
  subtitle: String
  subtitle2?: String
}

const HomeLink = ({ title, link, subtitle, subtitle2 }: Props) => {
  return (
    <div className="col-span-10 col-start-2 flex items-center gap-4">
      <div className="shrink-0">
        <Link href={link}>
          <a className="w-full font-bold">{title}</a>
        </Link>
      </div>
      <div className="w-full grow border-t-[1px] border-dashed border-gray-300"></div>
      <div className="shrink-0">
        <p className="w-full text-gray-500">{subtitle}</p>
      </div>
      <div className="shrink-0">
        <p className="w-full text-gray-400">{subtitle2}</p>
      </div>
    </div>
  )
}

export default HomeLink
