'use client'

import { useState } from "react";

export function NavBar() {
    const [expanded, setExpanded] = useState(true);

    const handleClick = () => {
        setExpanded(!expanded)
    }

    return (
        <div className={`bg-blue-500 min-h-screen transition-all duration-500 ease-in-out ${expanded ? "w-[256px]" : "w-[64px]"}`}>
            <div className={`overflow-x-hidden bg-red-500 h-full fixed top-0 transition-all duration-500 ease-in-out ${expanded ? "w-[256px]" : "w-[64px]"}`}>
                <button className="btn" onClick={handleClick}>Hello</button>
                <div className="text-4xl mb-5">Title</div>
                <div>{expanded ? "true" : "false"}</div>
                <ul className={`text-2xl flex flex-col gap-2  ${expanded ? "items-start" : "items-center"}`}>
                    <li className="flex gap-2"><span>ICON</span> {expanded && <a href="">Dashboard</a>}</li>
                    <li className="flex gap-2"><span>ICON</span> {expanded && <a href="">Learn</a>}</li>
                    <li className="flex gap-2"><span>ICON</span> {expanded && <a href="">Quiz</a>}</li>
                    <li className="flex gap-2"><span>ICON</span> {expanded && <a href="">Shop</a>}</li>
                    <li className="flex gap-2"><span>ICON</span> {expanded && <a href="">Setting</a>}</li>
                </ul>
            </div>
        </div >
    )
}