import { useContext } from 'react'
import Link from 'next/link'
import { globalContext } from '../store/store'

type Props = {
  title: string
  route: string
  date: string
}
import cls from '../lib/cls'

const BlogLink = ({ title, route = '/', date }: Props) => {
  const { globalState, dispatch } = useContext(globalContext)
  const activated = route === globalState.selectedRoute

  return (
    <Link href={route}>
      <a
        className={cls([
          'mt-1 flex rounded py-3 px-3.5 text-left  text-sm antialiased',
          activated ? 'bg-black text-white' : 'text-gray-900 hover:bg-gray-200',
        ])}
        onClick={() => {
          // setSelectedRoute(route)
          dispatch({ type: 'SELECT_ROUTE', payload: route })
          if (activated) {
            // setSidebarOpen(false)
            dispatch({ type: 'OPEN_SIDEBAR' })
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
