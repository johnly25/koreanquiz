'use client'
// import { useAuth } from "@/providers/authcontext"
import { useSession, useSignIn,  } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export function SignInForm() {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    
    const handleSubmit = async () => {
        if (!isLoaded) return
        try {
            const signInAttempt = await signIn.create({
                identifier: email,
                password,
            })
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.push('/dashboard')
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
            }
        } catch (err) {
            console.error('Error:', JSON.stringify(err, null, 2))
        }
    }

    return (
        <div>
            <div>
                <p>Sign in</p>
            </div>
            <div className="flex flex-col pb-4 gap-2">
                <fieldset className="fieldset w-72 my-0 py-0 pb-2">
                    <legend className="fieldset-legend py-0 pb-2">Email/Username</legend>
                    <input type="text" className="input" placeholder="Type here" value={email} onChange={(e) => setEmail(e.target.value)} />
                </fieldset>
                <fieldset className="fieldset w-72 my-0 py-0 pb-2">
                    <legend className="fieldset-legend py-0 pb-2">Password</legend>
                    <input type="password" className="input" placeholder="Type here" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="flex justify-end"><a href="/forgot-password" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">forgot password?</a></div>
                </fieldset>
            </div>
            <button className="btn btn-block" onClick={handleSubmit}>Sign in</button>
        </div>
    )
}
