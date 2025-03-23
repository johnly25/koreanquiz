import { createClerkClient } from '@clerk/backend'
import * as dotenv from 'dotenv'
dotenv.config()
import { prisma } from './prisma'


const syncClerkToPrisma = async () => {
    // const client = await clerkClient.users.getUserList
    const client = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
    const userList = await client.users.getUserList()
    for (const user of userList.data) {
        console.log(user.id)
        console.log(user.username)
        console.log(user.firstName)
        console.log(user.lastName)
        console.log(user.emailAddresses[0].emailAddress)
        //check if user is in database 
        //store if doesn't have in database 
        //use upsert but don't update anything
        await prisma.user.upsert({
            where: {
                clerkid: user.id
            },
            update: {},
            create: {
                clerkid: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName,
                username: user.username
            }
        })
    }
}

syncClerkToPrisma()