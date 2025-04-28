import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const AnamnesisForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("category");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [allCount, setAllCount] = useState(0);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/questions?anamnesis_category_id=${categoryId}`)
            .then(response => {
                setQuestions(response.data);
                setAllCount(response.data.length);
            })
            .catch(error => console.error("Erro ao buscar perguntas:", error));
    }, [categoryId]);

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
            navigate("/anamnesis/loading");
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    if (questions.length === 0) return <p className="text-center text-lg">Loading...</p>;

    const question = questions[currentQuestion];
    const section = question.section;
    const backgroundImage = section?.image ? `url(${section.image})` : "";

    return (
        <div className="w-full min-h-screen overflow-x-hidden bg-cover bg-center" style={{ backgroundImage }}>
            <div className="relative px-6 pt-6 pb-8">
                {/* Logo absoluta no canto esquerdo */}
                <img
                    src="/app/glow-logo-orange.png"
                    alt="Glow Logo"
                    className="w-[590px] absolute top-0 left-0 z-10"
                />

                {/* Container centralizado do topo */}
                <div className="flex items-start justify-center relative">
                    <p className="text-sm text-[#202131] mt-2">{section.name}</p>
                </div>

                {/* Container da barra de progresso no canto direito */}
                <div className="absolute top-6 right-24 text-right z-10">
                    <div className="h-1 mb-1 bg-white rounded-full w-32">
                        <div
                            className="h-1 bg-[#FFA805] rounded-full"
                            style={{ width: `${((currentQuestion + 1) / allCount) * 100}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-[#202131]">
                        {String(currentQuestion + 1).padStart(2, "0")} of {String(allCount).padStart(2, "0")}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto w-full px-4 mt-[100px]">
                    <h1 className="text-[32px] font-[400] mb-10 leading-tight font-gloock flex items-center gap-2 flex-wrap">
                        {question.question}
                        {question.type === "multiple_choice" && (
                            <span className="text-[18px] font-inter font-semibold text-[#453B2C]">(Select all that apply)</span>
                        )}
                    </h1>

                    <form className="mb-20">
                        {question.type === "single_choice" && (
                            <div
                                className={`gap-y-3 ${question.options.length > 10 ? "grid grid-cols-2 gap-x-12" : "flex flex-col"
                                    }`}
                            >
                                {question.options.map(option => (
                                    <label key={option.id} className="flex items-center space-x-4 cursor-pointer text-[#453B2C] font-inter text-[20px]">
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option.id}
                                            checked={answers[question.id] === option.id}
                                            onChange={() => handleChange(question.id, option.id)}
                                            className="hidden"
                                        />
                                        <div className={`w-6 h-6 border-4 rounded-full flex items-center justify-center 
                                            ${answers[question.id] === option.id ? 'border-[#FFA805] bg-black' : 'border-gray-400'}`}>
                                            {answers[question.id] === option.id && <span className="w-3 h-3 bg-black rounded-full"></span>}
                                        </div>
                                        <span>{option.option}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {question.type === "multiple_choice" && (
                            <div
                                className={`gap-y-3 ${question.options.length > 10 ? "grid grid-cols-2 gap-x-12" : "flex flex-col"
                                    }`}
                            >
                                {question.options.map(option => (
                                    <label
                                        key={option.id}
                                        className="flex items-center space-x-4 cursor-pointer text-[#453B2C] font-inter text-[20px]"
                                    >
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
                                                        : selected.filter((val) => val !== option.id),
                                                });
                                            }}
                                            className="hidden"
                                        />
                                        <div
                                            className={`w-6 h-6 border-4 rounded-full flex items-center justify-center 
              ${answers[question.id]?.includes(option.id) ? "border-[#FFA805] bg-black" : "border-gray-400"}`}
                                        >
                                            {answers[question.id]?.includes(option.id) && (
                                                <span className="w-3 h-3 bg-black rounded-full"></span>
                                            )}
                                        </div>
                                        <span>{option.option}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {question.type === "text" && (
                            <div className="relative mt-6 w-full">
                                <textarea
                                    className="w-full px-6 py-4 border border-gray-300 rounded-tr-3xl bg-white shadow-md text-lg 
                       focus:outline-none focus:ring-2 focus:ring-gray-500 h-[50vh] block resize-none 
                       placeholder:text-black placeholder:italic placeholder:font-medium font-inter"
                                    placeholder="Answer here."
                                    onChange={(e) => handleChange(question.id, e.target.value)}
                                />
                            </div>
                        )}
                    </form>

                    <div className="flex flex-row items-center justify-center w-full md:max-w-[50%] mx-auto text-lg mt-auto pb-8 gap-[3.5rem] md:gap-12">
                        {currentQuestion > 0 && (
                            <button type="button" onClick={handlePrev} className="text-black bg-white shadow px-6 py-3 w-[170px] h-[60px] rounded-[18px]">
                                &lt; Previous
                            </button>
                        )}
                        <button type="button" onClick={handleNext} className="text-white bg-[#453B2C] shadow px-6 py-3 w-[170px] h-[60px] rounded-[18px]">
                            Next &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnamnesisForm;