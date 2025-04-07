import { Main } from "@/components/Main/Main"
import { Sidebar } from "@/components/Sidebar/Sidebar"
import { useSideBar } from "@/providers/SideBarProvider"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <Sidebar />
            <Main>
                {children}
            </Main>
        </div>
    )
}