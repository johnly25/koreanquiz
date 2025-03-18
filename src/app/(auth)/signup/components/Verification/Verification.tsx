import { SetActive, SignUpResource } from "@clerk/types"
import { useRouter  } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import router from "next/router"

interface VerificationProps {
    signUp: SignUpResource | undefined
    setActive: SetActive | undefined
    setVerifying: Dispatch<SetStateAction<boolean>>
    isLoaded: boolean
}

export function Verification({ setActive, signUp, isLoaded, setVerifying }: VerificationProps) {
    const [code, setCode] = useState('')
    const router = useRouter()

    const handleChange = (e) => {
        setCode(e.target.value)
    }

    const handleVerify = async (e) => {
        e.preventDefault()
        if (!isLoaded) return
        
        try {
            const signUpAttempt = await signUp?.attemptEmailAddressVerification({
                code,
            })

            if (signUpAttempt?.status === 'complete') {
                if (setActive != undefined) {
                    await setActive({ session: signUpAttempt?.createdSessionId })
                    router.push('/')
                }
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
            
        } catch (err: any) {
            console.error('Error:', JSON.stringify(err, null, 2))
        }
    }

    return (
        <div>
            <div>Verification Code</div>
            <div>
                <fieldset className="fieldset mb-4">
                    <legend className="fieldset-legend">Please Enter Verification Code</legend>
                    <input type="text" className="input" placeholder="Type here" value={code} onChange={handleChange} />
                    <p className="fieldset-label">Check your email for code</p>
                </fieldset>
                <div className='flex flex-col gap-2'>
                    <button className="btn" onClick={handleVerify}>Continue</button>
                    <button className="btn" onClick={() => setVerifying(false)}>Go Back</button>
                </div>

            </div>
        </div>
    )
}