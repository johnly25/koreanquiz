import { getQuizzes } from "@/db/repository"

export default async function quizzesPage() {
    const quizzes = await getQuizzes()
    const cards = quizzes.map(quiz =>
        <div key={quiz.id} className="flex w-full max-w-150">
            <div className="bg-base-100 flex-1 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">{quiz.name}</h2>
                    <p>Description: </p>
                    <div className="justify-end card-actions">
                        <a href={'/quiz/' + quiz.id}><button className="btn btn-primary">Take Quiz</button></a>
                    </div>
                </div>
            </div>
        </div>

    )

    return (
        <div className="flex flex-col">
            <div className="flex justify-center">Quiz Section</div>
            <div className="flex flex-col">
                <div className="flex flex-col items-center gap-4 p-4">
                    {cards}
                </div>
            </div>
        </div>
    )
}