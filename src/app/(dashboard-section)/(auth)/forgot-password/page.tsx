'use client'
import { useAuth, useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function ForgotPasswordPage() {
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { isLoaded } = useSignIn()
  const backgroundImageCSS = 'bg-[url(/assets/images/LSF3.webp)]'

  useEffect(() => {
    if (isSignedIn) {
      router.push('/')
    }
  }, [isSignedIn, router])

  if (!isLoaded) {
    return null
  }


  return (
    <div className="flex h-screen box-border grid grid-cols-12">
      <div className="col-span-4 p-12 pt-24 flex flex-col items-center">
        {!successfulCreation && <ProvideEmail setSuccessfulCreation={setSuccessfulCreation} error={error} setError={setError} />}
        {successfulCreation && <ResetPassword error={error} setError={setError} />}
      </div>
      <div className="text-center col-span-8">
        <div className={"min-h-full max-h-full " + backgroundImageCSS}></div>
      </div>
    </div>
  )
}

interface ProfileEmailProps {
  setSuccessfulCreation: Dispatch<SetStateAction<boolean>>
}

function ProvideEmail({ setSuccessfulCreation, error, setError }) {
  const headerLabel = "Sign in"
  const { signIn } = useSignIn()
  const [email, setEmail] = useState('')


  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true)
        setError('')
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  return (
    <div>
      <div>
        <p>{headerLabel}</p>
        <br />
      </div>
      <div className="flex flex-col pb-4 gap-2">
        {error && <p>{error}</p>}
        <fieldset className="fieldset w-72 my-0 py-0 pb-2">
          <legend className="fieldset-legend py-0 pb-2">Provide your email address</legend>
          <input type="text" className="input" placeholder="e.g john@doe.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </fieldset>
      </div>
      <button className="btn btn-block" onClick={create}>Send password reset code</button>
    </div>
  )
}
//reset the password  
function ResetPassword({ error, setError }) {
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [secondFactor, setSecondFactor] = useState(false)
  const { signIn, setActive } = useSignIn()


  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true)
          setError('')
        } else if (result.status === 'complete') {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId })
          setError('')
        } else {
          console.log(result)
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  //add on change for values and 
  return (
    <div>
      <div>
        <p>{ }</p>
        <br />
      </div>
      <div className="flex flex-col pb-4 gap-2">
        {error && <p>{error}</p>}
        <fieldset className="fieldset w-72 my-0 py-0 pb-2">
          <legend className="fieldset-legend py-0 pb-2">Enter Code Sent to Email</legend>
          <input type="text" className="input" placeholder="e.g john@doe.com" value={code} onChange={(e) => setCode(e.target.value)}/>
        </fieldset>
        <fieldset className="fieldset w-72 my-0 py-0 pb-2">
          <legend className="fieldset-legend py-0 pb-2">Enter New Password</legend>
          <input type="password" className="input" placeholder="e.g john@doe.com" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </fieldset>
      </div>
      <button className="btn btn-block" onClick={reset}>Reset Password</button>
    </div>
  )
}