import { getQuestions } from "@/db/repository";
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
    const [activeChoice, setActiveChoice] = useState<ActiveChoiceType>({ choice: '', index: -1 })
    const [chosen, setChosen] = useState(false)
    const [choices, setChoices] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const answer = question.answer

    useEffect(() => {
        setChoices(getChoices(question))
        setIsLoading(false)
    }, [question])

    const handleClick = (choice: string, index: number) => {
        if (!chosen) {
            setActiveChoice({ choice, index })
        }
    }

    const handleCheck = () => {
        if (!chosen && activeChoice.index != -1) {
            setChosen(true)
            console.log(activeChoice.choice == answer ? 'correct' : 'incorrect')
        } else if (chosen && activeChoice.index != -1) {
            setChosen(false)
            setActiveChoice({ choice: '', index: -1 })
            nextQuestion()
        }
    }

    let choicesElement = []
    if (chosen) {
        choicesElement = choices.map((choice, index) => {
            let styles = ''
            if (chosen && activeChoice.index == index && activeChoice.choice == question.answer) {
                styles = 'bg-green-300'
            } else if (chosen && activeChoice.index == index && activeChoice.choice != question.answer) {
                styles = 'bg-red-300'
            } else if (activeChoice.index == index && !chosen) {
                styles = 'bg-sky-300'
            } else if (chosen && choice == question.answer) {
                styles = 'bg-green-300'
            }
            return <div key={index}><button className={`btn w-full h-16 text-lg ${styles}`} onClick={() => handleClick(choice, index)}>{choice}</button></div>
        })
    } else {
        choicesElement = choices.map((choice, index) => {
            let styles = ''
            if (activeChoice.index == index) {
                styles = 'bg-sky-300'
            }
            return <div key={index}><button className={`btn w-full h-16  text-lg ${styles}`} onClick={() => handleClick(choice, index)}>{choice}</button></div>
        })
    }

    if (isLoading) {
        return (<>loading..</>)
    }

    return (
        <div className="grid grid-rows-[1fr_140px]">
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col gap-10 w-full max-w-150">
                    <div className="text-2xl">{question.question}?</div>
                    <div className="grid auto-rows-[1fr] gap-10">{choicesElement}</div>
                </div>
            </div>
            <div className="flex items-center justify-end pr-10">
                <button className="btn btn-secondary mt-5" onClick={handleCheck}>{!chosen ? 'Check' : 'Continue'}</button>
            </div>
        </div>
    )
}


const getChoices = (question: QuestionsType): string[] => {
    const choices: string[] = []
    if (question.answer != null) choices.push(question.answer)
    question.QuestionChoice.forEach(element => choices.push(element.choice.choice))
    return shuffle(choices)
}

const shuffle = (choices: string[]) => {
    const choiceCopy = choices.map(choice => choice)
    let currentIndex = choiceCopy.length;

    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [choiceCopy[currentIndex], choiceCopy[randomIndex]] = [
            choiceCopy[randomIndex], choiceCopy[currentIndex]];
    }
    return choiceCopy;
}