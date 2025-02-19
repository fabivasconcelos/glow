import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import glowLogo from "/glow-logo.png"; // Certifique-se de que o caminho está correto

const TherapistProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [therapists, setTherapists] = useState([]);
    const [currentTherapistIndex, setCurrentTherapistIndex] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8000/api/therapists").then((response) => {
            setTherapists(response.data);
            const index = response.data.findIndex((t) => t.id == id);
            setCurrentTherapistIndex(index !== -1 ? index : 0);
        });
    }, [id]);

    if (therapists.length === 0) {
        return <p className="text-center text-lg text-white">Loading...</p>;
    }

    const therapist = therapists[currentTherapistIndex];
    const nextTherapist = () => {
        setCurrentTherapistIndex((prev) => (prev + 1) % therapists.length);
    };

    const prevTherapist = () => {
        setCurrentTherapistIndex((prev) =>
            prev === 0 ? therapists.length - 1 : prev - 1
        );
    };

    return (
        <div className="min-h-screen bg-[#453B2C] text-white py-6 font-inter relative">
            {/* Header */}
            <div className="flex justify-between items-center px-6 mb-4">
                <img src={glowLogo} alt="Glow" className="w-24 h-auto" />
                <div className="flex items-center space-x-4">
                    <button
                        onClick={prevTherapist}
                        className="w-10 h-10 flex items-center justify-center border-2 border-[#DB8F00] rounded-full text-[#DB8F00]"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextTherapist}
                        className="w-10 h-10 flex items-center justify-center border-2 border-[#DB8F00] rounded-full text-[#DB8F00]"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <h1 className="text-[16px] font-inter px-6 font-bold text-[#DB8F00] mb-4">Select your therapist:</h1>

            {/* Video */}
            <div className="relative w-full h-52 md:h-80 rounded-tr-3xl overflow-hidden">
                <iframe
                    className="w-full h-full"
                    src={therapist.video_url}
                    title="Therapist Video"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Profile */}
            <div className="p-6 relative mt-2">
                <div className="absolute -top-12 right-6">
                    <img
                        src={therapist.profile_picture}
                        alt={therapist.name}
                        className="w-24 h-24 rounded-full border-4 border-[#DB8F00] object-cover"
                    />
                </div>
                <div className="border-l-2 border-white pl-3">
                    <h2 className="text-[26px] font-gloock font-[400]">{therapist.name}</h2>
                    <p className="text-white text-[14px] font-inter font-[500] mt-1">{therapist.specialization}</p>
                    <p className="text-[14px] mt-4 font-inter font-[400]">{therapist.bio}</p>
                </div>

                {/* Specialization */}
                <div className="relative flex items-center mt-4">
                    {/* Botão + */}
                    <div className="absolute left-[-5px] top-1/2 transform -translate-y-1/2 w-3 h-3 flex items-center justify-center bg-white rounded-full mr-2">
                        <Plus className="text-black" size={14} />
                    </div>

                    {/* Título */}
                    <h3 className="font-[600] font-inter text-white text-[11px] ml-4">Specialization</h3>
                </div>
                <div className="border-l-2 border-white pl-4 mt-4 flex items-center justify-between">
                    <ul className="list-disc pl-5">
                        {therapist.specialties.map((spec, index) => (
                            <li key={index} className="font-[400] font-inter text-white text-[14px]">{spec}</li>
                        ))}
                    </ul>
                </div>

                {/* Price per Session */}
                <div className="relative flex items-center mt-4">
                    {/* Botão + */}
                    <div className="absolute left-[-5px] top-1/2 transform -translate-y-1/2 w-3 h-3 flex items-center justify-center bg-white rounded-full mr-2">
                        <Plus className="text-black" size={14} />
                    </div>

                    {/* Título */}
                    <h3 className="font-[600] font-inter text-white text-[11px] ml-4">Price per session</h3>
                </div>
                <div className="border-l-2 border-white pl-4 mt-4 flex items-center justify-between">
                    <p className="font-[400] font-inter text-white text-[14px]">${therapist.session_price} per session</p>
                </div>
            </div>

            {/* Schedule Button */}
            <div className="mt-6 px-6">
                <button className="w-full bg-[#DB8F00] h-[54px] text-white py-4 rounded-[18px] text-[16px] font-[700] font-inter"
                    onClick={() => navigate(`/schedule/${therapist.id}`)}>
                    Schedule a call
                </button>
            </div>

            {/* Back Button */}
            <div className="mt-6 flex justify-center">
                <button
                    className="px-24 py-3 border border-white rounded-[18px] text-white text-[14px] font-inter h-[50px]"
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default TherapistProfile;