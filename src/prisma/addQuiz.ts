import { PrismaClient, Prisma } from '@prisma/client'
import { clearDB } from "./clearDB";
import { prisma } from './prisma';
import { create } from 'domain';

const quizData: Prisma.QuizCreateInput[] = [
    {
        name: 'Korean Consonants',
    },
    {
        name: 'Korean Vowels',
    }
]

const koreanLetterData: Prisma.KoreanAlphabetCreateInput[] = [
    {
        letter: 'ㅏ',
        romanization: 'a',
        isVowel: true,
    },
    {
        letter: 'ㅓ',
        romanization: 'eo',
        isVowel: true,
    },
    {
        letter: 'ㅗ',
        romanization: 'o',
        isVowel: true,
    },
    {
        letter: 'ㅜ',
        romanization: 'u',
        isVowel: true,
    },
    {
        letter: 'ㅡ',
        romanization: 'eu',
        isVowel: true,
    },
    {
        letter: 'ㅣ',
        romanization: 'i',
        isVowel: true,
    },
    {
        letter: 'ㅑ',
        romanization: 'ya',
        isVowel: true,
    },
    {
        letter: 'ㅕ',
        romanization: 'yeo',
        isVowel: true,
    },
    {
        letter: 'ㅛ',
        romanization: 'yo',
        isVowel: true,
    },
    {
        letter: 'ㅠ',
        romanization: 'yu',
        isVowel: true,
    },
]

const createQuestions = async () => {
    for (const data of koreanLetterData) {
        await prisma.koreanAlphabet.create({ data: data })
    }
    const koreanVowels = await prisma.koreanAlphabet.findMany({ where: { isVowel: true } })
    const questionVowelData: Prisma.QuestionCreateInput[] = koreanVowels.map(element => {
        const question = 'What is the romanization of ' + element.letter
        const answer = element.romanization
        const quiz = 'Korean Vowels'
        return { question, answer, quiz: { connect: { name: quiz } } }
    })

    for (const data of questionVowelData) {
        await prisma.question.create({ data: data })
    }

    // put all letters as choice
    // for (const vowel of koreanVowels) {
    //     await prisma.choice.create({
    //         data: {
    //             choice: vowel.romanization
    //         }
    //     })
    // }

    const { questions: vowelQuestions } = await prisma.quiz.findUnique({
        where: { name: 'Korean Vowels' },
        include: {
            questions: {
                include: {
                    QuestionChoice: true
                }
            }
        }
    })

    for (const question of vowelQuestions) {
        const questionid = question.id
        const questionanswer = question.answer
        const filterCorrectAnswer = koreanVowels.filter(vowel => vowel.romanization != questionanswer)
        for (const vowel of filterCorrectAnswer) {
            await prisma.questionChoice.create({
                data: {
                    choice: { connectOrCreate: { where: { choice: vowel.romanization }, create: { choice: vowel.romanization } } },
                    question: { connect: { id: questionid } }
                }
            })
        }
    }
}




const main = async () => {
    console.log('clearing db')
    await clearDB();
    console.log('cleared')

    for (const data of quizData) {
        await prisma.quiz.create({ data: data })
    }
    createQuestions()
}

main()