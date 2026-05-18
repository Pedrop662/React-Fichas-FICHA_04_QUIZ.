const QUESTION_TIME_LIMIT = 15;

/**
 * Propósito:
 * Mostrar o tempo restante da pergunta.
 */

function TimerBar({ timeLeft }) {
    const percentage = (timeLeft / QUESTION_TIME_LIMIT) * 100;

    return (
        <div className="timer">
            <p>Tempo restante: {timeLeft}s</p>

            <div className="timer-bar">
                <div
                    className="timer-bar__fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default TimerBar;