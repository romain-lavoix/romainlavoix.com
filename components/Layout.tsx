import Sidebar from './SideBar'
import { ReactElement } from 'react'

type LayoutProps = {
  children: ReactElement
  posts: any[]
  slug?: string
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="max-h-screen antialiased">
      <div className="w-full flex-row lg:flex">
        <Sidebar posts={children.props.posts} />
        <div className="max-h-screen min-h-screen flex-1 overflow-y-auto lg:ml-96">
          <main id="main">
            <div className="relative h-full w-full pb-16 lg:flex">
              <div className="flex w-full justify-center px-4 lg:pt-32">
                <div>{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
