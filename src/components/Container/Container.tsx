import { Navbar } from "../Sidebar/Sidebar";

export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="box-border flex flex-col h-screen w-screen mx-auto">
                {children}
            </div>
            <div className="bg-primary">footer</div>
        </div>

    )
}