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
    PlusIcon,
    GlobeAltIcon
} from "@heroicons/react/24/outline";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import mnnitlogo from "./assets/mnnitlogo.jpg"
import { Link } from "react-router-dom";
import axios from "axios";

const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl: "https://via.placeholder.com/150?text=Profile",
};

const handleSignOut = async () => {
    try {
        const token = localStorage.getItem("usersdatatoken");

        // Call API for logout
        const res = await axios.get('/api/logout', {
            headers: {
                authorization: token,
            },
        });

        if (res.status === 201) {
            console.log("User logged out successfully");
            localStorage.removeItem("usersdatatoken");
        } else {
            console.error("Failed to log out:", res.data);
        }
    } catch (error) {
        console.error("Logout error:", error);
    }
}

const navigation = [
    { name: "Home", to: "/homePage", icon: UserIcon, current: false },
    { name: "Dashboard", to: "/gameDashboard", icon: MapIcon, current: true },
    { name: "My Games", to: "/mygames", icon: PuzzlePieceIcon, current: false },
    { name: "Play Online", to: "/onlinegame", icon: GlobeAltIcon, current: false },
    { name: "Create Game", to: "/gamePage", icon: PlusIcon, current: false },
];

const userNavigation = [
    { name: "Your Profile", to: "/userProfile" },
    { name: "Settings", to: "/setting" },
    { name: "Sign out", to: "/" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const NavGame = () => {
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <Link
                                                to='/'
                                            >
                                                <img
                                                    alt="Scavenger Hunt Logo"
                                                    src={mnnitlogo}
                                                    className="h-12 w-auto rounded-full   shadow-md mr-4"
                                                />
                                            </Link>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.to}
                                                        aria-current={item.current ? "page" : undefined}
                                                        className={classNames(
                                                            item.current
                                                                ? "bg-green-500 text-white"
                                                                : "text-gray-300 hover:bg-yellow-500 hover:text-white",
                                                            "rounded-md px-3 py-2 text-sm font-medium flex items-center space-x-2"
                                                        )}
                                                    >
                                                        <item.icon
                                                            className="h-5 w-5 text-white"
                                                            aria-hidden="true"
                                                        />
                                                        <span>{item.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button className="relative inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-800">
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
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
                                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                                    {userNavigation.map((item) => (
                                                        <MenuItem key={item.name}>
                                                            {({ active }) => (
                                                                <Link
                                                                    to={item.to}
                                                                    onClick={() => {
                                                                        if (item.name === "Sign out") {
                                                                            handleSignOut();
                                                                        }
                                                                    }}
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-yellow-500 text-gray-900"
                                                                            : "text-gray-300",
                                                                        "block px-4 py-2 text-sm"
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            )}
                                                        </MenuItem>
                                                    ))}
                                                </MenuItems>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-800">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Bars3Icon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
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
                                            to={item.to}
                                            aria-current={item.current ? "page" : undefined}
                                            className={classNames(
                                                item.current
                                                    ? "bg-green-500 text-white"
                                                    : "text-gray-300 hover:bg-yellow-500 hover:text-white",
                                                "rounded-md px-3 py-2 text-base font-medium flex items-center space-x-2"
                                            )}
                                        >
                                            <item.icon className="h-5 w-5" aria-hidden="true" />
                                            <span>{item.name}</span>
                                        </DisclosureButton>
                                    ))}
                                </div>
                            </DisclosurePanel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    )
}

export default NavGame