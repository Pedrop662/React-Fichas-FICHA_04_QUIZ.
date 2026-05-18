import TimerBar from "./TimerBar.jsx";

/**
 * Propósito:
 * Mostrar a pergunta atual do jogo com respostas e temporizador.
 *
 * Produz/Devolve:
 * Interface da pergunta + opções + botão de avanço quando o tempo acaba.
 */

function QuestionCard({
    question,
    answers,
    questionNumber,
    totalQuestions,
    timeLeft,
    onAnswer,
    onTimeout,
}) {
    return (
        <section className="quiz-card">
            <p>
                Pergunta {questionNumber} de {totalQuestions}
            </p>

            <TimerBar timeLeft={timeLeft} />

            <h2>{question.question}</h2>

            <div className="answer-grid">
                {answers.map((answer) => (
                    <button
                        key={answer}
                        type="button"
                        className="answer-button"
                        onClick={() => onAnswer(answer)}
                        disabled={timeLeft === 0}
                    >
                        {answer}
                    </button>
                ))}
            </div>

            {timeLeft === 0 && (
                <div className="button-row">
                    <p className="error-text">Tempo esgotado.</p>

                    <button
                        type="button"
                        className="button-secondary"
                        onClick={onTimeout}
                    >
                        Avançar
                    </button>
                </div>
            )}
        </section>
    );
}

export default QuestionCard;