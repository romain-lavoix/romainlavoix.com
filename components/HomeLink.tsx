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
    <div className="col-span-12 col-start-1 flex items-center gap-4 lg:col-span-10 lg:col-start-2">
      <div className="shrink-0">
        <Link href={link}>
          <a className="w-full font-medium">{title}</a>
        </Link>
      </div>
      <div className="w-full grow border-t-[1px] border-dashed border-gray-300"></div>
      <div className="shrink-0">
        <p className="w-full text-gray-500">{subtitle}</p>
      </div>
      {subtitle2 ? (
        <div className="shrink-0">
          <p className="w-full text-gray-400">{subtitle2}</p>
        </div>
      ) : null}
    </div>
  )
}

export default HomeLink
