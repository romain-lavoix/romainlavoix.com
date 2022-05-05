import MenuLink from './MenuLink'

export default function Sidebar() {
  return (
    <nav
      className="flex:none fixed hidden h-full w-56 border-r-[1px] bg-gray-50 p-4 lg:block"
      aria-label="Sidebar"
    >
      <h1 className="pl-2 pb-6 text-sm font-bold antialiased">Romain Lavoix</h1>
      <MenuLink title="Home" icon="Home" />
      <MenuLink title="Setup" icon="DesktopComputer" />
    </nav>
  )
}
