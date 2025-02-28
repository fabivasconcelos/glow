import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AnamnesisForm = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/questions`)
            .then(response => setQuestions(response.data))
            .catch(error => console.error("Erro ao buscar perguntas:", error));
    }, []);

    const saveAnswer = async (questionId, answer) => {
        try {
            const question = questions.find(q => q.id === questionId);
            let formattedOptionIds = null;

            if (question.type === "multiple_choice") {
                formattedOptionIds = Array.isArray(answer) ? answer : [];
            } else if (question.type === "single_choice") {
                formattedOptionIds = Array.isArray(answer) ? answer : [answer];
            }

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/answers`, {
                user_id: 1,
                question_id: questionId,
                option_ids: formattedOptionIds,
                text_answer: typeof answer === "string" ? answer : null,
            }, {
                headers: { "Content-Type": "application/json" }
            });
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
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/recommendations`, {
                user_id: 1,
            }, {
                headers: { "Content-Type": "application/json" }
            })
                .then(response => {
                    navigate("/recommendations", { state: { therapists: response.data } });
                })
                .catch(error => console.error("Erro ao obter recomendações:", error));
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    if (questions.length === 0) {
        return <p className="text-center text-lg">Loading...</p>;
    }

    const question = questions[currentQuestion];

    return (
        <div className="w-full min-h-screen overflow-x-hidden bg-[#DEDCC4] md:px-16 py-10 font-sans">
            {/* Header - Ajuste para mobile e desktop */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-[24rem] mb-6 px-6">
                <img src="/app/glow-logo.png" alt="Glow Logo" className="w-14 md:w-20" />
                <p className="text-md text-textSecondary md:text-lg md:mr-auto">Let's deep dive:</p>
            </div>

            <div className="max-w-2xl mx-auto w-full px-6">
                <h1 className="text-3xl font-extrabold mb-10 leading-tight font-gloock text-left">
                    {question.question}
                </h1>

                <form className="w-full min-h-[80vh] md:min-h-[65vh] flex flex-col justify-between overflow-y-auto">
                    <div className="mb-20 text-left">
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
                                        <div className={`w-6 h-6 border-4 rounded-full flex items-center justify-center 
                                            ${answers[question.id] === option.id ? 'border-[#FFA805] bg-black' : 'border-gray-400'}`}
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
                                        <div className={`w-6 h-6 border-2 rounded-md flex items-center justify-center 
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
                </form>
            </div>

            <div className="flex flex-row items-center justify-center w-full md:max-w-[50%] mx-auto text-lg mt-auto pb-8 gap-6 md:gap-12">
                <button type="button" onClick={handlePrev} disabled={currentQuestion === 0} className="text-gray-500 disabled:opacity-50">
                    &lt; Previous
                </button>
                <span className="text-black opacity-40 font-medium">
                    {String(currentQuestion + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
                </span>
                <button type="button" onClick={handleNext} className="text-black">
                    Next &gt;
                </button>
            </div>
        </div>
    );
};

export default AnamnesisForm;