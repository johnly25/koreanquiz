'use client'

import { useSignUp } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

interface signUpInfoType {
    name: string,
    email: string,
    username: string,
    password: string
}

export function SignupForm({ setVerifying }) {
    const [signUpInfo, setSignUpInfo] = useState<signUpInfoType>({
        name: "",
        email: "",
        username: "",
        password: ""
    })

    const { isLoaded, signUp, setActive } = useSignUp()
    const [code, setCode] = useState('')

    const fields =
    {
        name: { label: 'Name', name: 'name', placeholder: '' },
        email: { label: 'Email', name: 'email', placeholder: '' },
        username: { label: 'Username', name: 'username', placeholder: '' },
        password: { label: 'Password', name: 'password', placeholder: '' },
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpInfo({
            ...signUpInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isLoaded) return
        try {
            const signupres = await signUp.create({
                emailAddress: signUpInfo.email,
                password: signUpInfo.password,
                username: signUpInfo.username,
                firstName: signUpInfo.name
            })

            console.log(signupres)
            // Send the user an email with the verification code
            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            })

            // Set 'verifying' true to display second form
            // and capture the OTP code
            setVerifying(true)

        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (
        <div>
            <div>
                <p>Sign up</p>
            </div>
            <div className="flex flex-col pb-4 gap-2">
                <fieldset key={fields.name.label} className="fieldset w-72 my-0 py-0 pb-2">
                    <legend className="fieldset-legend py-0 pb-2">{fields.name.label}</legend>
                    <input type="text" className="input" placeholder="Type here" name={fields.name.name} value={signUpInfo[fields.name.name as keyof signUpInfoType]} onChange={handleChange} />
                </fieldset>

                <fieldset key={fields.email.label} className="fieldset w-72 my-0 py-0 pb-2">
                    <legend className="fieldset-legend py-0 pb-2">{fields.email.label}</legend>
                    <input type="text" className="input" placeholder="Type here" name={fields.email.name} value={signUpInfo[fields.email.name as keyof signUpInfoType]} onChange={handleChange} />
                </fieldset>

                <fieldset key={fields.username.label} className="fieldset w-72 my-0 py-0 pb-2">
                    <legend className="fieldset-legend py-0 pb-2">{fields.username.label}</legend>
                    <input type="text" className="input" placeholder="Type here" name={fields.username.name} value={signUpInfo[fields.username.name as keyof signUpInfoType]} onChange={handleChange} />
                </fieldset>

                <fieldset key={fields.password.label} className="fieldset w-72 my-0 py-0 pb-2">
                    <legend className="fieldset-legend py-0 pb-2">{fields.password.label}</legend>
                    <input type="text" className="input" placeholder="Type here" name={fields.password.name} value={signUpInfo[fields.password.name as keyof signUpInfoType]} onChange={handleChange} />
                </fieldset>
            </div>
            <button className="btn btn-block" onClick={handleSubmit}>Sign up</button>
            <div id='clerk-captcha' />
        </div>
    )
}
