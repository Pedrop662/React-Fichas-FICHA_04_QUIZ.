const TRIVIA_API_URL = "https://opentdb.com/api.php";

/**
 * Converte texto vindo da API para texto legível.
 */
function decodeApiText(value) {
    return decodeURIComponent(value);
}

/**
 * Normaliza perguntas da API para o formato da app.
 */
function normalizeQuestion(apiQuestion, index) {
    return {
        id: `api-${index}`,
        question: decodeApiText(apiQuestion.question),
        correctAnswer: decodeApiText(apiQuestion.correct_answer),
        incorrectAnswers: apiQuestion.incorrect_answers.map(decodeApiText),
    };
}

/**
 * Vai buscar perguntas à Open Trivia DB.
 */
export async function fetchTriviaQuestions(difficulty, signal) {
    const params = new URLSearchParams({
        amount: "5",
        type: "multiple",
        difficulty,
        encode: "url3986",
    });

    const response = await fetch(`${TRIVIA_API_URL}?${params}`, { signal });

    if (!response.ok) {
        throw new Error("Erro na API");
    }

    const data = await response.json();

    if (data.response_code !== 0) {
        throw new Error("Sem perguntas disponíveis");
    }

    return data.results.map(normalizeQuestion);
}