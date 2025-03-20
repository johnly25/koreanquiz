import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const clearDB = async () => {
    await prisma.user.deleteMany()
}

console.log('clearing database')

clearDB();