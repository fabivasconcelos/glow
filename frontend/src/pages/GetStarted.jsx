import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
    const navigate = useNavigate();

    return (
        <div className="get-started-bg w-full h-screen flex flex-col items-center text-white px-8 gap-10 lg:justify-center lg:text-center">

            {/* Logo no topo */}
            <img src="/app/glow-logo-orange.png" alt="Glow Logo" className="w-[590px] lg:absolute lg:top-0 lg:left-0" />

            {/* Texto e Logo Glow */}
            <div className="flex flex-col items-start mt-[14rem] max-w-[80%] lg:items-center lg:mt-[20rem] lg:max-w-[50%]">
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
                onClick={() => navigate("/welcome")}
                className="bg-[#EB970C] text-white text-[16px] font-[700] font-inter py-4 px-12 rounded-3xl shadow-lg mt-[8rem] w-[100%] max-w-md lg:text-[20px] lg:px-14 lg:py-5 lg:mt-6"
            >
                Get Started
            </button>
        </div>
    );
};

export default GetStarted;