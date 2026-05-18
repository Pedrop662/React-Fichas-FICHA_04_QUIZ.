import { useEffect, useMemo, useState } from "react";
import "./index.css";

/**
 * Perguntas locais (fallback).
 * Usadas quando a API falha.
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

function App() {
    const [gameStatus, setGameStatus] = useState("idle"); // idle | playing | finished
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState("");
    const [difficulty, setDifficulty] = useState("easy");

    const currentQuestion = localQuestions[currentQuestionIndex];

    /**
     * Baralha respostas (useMemo evita mudanças a cada render)
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

        return () => clearTimeout(timeoutId);
    }, [gameStatus, timeLeft]);

    /**
     * Responder pergunta
     */
    const handleAnswer = (answer) => {
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

        if (nextIndex >= localQuestions.length) {
            setGameStatus("finished");
            return;
        }

        setCurrentQuestionIndex(nextIndex);
        setTimeLeft(QUESTION_TIME_LIMIT);
    };

    /**
     * Começar jogo
     */
    const startGame = () => {
        setGameStatus("playing");
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(QUESTION_TIME_LIMIT);
    };

    /**
     * Reset
     */
    const resetGame = () => {
        setGameStatus("idle");
        setScore(0);
        setCurrentQuestionIndex(0);
    };

    return (
        <div className="quiz-card">
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

            {gameStatus === "playing" && (
                <div>
                    <p>Tempo restante: {timeLeft}s</p>

                    <h2>{currentQuestion.question}</h2>

                    {currentAnswers.map((a) => (
                        <button key={a} onClick={() => handleAnswer(a)}>
                            {a}
                        </button>
                    ))}
                </div>
            )}

            {gameStatus === "finished" && (
                <div>
                    <h2>Fim do jogo</h2>
                    <p>Pontuação: {score}</p>

                    <button onClick={resetGame}>Recomeçar</button>
                </div>
            )}
        </div>
    );
}

export default App;