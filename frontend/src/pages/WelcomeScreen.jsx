// src/pages/WelcomeScreen.tsx
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#FFE5B4] flex flex-col items-start justify-center px-6 relative">
      {/* Logo no topo esquerdo */}
      <img src="/app/glow-logo-orange.png" alt="Glow Logo" className="w-[590px] absolute top-0 left-0" />

      {/* Card central */}
      <div
        className="mx-auto w-full max-w-lg rounded-[18px] shadow-2xl px-8 py-10 text-center z-10 backdrop-blur-[15px]"
        style={{
          background: "rgba(245, 245, 245, 0.70)",
        }}
      >
        <h1 className="text-[32px] font-[400] font-gloock text-[#202020] mb-6">Welcome to Glow</h1>

        <p className="text-[#453B2C] font-gloock text-[20px] leading-relaxed mb-4 lg:px-16 px-4">
          You're about to begin a brief<br/>3 to 4 minute assessment to match you with your perfect specialist.<br /><br />
          Your thoughtful responses and privacy are valued throughout this process.
        </p>

        <button
          onClick={() => navigate("/anamnesis/categories")}
          className="mt-6 w-80 py-5 rounded-[18px] shadow-md bg-[#FFA805] text-white font-bold text-[16px] hover:bg-[#F9A825] transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;