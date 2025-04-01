import { Prisma } from ".prisma/client"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const questionInclude = Prisma.validator<Prisma.QuestionInclude>()({
    QuestionChoice: {
        include: {
            choice: true
        }
    }
})

export type QuestionsType = Prisma.QuestionGetPayload<{
    include: typeof  questionInclude;
}>