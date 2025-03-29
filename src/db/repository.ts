import { prisma } from "@/prisma/prisma";

export const getQuizzes = async () => {
    const quizzes = await prisma.quiz.findMany({

    })
    return quizzes
}

export const getQuestions = async (quizid: number) => {
    const questions = await prisma.question.findMany({
        where: {
            quizid: quizid
        },
        include: {
            QuestionChoice: {
                include: {
                    choice: true
                }
            }
        }
    })
    return questions
}