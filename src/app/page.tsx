import { NavBar } from "@/components/Navbar/Navbar";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex">
      this is home page &nbsp;
      <Link href="/dashboard">dashboard</Link>
    </div >
  )
}
