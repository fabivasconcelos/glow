import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="get-started-bg w-full h-screen flex flex-row">
      {/* Coluna esquerda com imagem de fundo */}
      <div className="w-1/2 hidden lg:block" />

      {/* Coluna direita dividida em 1/4 + 3/4 */}
      <div className="w-full lg:w-1/2 h-full flex flex-col">
        {/* 1/4 do topo vazio */}
        <div className="flex-[1]"></div>

        {/* 3/4 inferiores com conteúdo centralizado */}
        <div className="flex-[3] flex flex-col justify-center items-center p-6 lg:p-12 mb-16 ml-20">
          {/* Logo fora do container */}
          <img
            src="/app/glow-logo.png"
            alt="Glow Logo"
            className="mb-8 w-28 lg:w-52"
          />

          {/* Container transparente com blur */}
          <div
            className="w-full max-w-sm p-12 rounded-[18px] backdrop-blur-[15px]"
            style={{
              background: "rgba(235, 151, 12, 0.10)",
            }}
          >
            <p
              className="text-white text-center font-inter font-semibold"
              style={{
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              Where your journey to healing and self-discovery is honored and supported every step of the way.
            </p>

            <button
              onClick={() => navigate("/welcome")}
              className="mt-6 w-full py-5 rounded-[18px] shadow-md bg-[#FFA805] text-white font-bold text-[16px] hover:bg-[#F9A825] transition"
            >
              Get Started
            </button>
          </div>

          {/* Link fora do container */}
          <p
            className="text-white text-center font-inter mt-4"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 500,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              textDecorationSkipInk: "none",
              textDecorationThickness: "auto",
              textUnderlineOffset: "auto",
              textUnderlinePosition: "from-font",
            }}
          >
            Glow Therapist? Sign in Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;