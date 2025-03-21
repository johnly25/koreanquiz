import { PrismaClient, Prisma } from '@prisma/client'
import { clearDB } from "./clearDB";
import { prisma } from './prisma';

const quizData: Prisma.QuizCreateInput[] = [
    {
        name: 'Korean Consonants',
    }
]

const questionData: Prisma.QuestionCreateInput[] = [
    {
        question: 'What is the romanization of ㄱ?',
        quiz: {
            connectOrCreate: {
                where: {
                    name: 'Korean Consonants'
                },
                create: {
                    name: 'Korean Consonants'
                }
            }
        },
    },

    {
        question: 'What is the romanization of ㄴ?',
        quiz: {
            connectOrCreate: {
                where: {
                    name: 'Korean Consonants'
                },
                create: {
                    name: 'Korean Consonants'
                }
            }
        }
    }
]

const choiceData: Prisma.ChoiceCreateInput[] = [
    {
        choice: 'g/k',
    },
    {
        choice: 'n',
    },
    {
        choice: 'd/t',
    },
    {
        choice: 'r/l',
    },
]

const questionChoiceData: Prisma.QuestionChoiceCreateInput[] = [
    {
        choice: {
            connectOrCreate: {
                where: {
                    choice: 'g/k'
                },
                create: {
                    choice: 'g/k'
                }
            }
        },
        question: {
            connectOrCreate: {
                where: {
                    question: 'What is the romanization of ㄱ?'
                },
                create: {
                    question: 'What is the romanization of ㄱ?'
                }
            }
        },
        isCorrect: true
    },
    {
        choice: {
            connectOrCreate: {
                where: {
                    choice: 'n'
                },
                create: {
                    choice: 'n'
                }
            }
        },
        question: {
            connectOrCreate: {
                where: {
                    question: 'What is the romanization of ㄱ?'
                },
                create: {
                    question: 'What is the romanization of ㄱ?'
                }
            }
        },
        isCorrect: true
    },

]

const main = async () => {
    console.log('clearing db')
    await clearDB();
    console.log('cleared')

    for (const data of quizData) {
        await prisma.quiz.create({ data: data })
    }
    for (const data of questionData) {
        await prisma.question.create({ data: data })
    }
    for (const data of choiceData) {
        await prisma.choice.create({ data: data })
    }
    for (const data of questionChoiceData) {
        await prisma.questionChoice.create({ data: data })
    }
}

main()