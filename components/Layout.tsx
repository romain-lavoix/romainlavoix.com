import Sidebar from './SideBar'
import { ReactElement } from 'react'

type LayoutProps = {
  children: ReactElement
  posts: any[]
  slug?: string
  fullscreen: boolean
}

export default function Layout({
  children,
  posts,
  fullscreen = false,
}: LayoutProps) {
  return (
    <div className="max-h-screen antialiased">
      <div className="w-full flex-row lg:flex">
        <Sidebar posts={posts} />
        <div className="max-h-screen min-h-screen flex-1 overflow-y-auto lg:ml-96">
          <main id="main">
            <div
              className={`relative h-full w-full ${
                fullscreen ? '' : 'px-4 pb-16 lg:px-0'
              } lg:flex`}
            >
              <div
                className={`${
                  fullscreen ? 'w-full' : 'flex w-full justify-center lg:pt-32'
                }`}
              >
                <div>{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
