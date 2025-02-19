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
        <div className="min-h-screen bg-[#3D2B1F] text-white px-6 py-10 font-sans flex flex-col items-center">
            {/* Header */}
            <div className="w-full max-w-lg">
                <img src="/glow-logo.png" alt="Glow" className="w-14 mb-3" />
                <p className="text-lg text-[#DB8F00] font-semibold">Here are your top recommendations.</p>
            </div>

            {/* Therapist Cards */}
            <div className="w-full max-w-lg space-y-4 mt-6">
                {therapists.map((therapist, index) => (
                    <div key={therapist.id} onClick={() => handleSelectTherapist(therapist.id)} className={`relative flex items-center p-4 rounded-xl shadow-lg ${index === therapists.length - 1 ? 'bg-[#DB8F00] text-white' : 'bg-white text-black'} cursor-pointer`}>
                        {/* Therapist Info */}
                        <div className="flex-1">
                            <h2 className="font-gloock text-xl font-normal leading-tight">{therapist.name}</h2>
                            <p className={`${index === therapists.length - 1 ? 'text-[#FFFFFF]' : 'text-[#DB8F00]'} font-inter font-bold text-[10px]`}>{therapist.specialization}</p>
                            <p className="text-sm font-inter mt-2">{therapist.bio}</p>
                        </div>
                        {/* Therapist Image */}
                        <div className="w-20 h-20 ml-4 rounded-full overflow-hidden border-2 border-black">
                            <img src={therapist.profile_picture} alt={therapist.name} className="w-full h-full object-cover" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Back Button */}
            <button className="mt-6 px-24 py-2 border border-white rounded-full text-white text-lg" onClick={() => window.history.back()}>
                Back
            </button>
        </div>
    );
};

export default Recommendations;