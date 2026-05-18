const QUESTION_TIME_LIMIT = 15;

/**
 * Mostra o tempo restante.
 */
function TimerBar({ timeLeft }) {
    const percentage = (timeLeft / QUESTION_TIME_LIMIT) * 100;

    return (
        <div>
            <p>{timeLeft}s</p>
            <div style={{ width: "100%", background: "#ccc" }}>
                <div
                    style={{
                        width: `${percentage}%`,
                        height: "10px",
                        background: "green",
                    }}
                />
            </div>
        </div>
    );
}

export default TimerBar;