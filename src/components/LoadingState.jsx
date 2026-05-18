/**
 * Propósito:
 * Mostrar ecrã enquanto as perguntas estão a carregar.
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