import MenuLink from './MenuLink'
import React, { useEffect, useContext, useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { MenuIcon } from '@heroicons/react/outline'
import BlogLink from './BlogLink'
// @ts-ignore
import OutsideClickHandler from 'react-outside-click-handler'
import { globalContext } from '../store/store'

type SidebarProps = {
  posts: any[]
}

type NavbarProps = {
  posts: any[]
  mobile: boolean
}

function Navbar({ posts, mobile }: NavbarProps) {
  const { globalState, dispatch } = useContext(globalContext)

  let navBarClassName = ''
  if (mobile) {
    if (globalState.isSideBarOpen) {
      navBarClassName =
        'font-lato absolute inset-y-0 z-10 h-full w-96 translate-x-0 flex-auto overflow-y-scroll absolute max-h-screen min-h-screen transform border-r-[1px] bg-gray-50 p-4 transition duration-200 ease-in lg:block'
    } else {
      navBarClassName =
        'font-lato absolute inset-y-0 z-10 h-full flex-auto overflow-y-scroll absolute max-h-screen min-h-screen w-96 -translate-x-full transform border-r-[1px] bg-gray-50  p-4 transition duration-200 ease-out lg:block'
    }
  } else {
    navBarClassName =
      'font-lato flex-auto overflow-y-auto absolute max-h-screen min-h-screen inset-y-0 z-10 h-full w-96  border-r-[1px] bg-gray-50 p-4  lg:block'
  }

  return (
    <>
      <nav className={navBarClassName} aria-label="Sidebar">
        <div className="flex items-center gap-4 pl-2 pb-6">
          {mobile ? (
            <XIcon
              className={'w-4 rounded hover:bg-gray-200 lg:hidden'}
              onClick={() => {
                dispatch({ type: 'CLOSE_SIDEBAR' })
              }}
            />
          ) : (
            <></>
          )}

          <h1 className="font-roboto text-sm font-bold antialiased">
            Romain Lavoix
          </h1>
        </div>

        <MenuLink title="Home" icon="Home" route={'/'} />

        <div className="flex items-center gap-4 pl-2 pt-4 pb-4">
          <p className="text-sm font-medium text-gray-500 antialiased">
            Resume
          </p>
        </div>
        <MenuLink title="Read" icon="DocumentTextIcon" route={'/resume'} />
        <div className="flex items-center gap-4 pl-2 pt-4 pb-4">
          <p className="text-sm font-medium text-gray-500 antialiased">
            Writing
          </p>
        </div>
        {posts ? (
          posts
            .sort((a, b) =>
              new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1
            )
            .map((post) => (
              <BlogLink
                date={post.date}
                key={post.slug}
                title={post.title}
                route={`/posts/${post.slug}`}
              />
            ))
        ) : (
          <></>
        )}
      </nav>
      {mobile ? (
        <div className="pl-2 shadow">
          <MenuIcon
            className=" h-10 w-10 rounded p-2 lg:hidden"
            onClick={() => {
              dispatch({ type: 'OPEN_SIDEBAR' })
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

export default function Sidebar({ posts }: SidebarProps) {
  const { globalState, dispatch } = useContext(globalContext)
  const size = useWindowSize()

  useEffect(() => {
    const main = document.getElementById('main')
    if (globalState.isSideBarOpen && main) {
      main.classList.add('opacity-50')
    } else if (main) {
      main.classList.remove('opacity-50')
    }
  }, [globalState.isSideBarOpen])

  useEffect(() => {
    dispatch({ type: 'CLOSE_SIDEBAR' })
  }, [globalState.selectedRoute])
  const mobile = size.width < 1024
  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })}
      >
        <Navbar posts={posts} mobile={mobile} />
      </OutsideClickHandler>
    </>
  )
}
