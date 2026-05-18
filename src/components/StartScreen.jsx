/**
 * Ecrã inicial do jogo.
 * Permite inserir nome e escolher dificuldade.
 */
function StartScreen({
    playerName,
    onPlayerNameChange,
    difficulty,
    onDifficultyChange,
    canStartGame,
    onStartGame,
}) {
    return (
        <section>
            <h2>Iniciar jogo</h2>

            <input
                value={playerName}
                onChange={(e) => onPlayerNameChange(e.target.value)}
                placeholder="Nome"
            />

            <select
                value={difficulty}
                onChange={(e) => onDifficultyChange(e.target.value)}
            >
                <option value="easy">Fácil</option>
                <option value="medium">Média</option>
                <option value="hard">Difícil</option>
            </select>

            <button onClick={onStartGame} disabled={!canStartGame}>
                Começar
            </button>
        </section>
    );
}

export default StartScreen;