/**
 * Propósito: Apresentar feedback visual enquanto a aplicação aguarda a resposta da API.
 * Isto evita que o utilizador pense que a aplicação bloqueou ou que o jogo não iniciou.
 *
 * Produz/Devolve: Um ecrã de loading simples mostrado antes de as perguntas estarem disponíveis.
 *
 * @returns {JSX.Element} Componente React que indica que o jogo está a carregar perguntas.
 */

function LoadingState() {
    return (
        <section className="quiz-card">
            <h2>A carregar perguntas...</h2>
            <p className="muted">Aguarda um momento.</p>
        </section>
    );
}

export default LoadingState;