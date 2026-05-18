import TimerBar from "./TimerBar";

/**
 * Mostra a pergunta e as respostas.
 */
function QuestionCard({
    question,
    answers,
    timeLeft,
    onAnswer,
    onTimeout,
}) {
    return (
        <section>
            <TimerBar timeLeft={timeLeft} />

            <h2>{question.question}</h2>

            {answers.map((a) => (
                <button
                    key={a}
                    onClick={() => onAnswer(a)}
                    disabled={timeLeft === 0}
                >
                    {a}
                </button>
            ))}

            {timeLeft === 0 && (
                <button onClick={onTimeout}>
                    Avançar (tempo esgotado)
                </button>
            )}
        </section>
    );
}

export default QuestionCard;