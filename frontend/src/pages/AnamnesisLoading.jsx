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
        <div className="min-h-screen w-full bg-[#FFE5B4] flex flex-col items-start justify-center px-6 relative">
            {/* Logo no topo esquerdo */}
            <img src="/app/glow-logo-orange.png" alt="Glow Logo" className="w-[590px] absolute top-0 left-0" />

            <div
                className="mx-auto w-full max-w-lg rounded-[18px] shadow-2xl px-8 py-10 text-center z-10 backdrop-blur-[15px]"
                style={{
                    background: "rgba(248, 245, 245, 0.70)",
                }}
            >
                <h1 className="font-gloock text-[36px] text-[#453B2C] font-[400] mb-2">Great job</h1>
                <h2 className="text-[16px] font-inter font-[400] mb-6 text-[#453B2C]">Analyzing your preferences...</h2>
                <p className="text-[#453B2C] text-[20px] font-inter font-[500] leading-relaxed mb-8">
                    Our matching system is carefully evaluating your responses against our exclusive
                    network of elite specialists to find your perfect therapeutic match<br/><br/>This personalized
                    selection process ensures the highest quality recommendations tailored specifically
                    to your needs.
                </p>
                <div className="w-12 h-12 mx-auto border-4 border-[#FFA805] border-t-black rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default AnamnesisLoading;
