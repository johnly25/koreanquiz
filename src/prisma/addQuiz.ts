import { PrismaClient, Prisma } from '@prisma/client'
import { clearDB } from "./clearDB";
import { prisma } from './prisma';

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
    const koreanVowels: Prisma.KoreanAlphabetCreateInput[] = await prisma.koreanAlphabet.findMany()
    const questionVowelData: Prisma.QuestionCreateInput[] = koreanVowels.map(element => {
        const question = 'What is the romanization of ' + element.letter
        const answer = element.romanization
        const quiz = 'Korean Vowels'
        return { question, answer, quiz: { connect: { name: quiz } } }
    })
    
    for (const data of questionVowelData) {
        await prisma.question.create({ data: data })
    }

    // put mark all letters as choice
    for (const vowel of koreanVowels) {
        await prisma.choice.create({
            data: {
                choice: vowel.letter
            }
        })
    }

    // get vowel questions 
    const {questions: aldkfjksajdf} = await prisma.quiz.findUnique({
        where: { name: 'Korean Vowels' },
        include: { questions: true }
    })
    console.log(aldkfjksajdf)
    
    // await prisma.questionChoice.create({
    //     data: {
    //        choice: { connect: vowel.letter}
    //        question: {connect: }
    //     }
    // })
    // put all letters as choices for vowels questions


}

// [
//     {
//         question: 'What is the romanization of ㅏ?',
//         answer: 'a',
//         quiz: { connect: { name: 'Korean Vowels' } },
//     },
//     {
//         question: 'What is the romanization of ㅐ?',
//         answer: 'ae',
//         quiz: { connect: { name: 'Korean Vowels' } },
//     },
//     {
//         question: 'What is the romanization of ㅑ?',
//         answer: 'ya',
//         quiz: { connect: { name: 'Korean Vowels' } },
//     },
//     {
//         question: 'What is the romanization of ㅒ?',
//         answer: 'yae',
//         quiz: { connect: { name: 'Korean Vowels' } },
//     },
//     {
//         question: 'What is the romanization of ㅓ?',
//         answer: 'eo',
//         quiz: { connect: { name: 'Korean Vowels' } },
//     },
//     {
//         question: 'What is the romanization of ㅔ?',
//         answer: 'e',
//         quiz: { connect: { name: 'Korean Vowels' } },
//     },
//     {
//         question: 'What is the romanization of ㅕ?',
//         answer: 'yeo',
//         quiz: { connect: { name: 'Korean Vowels' } },
//     },
//     {
//         question: 'What is the romanization of ㅖ?',
//         answer: 'ye',
//         quiz: { connect: { name: 'Korean Vowels' } },
//     },
//     {
//         question: 'What is the romanization of ㅗ?',
//         answer: 'o',
//         quiz: { connect: { name: 'Korean Vowels' } },
//     },
//     {
//         question: 'What is the romanization of ㅗ?',
//         answer: 'o',
//         quiz: { connect: { name: 'Korean Vowels' } },
//     },
// ]



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