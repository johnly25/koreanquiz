import { NavBar } from "@/components/Navbar/Navbar"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1">
                <div className="h-screen text-4xl" >{children}</div>
            </div>
        </div >
    )
}