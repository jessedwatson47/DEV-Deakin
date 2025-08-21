import React from 'react'
// Radix
import { NavigationMenu, Avatar } from 'radix-ui'
import { DropdownMenu } from "radix-ui";
import {
	HamburgerMenuIcon,
	DotFilledIcon,
	CheckIcon,
	ChevronRightIcon,
  GearIcon,
  ArrowDownIcon,
  ChevronDownIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
// ReactRouter
import { Link, NavLink } from 'react-router-dom'
// Deakin Logos
import DeakinLogo from '../../assets/deakin-logo.png'
import DeakinBadge from '../../assets/deakin-logo-badge.png'
// Auth
import { useAuth } from '../../AuthContext'

function NavBar() {
  const { user, loading, logout } = useAuth();
  return (
    <header className="flex justify-center bg-gray-200 p-4">
      <nav className="flex mx-auto w-full max-w-screen-xl justify-between items-center">
        {/* Brand */}
        <NavLink to="/" className="flex items-center text-xl font-semibold"><img className="h-10 mr-1" src={DeakinBadge} alt="Deakin Logo"/><p className="font-[monospace] leading-none">DEV@Deakin</p></NavLink>

        {/* Main Links*/}
        <NavigationMenu.Root className="relative" aria-label="Main">
          <NavigationMenu.List className="flex gap-2 items-center">

            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <NavLink to="/about" className="rounded-md px-3 py-2 text-m hover:bg-zinc-100">About</NavLink>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <NavLink to="/wall" className="rounded-md px-3 py-2 text-m hover:bg-zinc-100">Wall</NavLink>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <NavLink to="/contact" className="rounded-md px-3 py-2 text-m hover:bg-zinc-100">Contact</NavLink>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            

          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Auth Links*/}
        {user ? (
          <div className="flex items-center gap-4">
            <Avatar.Root className="AvatarRoot">
              <Avatar.Image
                className="AvatarImage h-8"
                src={user.photoURL}
                alt="User Avatar Image"
              />
              <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                <PersonIcon className="w-5 h-5"/>
              </Avatar.Fallback>
            </Avatar.Root>
            {user.displayName ? user.displayName : user.email}
        {/* Drop Down */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="IconButton hover:bg-zinc-100 p-2 cursor-pointer rounded" aria-label="User Menu">
              <ChevronDownIcon />
            </button>
          </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className="DropdownMenuContent flex flex-col gap-2 bg-gray-200 p-4 shadow-md rounded" sideOffset={5}>
                <DropdownMenu.Item className="DropdownMenuItem py-2 px-4 hover:bg-zinc-100 rounded">
                  <Link to="/account">Account</Link>
                </DropdownMenu.Item>

            		<DropdownMenu.Separator className="DropdownMenuSeparator bg-gray-400 h-[1px]" />

                <DropdownMenu.Item className="DropdownMenuItem text-red-500 py-2 px-4 hover:bg-zinc-100 rounded">
                  <button className="cursor-pointer"onClick={logout}>Logout</button>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <NavLink to="/login" className="rounded px-3 py-2 text-m hover:bg-zinc-100">Login</NavLink>
            <NavLink to="/signup" className="rounded bg-zinc-900 px-3 py-2 text-m text-white font-medium hover:opacity-90">Sign up</NavLink>
          </div>
        )}
       
      </nav>
    </header>
  )
}

export default NavBar