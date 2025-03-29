// 'use client'
// import { useParams } from "next/navigation"
import { Prisma } from "@prisma/client";

import { getQuestions } from "@/db/repository"
import { Quiz } from "./components/Quiz/Quiz";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const questionInclude = Prisma.validator<Prisma.QuestionInclude>()({
    QuestionChoice: {
        include: {
            choice: true
        }
    }
})

type QuestionsType = Prisma.QuestionGetPayload<{
    include: typeof questionInclude;
}>

export default async function page({ params }: { params: { quizid: string } }) {
    const { quizid } = (await params)
    const convertQuizId = Number(quizid)
    const questions = await getQuestions(convertQuizId)

    const filterQuestionsChoices = (questions: QuestionsType[]) => {
        const filteredQuestionsChoices = questions.map(question => {
            const newChoices = []
            const questionChoices = question.QuestionChoice
            if (questionChoices.length < 3) {
                return question
            }
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * questionChoices.length)
                newChoices.push(questionChoices.splice(randomIndex, 1)[0])
            }
            return { ...question, QuestionChoice: newChoices }
        })
        return filteredQuestionsChoices
    }

    console.log(filterQuestionsChoices(questions))

    //go through each question in array
    //create question object with question and answer, and choices 
    // but make the choices have only 3 and make them get pulled randomly


    return (
        <>
            <Quiz questions={questions} />
        </>
    )
}