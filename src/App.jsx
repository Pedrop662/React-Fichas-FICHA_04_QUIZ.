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
];

const QUESTION_TIME_LIMIT = 15;

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
     * Baralha respostas
     */
    const currentAnswers = useMemo(() => {
        if (!currentQuestion) return [];

        return [
            currentQuestion.correctAnswer,
            ...currentQuestion.incorrectAnswers,
        ].sort(() => Math.random() - 0.5);
    }, [currentQuestion]);

    /**
     * Temporizador
     */
    useEffect(() => {
        if (gameStatus !== "playing") return;
        if (timeLeft === 0) return;

        const timeoutId = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [gameStatus, timeLeft]);

    /**
     * Responder pergunta
     */
    const handleAnswer = (answer) => {
        if (!currentQuestion) return;

        if (answer === currentQuestion.correctAnswer) {
            setScore((s) => s + 1);
        }

        goToNextQuestion();
    };

    /**
     * Avançar pergunta
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
     * Timeout
     */
    const handleTimeout = () => {
        goToNextQuestion();
    };

    /**
     * Começar jogo (simulação API futura)
     */
    const startGame = async () => {
        setLoading(true);
        setError("");
        setGameStatus("playing");

        try {
            // aqui futuramente entra API
            setQuestions(localQuestions);
        } catch (err) {
            setError("Erro ao carregar perguntas");
            setQuestions(localQuestions);
        } finally {
            setLoading(false);
        }

        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(QUESTION_TIME_LIMIT);
    };

    /**
     * Reset jogo
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

            {/* IDLE */}
            {gameStatus === "idle" && (
                <div>
                    <h1>Quiz App</h1>

                    <input
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Nome"
                    />

                    <button
                        onClick={startGame}
                        disabled={playerName.length < 2}
                    >
                        Começar
                    </button>
                </div>
            )}

            {/* LOADING */}
            {loading && (
                <p>A carregar perguntas...</p>
            )}

            {/* ERROR */}
            {error && (
                <p style={{ color: "red" }}>{error}</p>
            )}

            {/* PLAYING */}
            {gameStatus === "playing" && currentQuestion && !loading && (
                <div>
                    <p>Tempo restante: {timeLeft}s</p>

                    <h2>{currentQuestion.question}</h2>

                    {currentAnswers.map((a) => (
                        <button
                            key={a}
                            onClick={() => handleAnswer(a)}
                            disabled={timeLeft === 0}
                        >
                            {a}
                        </button>
                    ))}

                    {timeLeft === 0 && (
                        <button onClick={handleTimeout}>
                            Avançar
                        </button>
                    )}
                </div>
            )}

            {/* FINISHED */}
            {gameStatus === "finished" && (
                <div>
                    <h2>Fim do jogo</h2>

                    <p>Jogador: {playerName}</p>
                    <p>Pontuação: {score}</p>

                    <button onClick={resetGame}>
                        Recomeçar
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;