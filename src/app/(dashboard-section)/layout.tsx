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
                {/* <div className='flex bg-red-500 h-[48px]'>Navbar 2</div> */}
                <div className="h-screen" >{children}</div>
            </div>
        </div >
    )
}