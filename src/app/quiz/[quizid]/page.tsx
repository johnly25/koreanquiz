import { getQuestions } from "@/db/repository"
import { Quiz } from "./components/Quiz/Quiz";
import { QuestionsType } from "@/prisma/types";

export default async function page({ params }: { params: { quizid: string } }) {
    const { quizid } = (await params)
    const convertQuizId = Number(quizid)
    const questions = await getQuestions(convertQuizId)
    const filteredQuestions = filterQuestionsChoices(questions)
  
    return (
        <>
            <Quiz questions={filteredQuestions} />
        </>
    )
}

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