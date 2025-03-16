'use client'

import { SignUpResource } from "@clerk/types";
import { SetStateAction, useState } from "react";

interface signUpInfoType {
    name: string,
    email: string,
    username: string,
    password: string
}

interface signUpFormProps {
    isLoaded: boolean,
    signUp: SignUpResource | undefined,
    setVerifying: React.Dispatch<SetStateAction<boolean>>
}

export function SignupForm({ isLoaded, signUp, setVerifying }: signUpFormProps) {
    const [signUpInfo, setSignUpInfo] = useState<signUpInfoType>({
        name: "",
        email: "",
        username: "",
        password: ""
    })

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
            await signUp?.create({
                emailAddress: signUpInfo.email,
                password: signUpInfo.password,
                username: signUpInfo.username,
                firstName: signUpInfo.name
            })

            await signUp?.prepareEmailAddressVerification({
                strategy: 'email_code',
            })

            setVerifying(true)
        } catch (err: any) {
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
                    <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                        <input type="password" required placeholder="Password" minLength={8} name={fields.password.name} value={signUpInfo[fields.password.name as keyof signUpInfoType]} onChange={handleChange}  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                    </label>
                    <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br />At least one number
                        <br />At least one lowercase letter
                        <br />At least one uppercase letter
                    </p>
                </fieldset>
            </div>
            <button className="btn btn-block" onClick={handleSubmit}>Sign up</button>
            <div id='clerk-captcha' />
        </div>
    )
}
