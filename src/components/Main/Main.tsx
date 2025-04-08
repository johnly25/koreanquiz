'use client'
import { useSideBar } from "@/providers/SideBarProvider"

export function Main({
    children,
}: {
    children: React.ReactNode
}) {
    const { expanded } = useSideBar()

    return (
        <div className={`flex-1 h-screen transition-all duration-500 ease-in-out ${expanded ? 'ml-[256px]' : 'ml-[64px]'}`}>
            {children}
        </div>
    )
}