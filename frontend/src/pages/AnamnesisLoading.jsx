// src/pages/AnamnesisLoading.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AnamnesisLoading = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/recommendations`,
                    { user_id: 1 }
                );
                navigate("/recommendations", { state: { therapists: response.data } });
            } catch (error) {
                console.error("Erro ao obter recomendações:", error);
            }
        };

        setTimeout(fetchRecommendations, 10000); // delay visual
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#f6eddc] flex items-center justify-center px-4">
            <div className="bg-[#f5f2ef] rounded-3xl shadow-2xl p-10 text-center max-w-md w-full">
                <h1 className="font-gloock text-2xl mb-2">Great job</h1>
                <h2 className="text-lg font-semibold mb-6 text-[#453B2C]">Analyzing your preferences...</h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-8">
                    Our matching system is carefully evaluating your responses against our exclusive
                    network of elite specialists to find your perfect therapeutic match. This personalized
                    selection process ensures the highest quality recommendations tailored specifically
                    to your needs.
                </p>
                <div className="w-12 h-12 mx-auto border-4 border-[#FFA805] border-t-black rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default AnamnesisLoading;
