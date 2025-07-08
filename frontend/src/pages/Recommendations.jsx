import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Recommendations = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const therapists = location.state?.therapists || [];

    const handleSelectTherapist = (therapistId) => {
        navigate(`/therapist/${therapistId}`);
    };

    return (
        <div className="relative min-h-screen w-full">
            {/* Imagem de fundo por trás */}
            <div
                className="absolute inset-0 z-0 recommendations-bg" // substitua pelo caminho real
            />

            {/* Camada com blur e conteúdo */}
            <div className="relative z-10 min-h-screen w-full backdrop-blur-[15px] bg-[#FFFFFFB2] flex flex-col items-center px-6 pt-6">

                {/* Logo no topo esquerdo */}
                <img src="/app/glow-logo-orange.png" alt="Glow Logo" className="w-[590px] absolute top-0 left-0" />

                {/* Título */}
                <h2 className="text-[#453B2C] font-inter text-[20px] font-[700] text-center my-16 w-full">
                    Ideal matches based on your preferences,<br />
                    Choose one to review and continue
                </h2>

                {/* Cards */}
                <div className="flex flex-row gap-6 justify-center items-center w-full">
                    {therapists.map((therapist, index) => {
                        const isPlus = therapist.plan === 'plus';
                        return (
                            <button
                                key={therapist.id}
                                onClick={() => handleSelectTherapist(therapist.id)}
                                className={`flex flex-col justify-between text-left rounded-[18px] shadow-xl px-6 py-8 w-full max-w-xs h-[540px] transition-all ${isPlus
                                    ? 'bg-[#FFA805CC] text-white'
                                    : 'bg-white text-[#453B2C]'
                                    }`}
                            >
                                <div className="relative mb-4">
                                    <img
                                        src={therapist.profile_picture}
                                        alt={therapist.name}
                                        className="w-[155px] h-[155px] rounded-full object-cover border-2 border-white shadow-md"
                                    />
                                    {isPlus && (
                                        <span className="absolute bottom-0 right-32 w-6 h-6 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                                <circle cx="16.8229" cy="17.2829" r="16.362" fill="#FFA805" />
                                                <path d="M16.8299 6.375L18.3452 8.68917L20.5606 7.03283L21.1931 9.72571L23.8414 8.92699L23.5147 11.6738L26.2765 11.829L25.03 14.2984L27.5721 15.3888L25.5563 17.283L27.5721 19.1771L25.03 20.2676L26.2765 22.737L23.5147 22.8922L23.8414 25.639L21.1931 24.8403L20.5606 27.5332L18.3452 25.8768L16.8299 28.191L15.3145 25.8768L13.0991 27.5332L12.4667 24.8403L9.81835 25.639L10.1451 22.8922L7.38327 22.737L8.62974 20.2676L6.08759 19.1771L8.10347 17.283L6.08759 15.3888L8.62974 14.2984L7.38327 11.829L10.1451 11.6738L9.81835 8.92699L12.4667 9.72571L13.0991 7.03283L15.3145 8.68917L16.8299 6.375Z" fill="white" />
                                                <rect width="7.47893" height="2.49298" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 16.2656 21.6074)" fill="#FFA805" />
                                                <rect width="4.98595" height="2.49298" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 18.0234 19.8447)" fill="#FFA805" />
                                            </svg>
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-[36px] font-[400] font-gloock mb-2" style={{ lineHeight: "35px" }}>{therapist.name}</h3>
                                <p className={`${isPlus ? 'text-[#453B2C] text-[18px]' : 'text-[#DB8F00] text-[16px]'} font-inter mb-4 font-[700]`}>
                                    {therapist.professional_title}
                                </p>

                                <p className="text-[18px] font-inter font-[500] mb-4 line-clamp-4">
                                    {therapist.bio}
                                </p>

                                <ul className="text-[16px] font-inter font-[600] text-[#453B2C] list-disc pl-4">
                                    {therapist.specializations.map((item, i) => (
                                        <li key={i}>{item.name}</li>
                                    ))}
                                </ul>
                            </button>
                        );
                    })}
                </div>
                <button
                    onClick={() => navigate("/anamnesis/categories")}
                    className="my-12 w-80 py-5 bg-white text-[#FFA805] border border-[#FFA805] py-4 rounded-xl shadow-md font-semibold"
                >
                    Restart the survey
                </button>
            </div>
        </div>
        // <div className="min-h-screen bg-[#3D2B1F] text-white px-6 py-10 font-sans flex flex-col items-center">
        //     {/* Header */}
        //     <div className="w-full max-w-lg">
        //         <img src="/app/glow-logo.png" alt="Glow" className="w-14 mb-3" />
        //         <p className="text-lg text-[#DB8F00] font-semibold">Here are your top recommendations.</p>
        //     </div>

        //     {/* Therapist Cards */}
        //     <div className="w-full max-w-lg space-y-4 mt-6">
        //         {therapists.map((therapist, index) => (
        //             <div key={therapist.id} onClick={() => handleSelectTherapist(therapist.id)} className={`relative flex items-center p-4 rounded-xl shadow-lg ${index === therapists.length - 1 ? 'bg-[#DB8F00] text-white' : 'bg-white text-black'} cursor-pointer`}>
        //                 {/* Therapist Info */}
        //                 <div className="flex-1">
        //                     <h2 className="font-gloock text-xl font-normal leading-tight">{therapist.name}</h2>
        //                     <p className={`${index === therapists.length - 1 ? 'text-[#FFFFFF]' : 'text-[#DB8F00]'} font-inter font-bold text-[10px]`}>{therapist.specialization}</p>
        //                     <p className="text-sm font-inter mt-2">{therapist.bio}</p>
        //                 </div>
        //                 {/* Therapist Image */}
        //                 <div className="w-20 h-20 ml-4 rounded-full overflow-hidden border-2 border-black">
        //                     <img src={therapist.profile_picture} alt={therapist.name} className="w-full h-full object-cover" />
        //                 </div>
        //             </div>
        //         ))}
        //     </div>

        //     {/* Back Button */}
        //     <button className="mt-6 px-24 py-2 border border-white rounded-full text-white text-lg" onClick={() => window.history.back()}>
        //         Back
        //     </button>
        // </div>
    );
};

export default Recommendations;