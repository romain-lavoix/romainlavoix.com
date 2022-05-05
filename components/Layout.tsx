import Sidebar from './SideBar'
import { ReactElement } from 'react'

type LayoutProps = {
  children: ReactElement
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Sidebar />
      <main>
        <div className="relative h-full w-full lg:flex">
          <div className="flex w-full justify-center px-4 pt-32 antialiased lg:ml-56">
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
