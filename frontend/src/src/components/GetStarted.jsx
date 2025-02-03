import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen flex flex-col justify-between items-start text-white px-8"
             style={{ backgroundImage: "url('/get-started.png')", backgroundSize: "cover", backgroundPosition: "center" }}>

            {/* Logo no topo */}
            <img src="/glow-logo.png" alt="Glow Logo" className="w-14 mt-6" />

            {/* Texto e Logo Glow */}
            <div className="flex flex-col items-start mt-20 max-w-[80%]">
                <img src="/glow-logo.png" alt="Glow Logo" className="w-40 mb-4" />
                <p className="text-[20px] font-[400] font-gloock leading-snug">
                    Welcome to Glow, where your journey to healing and self-discovery 
                    is honored and supported every step of the way.
                </p>
            </div>

            {/* Botão */}
            <button 
                onClick={() => navigate("/anamnesis")}
                className="bg-[#EB970C] text-white text-[16px] font-[700] font-inter py-4 px-12 rounded-3xl shadow-lg mb-14 w-[100%] max-w-md"
            >
                Get Started
            </button>
        </div>
    );
};

export default GetStarted;