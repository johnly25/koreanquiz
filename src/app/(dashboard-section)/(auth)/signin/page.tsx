import { SignInForm } from "./components/SignInForm"

export default function signinPage() {
  const backgroundImageCSS = 'bg-[url(/assets/images/LSF2.webp)]'

  return (
    <div className="flex h-screen box-border grid grid-cols-12">
      <div className="col-span-4 p-12 pt-24 flex flex-col items-center">
        <SignInForm />
      </div>
      <div className="text-center col-span-8">
        <div className={"min-h-full max-h-full " + backgroundImageCSS}></div>
      </div>
    </div>
  )
}