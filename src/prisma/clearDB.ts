import { prisma } from "./prisma";

export const clearDB = async () => {
    await prisma.choice.deleteMany();
    await prisma.koreanAlphabet.deleteMany()
    await prisma.question.deleteMany()
    await prisma.quiz.deleteMany()
    await prisma.userQuiz.deleteMany()
    await prisma.user.deleteMany()
    await prisma.questionChoice.deleteMany();
}
clearDB();