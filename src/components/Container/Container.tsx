import { Navbar } from "../Navbar/Navbar";

export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="box-border flex flex-col h-screen w-screen mx-auto">
                <Navbar />
                {children}
            </div>
            <div className="bg-primary">footer</div>
        </div>

    )
}