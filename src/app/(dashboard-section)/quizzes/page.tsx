import { getQuizzes } from "@/db/repository"

export default async function quizzesPage() {
    const quizzes = await getQuizzes()
    const cards = quizzes.map(quiz =>
        <div key={quiz.id} className="bg-base-100 shadow-sm w-100">
            <div className="card-body">
                <h2 className="card-title">{quiz.name}</h2>
                <p>Description: </p>
                <div className="justify-end card-actions">
                    <a href={'/quizzes/'+quiz.id}><button className="btn btn-primary">Take Quiz</button></a>
                </div>
            </div>
        </div>

    )

    const cards2 = quizzes.map(quiz =>
        <div key={quiz.id} className="bg-yellow-500">
            test
        </div>
    )

    return (
        <div className="hkljlj bg-red-500 flex flex-col h-screen">
            <div className="flex justify-center bg-orange-500"><div className="text-2xl">Quiz Section</div></div>
            <div className="bg-orange-500 flex flex-col items-center gap-5">
                {cards}
            </div>

        </div>)
}