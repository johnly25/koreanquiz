'use client'

import { useState } from "react";

export function NavBar() {
    const [expanded, setExpanded] = useState(false);
  
    const handleClick = () => {
      setExpanded(!expanded)
    }
  
    return (
      <div className={`flex items-start min-h-screen ${expanded ? "w-[256px]" : "w-[64px]"}`}>
        <div className={`bg-blue-500 min-h-screen fixed top-0 overflow-x-hidden transition-all duration-500 ease-in-out ${expanded ? "w-[256px]" : "w-[64px]"}`}>
          <button className="btn" onClick={handleClick}>Hello</button>
          <div className="text-4xl mb-5">Title</div>
          <div>{expanded ? "true" : "false"}</div>
          <ul className="text-2xl flex flex-col gap-2">
            <li className="flex gap-2"><span>ICON</span><a href="">Dashboarddaf</a></li>
            <li className="flex gap-2"><span>ICON</span><a href="">Learn</a></li>
            <li className="flex gap-2"><span>ICON</span><a href="">Quiz</a></li>
            <li className="flex gap-2"><span>ICON</span><a href="">Shop</a></li>
            <li className="flex gap-2"><span>ICON</span><a href="">Setting</a></li>
          </ul>
        </div>
      </div >
    )
  }