'use client'
import { Prisma } from ".prisma/client"
import { useState } from "react"
import { Question } from "../Question/Question"

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

export function Quiz({ questions }: { questions: QuestionsType[] }) {
    const [quiz, setQuiz] = useState({
        totalQuestions: questions.length,
        totalCorrect: 0,
        currentQuestion: 0,
    })
    const [quizOver, setQuizOver] = useState(false)

    const nextQuestion = () => {
        if (quiz.currentQuestion + 1 < quiz.totalQuestions) {
            setQuiz({ ...quiz, currentQuestion: quiz.currentQuestion + 1 })
        } else {
            setQuizOver(true)
        }
    }
    
    //use effect or if statement to check game state
    return (
        <>
            {!quizOver && <Question question={questions[quiz.currentQuestion]} nextQuestion={nextQuestion}></Question>}
            {quizOver && <div>quiz is over!</div>}
        </>
    )
}