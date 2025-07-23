import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TherapistProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [therapist, setTherapist] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/therapists/${id}`).then((response) => {
            setTherapist(response.data);
        });
    }, [id]);

    const handleBooking = () => {
        navigate(`/schedule/${therapist.id}`);
    };

    if (!therapist) {
        return <p className="text-center text-lg text-white">Loading...</p>;
    }

    return (
        <div className="relative min-h-screen w-full">
            <div className="absolute inset-0 z-0 recommendations-bg" />

            <div className="relative z-10 min-h-screen w-full backdrop-blur-[15px] bg-[#FFFFFFB2] flex flex-col items-center px-6 pt-6 pb-16">
                <img src="/app/glow-logo-orange.png" alt="Glow Logo" className="w-[590px] absolute top-0 left-0" />

                <div className="bg-white/90 rounded-3xl shadow-xl max-w-3xl w-full overflow-hidden mt-16">
                    {/* Vídeo e avatar */}
                    <div className="relative h-[300px] w-full bg-black">
                        <video className="w-full h-full object-cover" src={therapist.intro_video} controls poster={therapist.profile_picture} />
                        <img
                            src={therapist.profile_picture}
                            alt={therapist.full_name}
                            className="absolute bottom-[-50px] left-4 lg:right-12 lg:w-24 lg:h-24 w-20 h-20 rounded-full border-4 border-white shadow-md"
                        />
                        {therapist.plan === 'plus' && (
                            <span className="absolute bottom-[-50px] lg:right-12 right-[75%] w-6 h-6 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                    <circle cx="16.8229" cy="17.2829" r="16.362" fill="#FFA805" />
                                    <path d="M16.8299 6.375L18.3452 8.68917L20.5606 7.03283L21.1931 9.72571L23.8414 8.92699L23.5147 11.6738L26.2765 11.829L25.03 14.2984L27.5721 15.3888L25.5563 17.283L27.5721 19.1771L25.03 20.2676L26.2765 22.737L23.5147 22.8922L23.8414 25.639L21.1931 24.8403L20.5606 27.5332L18.3452 25.8768L16.8299 28.191L15.3145 25.8768L13.0991 27.5332L12.4667 24.8403L9.81835 25.639L10.1451 22.8922L7.38327 22.737L8.62974 20.2676L6.08759 19.1771L8.10347 17.283L6.08759 15.3888L8.62974 14.2984L7.38327 11.829L10.1451 11.6738L9.81835 8.92699L12.4667 9.72571L13.0991 7.03283L15.3145 8.68917L16.8299 6.375Z" fill="white" />
                                    <rect width="7.47893" height="2.49298" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 16.2656 21.6074)" fill="#FFA805" />
                                    <rect width="4.98595" height="2.49298" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 18.0234 19.8447)" fill="#FFA805" />
                                </svg>
                            </span>
                        )}
                    </div>

                    <div className="lg:pt-24 lg:pb-10 p-6 lg:mt-0 mt-12">
                        <div className="lg:pl-12 lg:pr-56">
                            <h1 className="text-[36px] font-gloock text-[#453B2C] leading-none">{therapist.full_name}</h1>
                            <p className="text-[18px] font-[400] text-[#453B2C] font-inter my-2">{therapist.professional_title}</p>

                            <p className="text-[16px] text-[#453B2C] mb-4 font-inter">
                                {therapist.bio}
                            </p>

                            {/* Seções colapsáveis (simplificado como sempre abertas aqui) */}
                            <div className="border-t border-[#453B2C] py-4">
                                <p className="font-[500] font-inter text-[24px] text-[#453B2C]">Specialization</p>
                                <ul className="list-disc list-inside font-[400] font-inter text-[20px] mt-2 lg:ml-4">
                                    {therapist.specializations.map((item, i) => (
                                        <li key={i}>{item.name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-t border-[#453B2C] py-4">
                                <p className="font-[500] font-inter text-[24px] text-[#453B2C]">Academic background</p>
                                <p className="font-[400] font-inter text-[20px] mt-2 lg:ml-4">{therapist.education_background}</p>
                            </div>

                            <div className="border-t border-[#453B2C] py-4">
                                <p className="font-[500] font-inter text-[24px] text-[#453B2C]">Price per session</p>
                                <p className="font-[400] font-inter text-[20px] mt-2 lg:ml-4">${therapist.pricing_tier}</p>
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center">
                            <button
                                className="mt-8 w-60 bg-[#FFA805] text-white py-4 rounded-xl shadow-md font-semibold"
                                onClick={handleBooking}
                            >
                                Schedule a call
                            </button>
                        </div>
                        <div className="lg:pl-12 lg:pr-56 mt-12">
                            <div className="border-t border-[#453B2C] py-4">
                                <p className="font-[500] font-inter text-[24px] text-[#453B2C]">Reviews</p>
                                {[...Array(1)].map((_, i) => (
                                    <div key={i} className="mb-4">
                                        <p className="font-[400] font-inter text-[20px]">“Dr. {therapist.full_name.split(' ')[1]} helped me develop tools to manage my anxiety and stress at work. Highly recommend!”</p>
                                        <p className="font-[500] font-inter text-[18px] mt-1">Olivia Harper</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center">
                            <button
                                className="mt-8 w-60 bg-white text-[#FFA805] border border-[#FFA805] py-4 rounded-xl shadow-md font-semibold"
                                onClick={() => navigate(-1)}
                            >
                                Return to other options
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TherapistProfile;