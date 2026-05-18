const TRIVIA_API_URL = "https://opentdb.com/api.php";

/**
 * Decodifica texto vindo da API.
 */
function decodeText(text) {
    return decodeURIComponent(text);
}

/**
 * Normaliza pergunta da API para formato da app.
 */
function normalizeQuestion(apiQuestion, index) {
    return {
        id: `q-${index}`,
        question: decodeText(apiQuestion.question),
        correctAnswer: decodeText(apiQuestion.correct_answer),
        incorrectAnswers: apiQuestion.incorrect_answers.map(decodeText),
    };
}

/**
 * Vai buscar perguntas à API.
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