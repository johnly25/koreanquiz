'use client'
import { useClerk } from '@clerk/nextjs';
import { useUser as userUserClerk } from '@clerk/nextjs'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

interface UserContextType {
    user: object | null,
    signout: () => void,
    isSignedIn: boolean,
    setSessionId: Dispatch<SetStateAction<string>>
}

const UserContext = createContext<UserContextType>()

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(null)
    const { isSignedIn: isSignedInClerk, user: clerkUser, isLoaded } = userUserClerk()
    const [isSignedIn, setIsSignedIn] = useState(null)
    const [loading, setLoading] = useState<boolean>(true); // Loading state to handle async checks

    useEffect(() => {
        const isSignedinValue = localStorage.getItem('isSignedIn')
        setIsSignedIn(isSignedinValue !== null
            ? JSON.parse(isSignedinValue) : false)
    })

    useEffect(() => {
        if (isLoaded && isSignedInClerk) {
            setIsSignedIn(true)
            localStorage.setItem('isSignedIn', 'true')
        } else if (isLoaded && !isSignedInClerk) {
            setIsSignedIn(false)
            localStorage.setItem('isSignedIn', 'false')
        }
        setLoading(false)
    }, [isSignedInClerk, isLoaded])


    return (
        <UserContext.Provider value={{ isSignedIn, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
};