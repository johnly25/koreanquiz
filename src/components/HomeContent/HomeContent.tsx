'use client'

import { useAuth, useUser } from "@clerk/nextjs";

export function HomeContent() {
    const { isSignedIn, userId, signOut, isLoaded } = useAuth()
    const { user } = useUser()

    const onClick = async () => {
        if (!isLoaded) {
            return
        }

        try {
            await signOut()
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    if (isSignedIn) {
        return (
            <div>
                <div> {userId}</div>
                <div>{'hello ' + user?.username}</div>
                {'hello ' + user?.firstName}
                <button className="btn btn-soft btn-secondary" onClick={onClick}>Logout</button>
            </div>
        )
    }

}
