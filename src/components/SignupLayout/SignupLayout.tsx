'use client'

// import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { SignupForm } from "../SignupForm/SignupForm";
import { Verification } from "../Verification/Verification";

interface SignupLayout {
    children: ReactNode,
    buttonLabel: string,
    headerLabel: string,
    backgroundImageCSS: string,
}

interface signUpInfoType {
    name: string,
    email: string,
    username: string,
    password: string
}

export function SignupLayout() {
    const [verifying, setVerifying] = useState(false)

    return (
        <div className="flex-auto box-border grid grid-cols-12">
            <div className="col-span-4 p-12 pt-24 flex flex-col items-center">
                {!verifying ? <SignupForm setVerifying = {setVerifying}/> : <Verification setVerifying = {setVerifying}/>}
            </div>
            <div className="text-center col-span-8">
                <div className={"min-h-full max-h-full " + "bg-[url(/assets/images/LSF1.png)]"}></div>
            </div>
        </div>
    )
}


