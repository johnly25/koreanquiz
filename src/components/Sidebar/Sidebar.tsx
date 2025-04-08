'use client'
import { useUser } from "@/providers/UserProvider";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useSideBar } from "@/providers/SideBarProvider";
import { House, Settings, BookOpenCheck, UserRoundPlus, ShoppingBag, LogIn, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation'

const navItemStyle = "w-[28px] h-[38px]"
const navItems = [
    { icon: <House className={navItemStyle} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <BookOpenCheck className={navItemStyle} />, label: 'Quiz', path: '/quizzes' },
    { icon: <UserRoundPlus className={navItemStyle} />, label: 'Sign up', path: '/signup' },
    { icon: <LogIn className={navItemStyle} />, label: 'Sign in', path: '/signin' },
    { icon: <ShoppingBag className={navItemStyle} />, label: 'Shop', path: '' },
    { icon: <Settings className={navItemStyle} />, label: 'Setting', path: '' },
]

const Menu = () => {
    const pathname = usePathname()
    const { expanded } = useSideBar()
    const { isSignedIn, loading } = useUser()
    const { signOut } = useAuth()
    const router = useRouter()
    console.log(pathname)
    // pathname is the same as path then active state == true
    
    const menuItems = navItems.map((item, index) => {
        if (!loading && !(isSignedIn && (item.label == 'Sign in' || item.label == 'Sign up'))) {
            return <li key={index} className={`flex justify-center items-center gap-2 hover:bg-primary-400 active:bg-primary-600 ${pathname == item.path && 'bg-primary-700'}`}><div>{item.icon}</div>{expanded && <Link href={item.path}><div className="">{item.label}</div></Link>}</li>
        }
    })

    const logout = () => {
        signOut({ redirectUrl: '/dashboard' })
    }

    return (
        <ul className={`text-3xl flex flex-col gap-4  ${expanded ? "items-start" : "items-center"}`}>
            {menuItems}
            {isSignedIn &&
                <li className="flex justify-center items-center gap-2 hover:bg-primary-400" onClick={logout}><div><LogOut className={navItemStyle} /></div><div className="flex justify-center items-center">Log out</div></li>}
        </ul>
    )
}

export function Sidebar() {
    const { expanded, setExpanded } = useSideBar();

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
        <div className={`pl-4 bg-primary-500 font-[400] overflow-x-hidden h-full fixed top-0 transition-all duration-500 ease-in-out ${expanded ? "w-[256px]" : "w-[64px]"}`}>
            <Toggle />
            <div className="text-4xl mb-5">Title</div>
            <Menu />
        </div>
    )
}