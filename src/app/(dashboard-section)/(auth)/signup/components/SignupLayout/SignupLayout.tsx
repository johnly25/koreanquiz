'use client'

import { useSignUp } from "@clerk/nextjs";
import { ReactNode, useState } from "react";
import { SignupForm } from "../SignupForm/SignupForm";
import { Verification } from "../Verification/Verification";

interface SignupLayout {
    children: ReactNode,
    buttonLabel: string,
    headerLabel: string,
    backgroundImageCSS: string,
}

// interface signUpInfoType {
//     name: string,
//     email: string,
//     username: string,
//     password: string
// }

export function SignupLayout() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [verifying, setVerifying] = useState(false)

    return (
        <div className="flex-auto flex min-h-screen box-border grid grid-cols-12">
            <div className="col-span-4 p-12 pt-24 flex flex-col items-center">
                {!verifying ? <SignupForm isLoaded={isLoaded} signUp={signUp} setVerifying={setVerifying} /> : <Verification signUp={signUp} setActive={setActive} isLoaded={isLoaded}  setVerifying={setVerifying} />}
            </div>
            <div className="text-center col-span-8">
                <div className={"min-h-full max-h-full " + "bg-[url(/assets/images/LSF1.png)]"}></div>
            </div>
        </div>
    )
}


