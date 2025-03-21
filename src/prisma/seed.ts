import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const questionData: Prisma.QuestionCreateInput[] = [
    {
        question: 'what is 2 + 2?'
    },
    {
        question: 'what is 2 + 3?'
    }
]

const choiceData: Prisma.ChoiceCreateInput[] = [
    {
        choice: '4',
    },
    {
        choice: '1',
    },
    {
        choice: '3',
    },
    {
        choice: '1',
    },
]

const questionChoice: Prisma.QuestionChoiceCreateInput[] = [
    {
        ,
    },
]

export async function main() {
    for (const data of questionData) {
        await prisma.question.create({ data: data })
    }
    for (const data of choiceData) {
        await prisma.choice.create({ data: data })
    }
}
}

main()