import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import glowLogo from "/app/glow-logo-brown.png"; // Verifique o caminho correto
import { ChevronLeft } from "lucide-react";

const ScheduleMeeting = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [therapist, setTherapist] = useState(null);
    const [iframeHeight, setIframeHeight] = useState("700px"); // Altura inicial para mobile

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/therapists/${id}`)
            .then(response => {
                setTherapist(response.data);
            })
            .catch(error => {
                console.error("Error fetching therapist data:", error);
            });

        // Ajustar altura dinamicamente no desktop
        const updateHeight = () => {
            const viewportHeight = window.innerHeight;
            const headerHeight = 100; // Estimando altura do header
            const spacing = 40; // Margens e paddings
            const calculatedHeight = viewportHeight - headerHeight - spacing;
            setIframeHeight(`${calculatedHeight}px`);
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);

        return () => {
            window.removeEventListener("resize", updateHeight);
        };
    }, [id]);

    if (!therapist) {
        return <p className="text-center text-lg text-black">Loading meeting...</p>;
    }

    return (
        <div className="min-h-screen bg-[#EDE3D5] text-black py-6 font-inter flex flex-col">
            {/* Container centralizado no desktop */}
            <div className="max-w-[900px] mx-auto px-6 md:px-12 w-full">
                {/* Header */}
                <div className="w-full flex justify-between items-center mb-6">
                    <img src={glowLogo} alt="Glow" className="w-20 h-auto" />
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center border-2 border-[#DB8F00] rounded-full text-[#DB8F00]"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>

                {/* Título */}
                <h1 className="text-[16px] font-[400] font-inter text-[#202131] mb-4">
                    Schedule your call with:
                </h1>

                {/* Informações do terapeuta */}
                <div className="flex items-center space-x-3 mb-6">
                    <img
                        src={therapist.profile_picture}
                        alt={therapist.name}
                        className="w-10 h-10 rounded-full border"
                    />
                    <p className="text-[14px] font-[500] font-inter text-[#202131]">
                        {therapist.name}
                    </p>
                </div>

                {/* Iframe do HubSpot com altura dinâmica */}
                <div className="w-full bg-white rounded-lg shadow-lg">
                    <iframe
                        src={therapist.meeting_link}
                        width="100%"
                        height={iframeHeight} // Altura dinâmica
                        frameBorder="0"
                        allowFullScreen
                        className="rounded-lg"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ScheduleMeeting;