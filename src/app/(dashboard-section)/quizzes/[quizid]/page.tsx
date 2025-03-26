// 'use client'
// import { useParams } from "next/navigation"

export default async function page({ params, searchParams }: { params: { quizid: string } }) {
    // const {quizid} = useParams()
    // console.log(quizid)
    const { quizid } = await params
    console.log(quizid)
    return (
        <>{quizid}</>
    )
}