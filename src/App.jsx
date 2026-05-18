import { useEffect, useMemo, useState } from "react";
import "./index.css";

/**
 * Perguntas locais (fallback caso API falhe)
 */
const localQuestions = [
    {
        id: "1",
        question: "Qual é a capital de Portugal?",
        correctAnswer: "Lisboa",
        incorrectAnswers: ["Porto", "Madrid", "Braga"],
    },
    {
        id: "2",
        question: "2 + 2 = ?",
        correctAnswer: "4",
        incorrectAnswers: ["3", "5", "22"],
    },
    {
        id: "3",
        question: "Qual linguagem usamos no React?",
        correctAnswer: "JavaScript",
        incorrectAnswers: ["Python", "C", "Java"],
    },
];

const QUESTION_TIME_LIMIT = 15;
const POINTS_PER_QUESTION = 100;

/**
 * App principal do Quiz
 * Controla todo o estado do jogo
 */
function App() {
    const [gameStatus, setGameStatus] = useState("idle");
    const [questions, setQuestions] = useState(localQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const currentQuestion = questions[currentQuestionIndex];

    /**
     * Calcula percentagem final
     */
    const finalPercentage = useMemo(() => {
        return questions.length === 0
            ? 0
            : (score / (questions.length * POINTS_PER_QUESTION)) * 100;
    }, [score, questions.length]);

    /**
     * Baralha respostas
     * useMemo evita mudanças constantes
     */
    const currentAnswers = useMemo(() => {
        if (!currentQuestion) return [];

        return [
            currentQuestion.correctAnswer,
            ...currentQuestion.incorrectAnswers,
        ].sort(() => Math.random() - 0.5);
    }, [currentQuestion]);

    /**
     * Temporizador do jogo
     */
    useEffect(() => {
        if (gameStatus !== "playing") return;
        if (timeLeft === 0) return;

        const timeoutId = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [gameStatus, timeLeft]);

    /**
     * Responder pergunta
     */
    const handleAnswer = (answer) => {
        if (!currentQuestion) return;

        if (answer === currentQuestion.correctAnswer) {
            setScore((prev) => prev + POINTS_PER_QUESTION);
        }

        goToNextQuestion();
    };

    /**
     * Avança para próxima pergunta
     */
    const goToNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex >= questions.length) {
            setGameStatus("finished");
            return;
        }

        setCurrentQuestionIndex(nextIndex);
        setTimeLeft(QUESTION_TIME_LIMIT);
    };

    /**
     * Timeout da pergunta
     */
    const handleTimeout = () => {
        goToNextQuestion();
    };

    /**
     * Começar jogo
     */
    const startGame = async () => {
        setLoading(true);
        setError("");

        try {
            // Futuramente aqui entra API
            setQuestions(localQuestions);

            setCurrentQuestionIndex(0);
            setScore(0);
            setTimeLeft(QUESTION_TIME_LIMIT);

            setGameStatus("playing");
        } catch (err) {
            setError("Erro ao carregar perguntas");
            setQuestions(localQuestions);

            setGameStatus("playing");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Reset do jogo
     */
    const resetGame = () => {
        setGameStatus("idle");
        setScore(0);
        setCurrentQuestionIndex(0);
        setPlayerName("");
        setTimeLeft(QUESTION_TIME_LIMIT);
        setError("");
    };

    return (
        <div className="quiz-card">

            {/* Ecrã inicial */}
            {gameStatus === "idle" && (
                <div>
                    <h1>Quiz App</h1>

                    <input
                        type="text"
                        placeholder="Nome"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />

                    <button
                        onClick={startGame}
                        disabled={playerName.length < 2}
                    >
                        Começar
                    </button>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <p>A carregar perguntas...</p>
            )}

            {/* Erro */}
            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {/* Jogo */}
            {gameStatus === "playing" && currentQuestion && !loading && (
                <div>
                    <p>Tempo restante: {timeLeft}s</p>

                    <h2>{currentQuestion.question}</h2>

                    {currentAnswers.map((answer) => (
                        <button
                            key={answer}
                            onClick={() => handleAnswer(answer)}
                            disabled={timeLeft === 0}
                        >
                            {answer}
                        </button>
                    ))}

                    {timeLeft === 0 && (
                        <button onClick={handleTimeout}>
                            Avançar
                        </button>
                    )}
                </div>
            )}

            {/* Resultado final */}
            {gameStatus === "finished" && (
                <div>
                    <h2>Fim do jogo</h2>

                    <p>Jogador: {playerName}</p>

                    <p>
                        Pontuação: {score}
                    </p>

                    <p>
                        Percentagem: {finalPercentage.toFixed(0)}%
                    </p>

                    <button onClick={resetGame}>
                        Recomeçar
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;