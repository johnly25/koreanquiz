'use client'
import { Container } from "@/components/Container/Container";
import { Navbar } from "@/components/Navbar/Navbar";
import { useState } from "react";

export default function Home() {
  const [isExpanded, setExpanded] = useState(false);

  const onClick = () => {
    setExpanded(!isExpanded)
  }
  return (
    <div className="box-border grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr] min-h-screen">
      <div className={`bg-blue-500 sticky self-start top-0 h-screen ${isExpanded ? "w-64" : "w-16"
        } sm:${isExpanded ? "w-[256px]" : "w-16"}`}>
        <div><label className="btn btn-circle swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input onClick={onClick} type="checkbox" />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512">
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512">
            <polygon
              points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label></div>
        <div>Sidebar</div>

      </div>
      <div className="bg-red-500">
        <div className="h-screen">Main</div>
        <div className="h-screen">sticky</div>
        <div className="h-screen">testing</div>
        <div className="h-screen">testing</div>
        <div className="h-screen">testing</div>
      </div>
    </div>
  )
}
