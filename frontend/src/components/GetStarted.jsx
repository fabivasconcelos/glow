import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
    const navigate = useNavigate();

    return (
        <div className="get-started-bg w-full h-screen flex flex-col justify-between items-center text-white px-8 lg:justify-center lg:text-center">

            {/* Logo no topo */}
            <img src="/app/glow-logo.png" alt="Glow Logo" className="w-16 mt-6 lg:absolute lg:top-8 lg:left-8" />

            {/* Texto e Logo Glow */}
            <div className="flex flex-col items-start mt-24 max-w-[80%] lg:items-center lg:mt-0 lg:max-w-[50%]">
                <img src="/app/glow-logo.png" alt="Glow Logo" className="w-40 mb-4 lg:w-60" />
                <p className="text-[20px] font-[400] font-gloock leading-snug lg:text-[28px] lg:leading-[1.4]">
                    Welcome to Glow, where your <br />
                    journey to healing and self- <br />
                    discovery is honored and <br />
                    supported every step of the way.
                </p>
            </div>

            {/* Botão */}
            <button
                onClick={() => navigate("/anamnesis")}
                className="bg-[#EB970C] text-white text-[16px] font-[700] font-inter py-4 px-12 rounded-3xl shadow-lg mb-14 w-[100%] max-w-md lg:text-[20px] lg:px-14 lg:py-5 lg:mt-6"
            >
                Get Started
            </button>
        </div>
    );
};

export default GetStarted;