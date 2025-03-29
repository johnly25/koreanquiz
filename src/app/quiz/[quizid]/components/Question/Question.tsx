export function Question({ question, nextQuestion }) {
    const handleClick = () => {
        
    }
    
    return (
        <>
            <div>{question.question}</div>
            <button className="btn btn-primary" onClick={nextQuestion}>Next</button>
        </>
    )
}