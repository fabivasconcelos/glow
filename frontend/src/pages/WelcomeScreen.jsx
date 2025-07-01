// src/pages/WelcomeScreen.tsx
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FAE1B8] to-[#FCE5BB] flex flex-col items-start justify-center px-6 relative">
      {/* Logo no topo esquerdo */}
      <img src="/app/glow-logo-orange.png" alt="Glow Logo" className="w-[590px] absolute top-0 left-0" />

      {/* Card central */}
      <div className="mx-auto w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10 text-center z-10">
        <h1 className="text-[32px] font-[400] font-gloock text-[#202020] mb-6">Welcome to Glow</h1>

        <p className="text-[#453B2C] font-gloock text-[20px] leading-relaxed mb-4">
          You're about to begin a brief<br />
          <strong>3 to 4 minute assessment</strong> to<br />
          match you with your perfect<br />
          specialist.
        </p>

        <p className="text-[#453B2C] font-gloock text-[20px] leading-relaxed mb-8">
          Your thoughtful responses and<br />
          privacy are valued throughout<br />
          this process.
        </p>

        <button
          onClick={() => navigate("/anamnesis/categories")}
          className="w-full bg-[#EB970C] text-white py-3 rounded-xl font-[700] text-[16px] transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;