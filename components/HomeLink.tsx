import Link from 'next/link'

type Props = {
  title: String
  link: URL
  subtitle: String
  subtitle2?: String
}

const HomeLink = ({ title, subtitle, subtitle2 }: Props) => {
  return (
    <div className="col-span-12 col-start-1 lg:col-span-10 lg:col-start-2">
      <Link href="/">
        <a
          target="_blank"
          className="group flex items-center gap-2 hover:text-blue-600 md:gap-4"
        >
          <div className="shrink-0 group-hover:underline">{title}</div>
          <div className="w-full grow border-t-[1px] border-dashed border-gray-300"></div>
          <div className="shrink-0">
            <p className="w-full text-gray-500">{subtitle}</p>
          </div>
          {subtitle2 ? (
            <div className="hidden shrink-0 md:block">
              <p className="w-full text-gray-400">{subtitle2}</p>
            </div>
          ) : null}
        </a>
      </Link>
    </div>
  )
}

export default HomeLink
