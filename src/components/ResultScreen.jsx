/**
 * Propósito:
 * Mostrar o resultado final do jogo.
 *
 * Produz/Devolve:
 * Pontuação final, percentagem e opção de reiniciar.
 */

function ResultScreen({ playerName, stats, onReset }) {
    return (
        <section className="quiz-card">
            <h2>
                {stats.victory
                    ? "🎉 Parabéns!"
                    : "😅 Tenta novamente"}
            </h2>

            <p>Jogador: {playerName}</p>
            <p>Pontuação: {stats.score}</p>
            <p>
                Certas: {stats.correctAnswers} de {stats.totalQuestions}
            </p>
            <p>Percentagem: {stats.percentage}%</p>

            <button
                type="button"
                className="button-primary"
                onClick={onReset}
            >
                Jogar outra vez
            </button>
        </section>
    );
}

export default ResultScreen;