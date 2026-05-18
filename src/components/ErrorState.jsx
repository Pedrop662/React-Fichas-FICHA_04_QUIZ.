/**
 * Propósito: Apresentar um ecrã de erro quando a API falha ao carregar perguntas.
 * Permite ao utilizador recuperar da falha sem bloquear a aplicação.
 *
 * Produz/Devolve: Um ecrã com mensagem de erro e opções de recuperação (usar perguntas locais ou reiniciar).
 *
 * @param {object} props - Dados e callbacks fornecidos pelo componente pai (App).
 * @param {string} props.message - Mensagem de erro vinda do App, normalmente gerada pelo serviço da API.
 * @param {() => void} props.onUseLocalQuestions - Callback para iniciar o jogo com perguntas locais.
 * @param {() => void} props.onReset - Callback para voltar ao estado inicial da aplicação.
 *
 * @returns {JSX.Element} Ecrã de erro com opções de recuperação do jogo.
 */

function ErrorState({ message, onUseLocalQuestions, onReset }) {
    return (
        <section className="quiz-card">
            <h2>Erro ao carregar perguntas</h2>

            <p className="error-text">{message}</p>

            <p className="muted">Podes continuar com perguntas locais.</p>

            <div className="button-row">
                <button
                    className="button-primary"
                    onClick={onUseLocalQuestions}
                >
                    Usar perguntas locais
                </button>

                <button className="button-secondary" onClick={onReset}>
                    Voltar ao início
                </button>
            </div>
        </section>
    );
}

export default ErrorState;