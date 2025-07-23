import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="get-started-bg w-full h-screen flex flex-col lg:flex-row bg-cover bg-center relative">
      {/* Coluna esquerda com imagem de fundo (só desktop) */}
      <div className="w-1/2 hidden lg:block" />

      {/* Coluna direita (ou toda a tela no mobile) */}
      <div className="w-full lg:w-1/2 h-full flex flex-col">
        {/* Mobile: conteúdo centralizado na tela inteira */}
        <div className="flex flex-1 justify-center items-end px-6 pb-8 lg:hidden">
          <div className="flex flex-col items-center w-full">
            {/* Logo */}
            <img
              src="/app/glow-logo.png"
              alt="Glow Logo"
              className="mb-6 w-32"
            />

            {/* Card com fundo semi-transparente e blur */}
            <div
              className="w-full p-6 rounded-[18px] mb-4 relative"
            >
              {/* Camada de blur 1 */}
              <div className="absolute inset-0 rounded-[18px] z-0" style={{ filter: "blur(2.5px)", background: "rgba(235, 151, 12, 0.10)" }} />
              {/* Camada de blur 2 */}
              <div className="absolute inset-0 rounded-[18px] backdrop-blur-[15px] z-0" style={{ background: "rgba(255, 255, 255, 0.30)" }} />

              <p className="z-10 relative text-white text-center font-inter font-semibold text-sm leading-snug">
                Where your journey to healing and self-discovery is honored and supported every step of the way.
              </p>

              <button
                onClick={() => navigate("/welcome")}
                className="z-10 relative mt-6 w-full py-4 rounded-[18px] shadow-md bg-[#FFA805] text-white font-bold text-[16px] hover:bg-[#F9A825] transition"
              >
                Get Started
              </button>
            </div>

            {/* Link para terapeuta */}
            <p className="text-white text-center font-inter underline text-sm font-medium">
              Glow Therapist? Sign in Here
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 mb-16 ml-20">
          <img
            src="/app/glow-logo.png"
            alt="Glow Logo"
            className="mb-8 w-52"
          />

          <div
            className="w-full max-w-sm p-12 rounded-[18px] backdrop-blur-[15px]"
            style={{
              background: "rgba(235, 151, 12, 0.10)",
            }}
          >
            <p className="text-white text-center font-inter font-semibold text-base leading-5">
              Where your journey to healing and self-discovery is honored and supported every step of the way.
            </p>

            <button
              onClick={() => navigate("/welcome")}
              className="mt-6 w-full py-5 rounded-[18px] shadow-md bg-[#FFA805] text-white font-bold text-[16px] hover:bg-[#F9A825] transition"
            >
              Get Started
            </button>
          </div>

          <a href="/therapist/new" className="text-white text-center font-inter mt-4 text-sm underline font-medium">
            Glow Therapist? Sign in Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;