import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AnamnesisForm = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/anamnesis")
            .then(response => setQuestions(response.data))
            .catch(error => console.error("Erro ao buscar perguntas:", error));
    }, []);

    const saveAnswer = async (questionId, answer) => {
        try {
            // Descobre o tipo da pergunta para decidir o formato correto da resposta
            const question = questions.find(q => q.id === questionId);
            let formattedOptionIds = null;

            if (question.type === "multiple_choice") {
                formattedOptionIds = Array.isArray(answer) ? answer : [];
            } else if (question.type === "single_choice") {
                formattedOptionIds = answer
            }

            const response = await fetch("http://localhost:8000/api/anamnesis/answers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: 1, // Substituir pelo ID real do usuário
                    question_id: questionId,
                    option_ids: formattedOptionIds,
                    text_answer: typeof answer === "string" ? answer : null,
                }),
            });

            if (!response.ok) {
                console.error("Erro ao salvar resposta.");
            }
        } catch (error) {
            console.error("Erro ao enviar resposta:", error);
        }
    };

    const handleChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleNext = async () => {
        const questionId = questions[currentQuestion].id;
        const answer = answers[questionId];

        if (answer) {
            await saveAnswer(questionId, answer);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            console.log("Entrou");
            // Última pergunta: chamar API de recomendação
            fetch("http://localhost:8000/api/recommendations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: 1 }) // Substituir pelo ID real
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Recomendações recebidas:", data);
                    navigate("/recommendations", { state: { therapists: data } });
                })
                .catch(error => console.error("Erro ao obter recomendações:", error));
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Respostas enviadas:", answers);
        // Aqui você pode enviar as respostas para o backend via API
    };

    if (questions.length === 0) {
        return <p className="text-center text-lg">Loading...</p>;
    }

    const question = questions[currentQuestion];

    return (
        <div className="flex flex-col items-center min-h-screen bg-background text-textPrimary px-6 py-10 font-sans">
            <div className="w-full max-w-lg">
                {/* Header - Removendo a barra branca */}
                <img src="/glow-logo.png" alt="Glow Logo" className="w-14 mb-3" />

                <p className="text-md text-textSecondary mb-12">Let's deep dive:</p>

                {/* Pergunta */}
                <h1 className="text-3xl font-extrabold mb-10 leading-tight font-gloock">
                    {question.question}
                </h1>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-20">
                        {question.type === "single_choice" && (
                            <div className="space-y-6">
                                {question.options.map(option => (
                                    <label key={option.id} className="flex items-center space-x-4 cursor-pointer text-xl">
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option.id}
                                            checked={answers[question.id] === option.id}
                                            onChange={() => handleChange(question.id, option.id)}
                                            className="hidden"
                                        />
                                        <div
                                            className={`w-6 h-6 border-4 rounded-full flex items-center justify-center 
                                            ${answers[question.id] === option.id ? 'border-highlight bg-black' : 'border-gray-400'}`}
                                        >
                                            {answers[question.id] === option.id && (
                                                <span className="w-3 h-3 bg-black rounded-full"></span>
                                            )}
                                        </div>
                                        <span className="text-xl">{option.option}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {question.type === "multiple_choice" && (
                            <div className="space-y-6">
                                {question.options.map(option => (
                                    <label key={option.id} className="flex items-center space-x-4 cursor-pointer text-xl">
                                        <input
                                            type="checkbox"
                                            value={option.id}
                                            checked={(answers[question.id] || []).includes(option.id)}
                                            onChange={(e) => {
                                                const selected = answers[question.id] || [];
                                                setAnswers({
                                                    ...answers,
                                                    [question.id]: e.target.checked
                                                        ? [...selected, option.id]
                                                        : selected.filter(val => val !== option.id)
                                                });
                                            }}
                                            className="hidden"
                                        />
                                        <div
                                            className={`w-6 h-6 border-2 rounded-md flex items-center justify-center 
                                            ${answers[question.id]?.includes(option.id) ? 'border-black bg-black' : 'border-gray-400'}`}
                                        >
                                            {answers[question.id]?.includes(option.id) && (
                                                <span className="w-3 h-3 bg-background rounded-md"></span>
                                            )}
                                        </div>
                                        <span className="text-xl">{option.option}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {question.type === "text" && (
                            <div className="relative mt-6 w-full">
                                <textarea
                                    className="absolute left-0 right-0 w-full px-6 py-4 border border-gray-300 rounded-tr-3xl bg-white shadow-md text-lg 
                       focus:outline-none focus:ring-2 focus:ring-gray-500 h-[55vh] block resize-none 
                       placeholder:text-black placeholder:italic placeholder:font-medium font-inter"
                                    placeholder="Answer here."
                                    onChange={(e) => handleChange(question.id, e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Navegação */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-between items-center px-6 text-lg">
                        <button
                            type="button"
                            onClick={handlePrev}
                            disabled={currentQuestion === 0}
                            className="text-gray-500 disabled:opacity-50"
                        >
                            &lt; Previous
                        </button>
                        <span className="text-black opacity-40 font-medium">
                            {String(currentQuestion + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
                        </span>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="text-black"
                        >
                            Next &gt;
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AnamnesisForm;