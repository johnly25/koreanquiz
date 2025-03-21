import { prisma } from "./prisma";

export const clearDB = async () => {
    await prisma.questionChoice.deleteMany()
    await prisma.question.deleteMany()
    await prisma.choice.deleteMany()
    await prisma.questionChoice.deleteMany()
    await prisma.quiz.deleteMany()
    await prisma.userQuiz.deleteMany
}
clearDB();