function ErrorState({ message, onRetry }) {
    return (
        <section>
            <h2>Erro</h2>
            <p>{message}</p>

            <button onClick={onRetry}>
                Usar perguntas locais
            </button>
        </section>
    );
}

export default ErrorState;