/**
 * Propósito:
 * Mostrar erro quando a API falha.
 */

function ErrorState({ message, onUseLocalQuestions, onReset }) {
    return (
        <section className="quiz-card">
            <h2>Erro ao carregar perguntas</h2>

            <p className="error-text">{message}</p>

            <p className="muted">
                Podes continuar com perguntas locais.
            </p>

            <div className="button-row">
                <button
                    className="button-primary"
                    onClick={onUseLocalQuestions}
                >
                    Usar perguntas locais
                </button>

                <button
                    className="button-secondary"
                    onClick={onReset}
                >
                    Voltar ao início
                </button>
            </div>
        </section>
    );
}

export default ErrorState;