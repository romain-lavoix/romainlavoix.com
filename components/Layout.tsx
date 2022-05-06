import Sidebar from './SideBar'
import { ReactElement } from 'react'

type LayoutProps = {
  children: ReactElement
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="antialiased">
      <Sidebar />
      <main>
        <div className="relative h-full w-full pb-16 lg:flex">
          <div className="flex w-full justify-center px-4 pt-32 lg:ml-56">
            <div>{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
