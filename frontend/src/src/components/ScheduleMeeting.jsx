import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import glowLogo from "/glow-logo-brown.png"; // Verifique o caminho correto
import { ChevronLeft } from "lucide-react";

const ScheduleMeeting = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [therapist, setTherapist] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/therapists/${id}`)
            .then(response => {
                setTherapist(response.data);
            })
            .catch(error => {
                console.error("Error fetching therapist data:", error);
            });
    }, [id]);

    if (!therapist) {
        return <p className="text-center text-lg text-black">Loading meeting...</p>;
    }

    return (
        <div className="min-h-screen bg-[#EDE3D5] text-black py-6 font-inter flex flex-col">
            {/* Header */}
            <div className="w-full px-6 flex justify-between items-center">
                <img src={glowLogo} alt="Glow" className="w-20 h-auto" />
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center border-2 border-[#DB8F00] rounded-full text-[#DB8F00]"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>
            </div>

            {/* Título */}
            <h1 className="text-[16px] font-[400] font-inter mt-6 ml-6 text-[#202131]">Schedule your call with:</h1>
            <div className="flex space-x-2 mt-4 ml-6">
                <img src={therapist.profile_picture} alt={therapist.name} className="w-8 h-8 rounded-full border" />
                <p className="text-[14px] font-[500] font-inter text-[#202131">{therapist.name}</p>
            </div>

            {/* Iframe do HubSpot */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-6">
                <iframe
                    src={therapist.meeting_link}
                    width="100%"
                    height="700px"
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-lg"
                ></iframe>
            </div>
        </div>
    );
};

export default ScheduleMeeting;