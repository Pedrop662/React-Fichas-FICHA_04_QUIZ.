/**
 * Ecrã final com resultado.
 */
function ResultScreen({ playerName, stats, onReset }) {
    return (
        <section>
            <h2>Resultado</h2>

            <p>{playerName}</p>
            <p>Pontuação: {stats.score}</p>
            <p>Certas: {stats.correctAnswers}</p>

            <button onClick={onReset}>
                Jogar outra vez
            </button>
        </section>
    );
}

export default ResultScreen;