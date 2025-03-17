import { Container } from "@/components/Container/Container";
import { NavBar } from "@/components/Navbar/Navbar";

export default function Home() {

  return (
    <div className="flex">
      <NavBar />
      <div className="flex-1">
        <div className="h-screen text-4xl" >Main</div>
        <div className="h-screen">sticky</div>
        <div className="h-screen">testing</div>
        <div className="h-screen">testing</div>
        <div className="h-screen">testing</div>
      </div>
    </div >
  )
}
