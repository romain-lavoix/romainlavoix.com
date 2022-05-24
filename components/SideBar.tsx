import MenuLink from './MenuLink'
import React, { useState, useEffect } from 'react'
import { MailIcon, XIcon } from '@heroicons/react/solid'
import { MenuIcon } from '@heroicons/react/outline'
import BlogLink from './BlogLink'
import { useRouter } from 'next/router'
// @ts-ignore
import OutsideClickHandler from 'react-outside-click-handler'

type SidebarProps = {
  posts: any[]
}

type NavbarProps = {
  posts: any[]
  mobile: boolean
  sidebarOpen: any
  setSidebarOpen: any
  selectedRoute: any
  setSelectedRoute: any
  ref?: any
}

function Navbar({
  posts,
  mobile,
  sidebarOpen,
  setSidebarOpen,
  selectedRoute,
  setSelectedRoute,
}: NavbarProps) {
  let navBarClassName = ''
  if (mobile) {
    if (sidebarOpen) {
      navBarClassName =
        'absolute inset-y-0 z-10 h-full w-96 translate-x-0 flex-auto overflow-y-scroll absolute max-h-screen min-h-screen transform border-r-[1px] bg-gray-50 p-4 transition duration-200 ease-in lg:block'
    } else {
      navBarClassName =
        'absolute inset-y-0 z-10 h-full flex-auto overflow-y-scroll absolute max-h-screen min-h-screen w-96 -translate-x-full transform border-r-[1px] bg-gray-50  p-4 transition duration-200 ease-out lg:block'
    }
  } else {
    navBarClassName =
      'flex-auto overflow-y-auto absolute max-h-screen min-h-screen inset-y-0 z-10 h-full w-96  border-r-[1px] bg-gray-50 p-4  lg:block transition duration-200 ease-in-out lg:translate-x-0 -translate-x-full'
  }
  return (
    <>
      <nav className={navBarClassName} aria-label="Sidebar">
        <div className="flex items-center gap-4 pl-2 pb-6">
          {mobile ? (
            <XIcon
              className={'w-4 rounded hover:bg-gray-200 lg:hidden'}
              onClick={() => setSidebarOpen(false)}
            />
          ) : (
            <></>
          )}

          <h1 className="text-sm font-bold antialiased">Romain Lavoix</h1>
        </div>

        <MenuLink
          title="Home"
          icon="Home"
          route={'/'}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex items-center gap-4 pl-2 pt-4 pb-4">
          <p className="text-sm font-medium text-gray-500 antialiased">
            Writing
          </p>
        </div>
        {posts ? (
          posts.map((post) => (
            <BlogLink
              date={post.date}
              key={post.slug}
              title={post.title}
              route={`/posts/${post.slug}`}
              selectedRoute={selectedRoute}
              setSelectedRoute={setSelectedRoute}
              setSidebarOpen={setSidebarOpen}
            />
          ))
        ) : (
          <></>
        )}
      </nav>
      {mobile ? (
        <MenuIcon
          className="m-4 h-10 w-10 rounded p-2 hover:bg-gray-200 lg:hidden"
          onClick={() => {
            setSidebarOpen(true)
          }}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default function Sidebar({ posts }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const [selectedRoute, setSelectedRoute] = useState(router.asPath ?? '/')
  useEffect(() => {
    const main = document.getElementById('main')

    if (sidebarOpen && main) {
      main.classList.add('opacity-50')
    } else if (main) {
      main.classList.remove('opacity-50')
    }
  }, [sidebarOpen])

  useEffect(() => {
    setSidebarOpen(false)
  }, [selectedRoute])

  return (
    <>
      <Navbar
        posts={posts}
        mobile={false}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
      <OutsideClickHandler onOutsideClick={() => setSidebarOpen(false)}>
        <Navbar
          posts={posts}
          mobile={true}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
      </OutsideClickHandler>
    </>
  )
}
