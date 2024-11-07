import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  MapIcon,
  TrophyIcon,
  PuzzlePieceIcon,
  UserIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl: "https://via.placeholder.com/150?text=Profile",
};

const navigation = [
  { name: "Hunt Map", href: "#", icon: MapIcon, current: true },
  { name: "Clues", href: "#", icon: PuzzlePieceIcon, current: false },
  { name: "Leaderboard", href: "#", icon: TrophyIcon, current: false },
  { name: "Profile", href: "#", icon: UserIcon, current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Nav = () => {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img alt="Scavenger Hunt Logo" src="" className="h-8 w-8" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-600 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium flex items-center space-x-2"
                        )}
                      >
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    className="relative inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none   focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-800">
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    {/* Add a badge for notifications if needed */}
                    <span className="absolute -right-1 top-1 bg-red-500 rounded-full px-1 text-xs font-bold text-white"></span>
                  </button>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-800">
                        <img
                          alt=""
                          src={user.imageUrl}
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-800">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium flex items-center space-x-2"
                  )}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.name}</span>
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </>
  );
};

export default Nav;
