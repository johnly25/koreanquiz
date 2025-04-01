import { QuestionsType } from "@/prisma/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface QuestionProps {
    question: QuestionsType,
    nextQuestion: () => void
    incrementScore: () => void
}

interface ActiveChoiceType {
    choice: string,
    index: number,
}

export function Question({ question, nextQuestion, incrementScore }: QuestionProps) {
    const [activeChoice, setActiveChoice] = useState<ActiveChoiceType>()
    const [chosen, setChosen] = useState(false)
    const choices: string[] = getChoices(question)
    const answer = question.answer

    const handleClick = (choice: string, index: number) => {
        console.log(index)
        setActiveChoice({ choice, index })
        console.log(activeChoice)
    }

    const handleCheck = () => {
        if (!chosen) {
            setChosen(true)
            if (activeChoice?.choice == answer) {
                console.log('correct')
            } else {
                console.log('incorrect')
            }
        } else {
            setChosen(false)
            setActiveChoice(undefined)
            nextQuestion()
        }
    }

    const choicesElement = choices.map((choice, index) => {
        let styles = ''
        if (activeChoice?.index == index && !chosen) {
            styles = 'bg-sky-300'
        } else if (chosen && activeChoice?.index == index && activeChoice.choice == question.answer) {
            styles = 'bg-green-300'
        } else if (chosen && activeChoice?.index == index && activeChoice.choice != question.answer) {
            styles = 'bg-red-300'
        }
        return <button className={`btn ${styles}`} onClick={() => handleClick(choice, index)} key={index}>{choice}</button>
    })

    return (
        <>
            <div><Link href='/quizzes'><button className="btn">Exit</button></Link></div>
            <div>{question.question}</div>
            <div>{choicesElement}</div>
            <div><button className="btn btn-secondary mt-5" onClick={handleCheck}>{!chosen ? 'Check' : 'Continue'}</button></div>
        </>
    )
}

//todo: randomly sort array 
const getChoices = (question: QuestionsType): string[] => {
    const choices: string[] = []
    if (question.answer != null) choices.push(question.answer)
    question.QuestionChoice.forEach(element => choices.push(element.choice.choice))

    return choices
}