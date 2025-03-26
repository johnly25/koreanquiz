'use client'

import { useAuth, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useContext } from 'react';
import { createContext } from 'react';

export const SideBarContext = createContext(true);

const navItems = [
    { icon: 'ICON', label: 'Dashboard', path: '/dashboard' },
    { icon: 'ICON', label: 'Learn', path: '' },
    { icon: 'ICON', label: 'Quiz', path: '/quizzes' },
    { icon: 'ICON', label: 'Sign up', path: '/signup' },
    { icon: 'ICON', label: 'Sign in', path: '/signin' },
    { icon: 'ICON', label: 'Shop', path: '' },
    { icon: 'ICON', label: 'Setting', path: '' },
]

const Menu = () => {
    const expanded = useContext(SideBarContext)
    const { isSignedIn } = useAuth();
    const { signOut } = useClerk()

    const menuItems = navItems.map(item => {
        if (!(isSignedIn && (item.label == 'Sign in' || item.label == 'Sign up'))) {
            return <li key={item.label} className='flex gap-2'><span>{item.icon}</span>{expanded && <a href={item.path}>{item.label}</a>}</li>
        }
    })
    const logout = () => {
        signOut()
    }

    return (
        <ul className={`text-2xl flex flex-col gap-2  ${expanded ? "items-start" : "items-center"}`}>
            {menuItems}
            {isSignedIn && <li onClick={logout}>Log out</li>}
        </ul>
    )
}

export function NavBar() {
    const [expanded, setExpanded] = useState(true);

    const handleClick = () => {
        setExpanded(!expanded)
    }

    const Toggle = () => {
        return (
            <div onClick={handleClick}>
                <label className="btn btn-circle swap swap-rotate" onClick={handleClick}>
                    <input type="checkbox" checked={expanded} onChange={handleClick} />
                    <svg
                        className="swap-off fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512">
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>
                    <svg
                        className="swap-on fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512">
                        <polygon
                            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                </label>
            </div>
        )
    }

    return (
        <div className={` bg-blue-500 flex items-start min-h-screen transition-all duration-500 ease-in-out ${expanded ? "w-[256px] min-w-[256px]" : "w-[64px] min-w-[64px]"}`}>
            <div className={`bg-blue-500 overflow-x-hidden h-full fixed top-0 transition-all duration-500 ease-in-out ${expanded ? "w-[256px]" : "w-[64px]"}`}>
                <Toggle />
                <div className="text-4xl mb-5">Title</div>
                <div>{expanded ? "true" : "false"}</div>
                <SideBarContext value={expanded}>
                    <Menu />
                </SideBarContext>
            </div>
        </div >
    )
}