'use client'
import { useState } from "react"
import { Question } from "../Question/Question"
import { QuestionsType } from "@/prisma/types"
import Link from "next/link"

interface QuizProps {
    questions: QuestionsType[]
}

export function Quiz({ questions }: QuizProps) {
    const [quiz, setQuiz] = useState({
        totalQuestions: questions.length,
        totalCorrect: 0,
        currentQuestion: 0,
    })

    const totalPercent = Math.round((quiz.currentQuestion / quiz.totalQuestions) * 100)
    const [quizOver, setQuizOver] = useState(false)

    const incrementScore = () => {
        setQuiz({ ...quiz, totalCorrect: quiz.totalCorrect++ })
    }

    const nextQuestion = () => {
        if (quiz.currentQuestion + 1 < quiz.totalQuestions) {
            setQuiz({ ...quiz, currentQuestion: quiz.currentQuestion + 1 })
        } else {
            setQuizOver(true)
        }
    }

    if (questions.length == 0 || quizOver) {
        return (
            <>
                <div>
                    <div>quiz is over!</div >
                    <Link href="/quizzes"><button className="btn">return to quizzes</button></Link>
                </div >
            </>
        )
    }

    return (
        <div className="grid grid-rows-[100px_1fr] grid-cols-[100%]; h-screen">
            <div className="flex gap-4">
                <div className="flex justify-center items-center"><Link href='/quizzes'><button className="btn">Exit</button></Link></div>
                <div className="flex flex-1 justify-center items-center">
                    <progress className="progress progress-accent w-full max-w-200 h-6" value={totalPercent} max="100"></progress>
                </div>
                <div className="flex justify-center items-center">{quiz.currentQuestion + 1} of {quiz.totalQuestions}</div>
            </div>
            {<Question question={questions[quiz.currentQuestion]} nextQuestion={nextQuestion} incrementScore={incrementScore} />}
        </div>
    )
}