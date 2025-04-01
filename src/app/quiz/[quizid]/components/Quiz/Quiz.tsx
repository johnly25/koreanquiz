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
    
    const totalPercent = Math.round((quiz.currentQuestion/quiz.totalQuestions) * 100)
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
        <>
            <progress className="progress progress-accent w-200" value={totalPercent} max="100"></progress>
            {<div>{quiz.currentQuestion + 1} of {quiz.totalQuestions}</div>}
            {<Question question={questions[quiz.currentQuestion]} nextQuestion={nextQuestion} incrementScore={incrementScore} />}
        </>
    )
}