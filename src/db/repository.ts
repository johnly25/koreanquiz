import { prisma } from "@/prisma/prisma";

export const getQuizzes = async () => {
    const quizzes = await prisma.quiz.findMany({

    })

    return quizzes
}