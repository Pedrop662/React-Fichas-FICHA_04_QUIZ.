const TRIVIA_API_URL = "https://opentdb.com/api.php";

/**
 * Propósito: Converter texto codificado pela API (URL encoding) em texto legível para o utilizador.
 * Isto é necessário porque a Open Trivia DB devolve strings com caracteres especiais codificados.
 *
 * Produz/Devolve: Uma string já decodificada e pronta para ser usada na interface.
 *
 * @param {string} value - Texto vindo da API no formato URL encoded.
 * @returns {string} Texto legível para a UI.
 */
function decodeApiText(value) {
    return decodeURIComponent(value);
}

/**
 * Propósito: Transformar uma pergunta da Open Trivia DB para o formato interno da aplicação.
 * Isto evita que a UI dependa diretamente do formato da API.
 *
 * Produz/Devolve: Um objeto de pergunta normalizado compatível com a lógica do jogo.
 *
 * @param {object} apiQuestion - Pergunta original vinda da API.
 * @param {number} index - Índice usado para gerar um id único.
 *
 * @returns {object} Pergunta normalizada com question, correctAnswer e incorrectAnswers.
 */
function normalizeQuestion(apiQuestion, index) {
    return {
        id: `q-${index}`,
        question: decodeApiText(apiQuestion.question),
        correctAnswer: decodeApiText(apiQuestion.correct_answer),
        incorrectAnswers: apiQuestion.incorrect_answers.map(decodeApiText),
    };
}

/**
 * Propósito: Obter perguntas da Open Trivia DB e convertê-las para o formato interno da aplicação.
 * Garante validação da resposta e separação entre API e lógica da UI.
 *
 * Produz/Devolve: Uma Promise que resolve para uma lista de perguntas normalizadas.
 *
 * @param {string} difficulty - Dificuldade escolhida (easy, medium, hard).
 * @param {AbortSignal} signal - Permite cancelar o pedido HTTP se o jogo for reiniciado.
 *
 * @returns {Promise<object[]>} Lista de perguntas prontas a usar no jogo.
 */
export async function fetchTriviaQuestions(difficulty, signal) {
    const params = new URLSearchParams({
        amount: "5",
        type: "multiple",
        difficulty,
        encode: "url3986",
    });

    const response = await fetch(`${TRIVIA_API_URL}?${params}`, {
        signal,
    });

    if (!response.ok) {
        throw new Error("Erro na API.");
    }

    const data = await response.json();

    if (data.response_code !== 0) {
        throw new Error("API sem perguntas.");
    }

    return data.results.map(normalizeQuestion);
}