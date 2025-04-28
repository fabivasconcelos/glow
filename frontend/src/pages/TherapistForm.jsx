import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import glowLogo from "/app/glow-logo-orange.png"; // ajuste o caminho conforme necessário

const TherapistForm = () => {

    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        full_name: "",
        gender: "male",
        professional_title: "",
        professional_website: "",
        contact_email: "",
        years_experience: "",
        education_background: "",
        professional_bio: "",
        anamnesis_category_ids: [],
        specialized_skill_expertise: "",
        unique_therapeutic_approach: "",
        demographic_specialty: "",
        outcome_expertise: "",
        unique_background_perspective: "",
        additional_differentiator_1: "",
        additional_differentiator_2: "",
        additional_differentiator_3: "",
        hands_on_approach: false,
        esoteric_frameworks: false,
        esoteric_frameworks_details: "",
        remote_sessions: false,
        in_person_sessions: false,
        geographic_location: "",
        session_length_minutes: "",
        recommended_frequency: "",
        pricing_tier: "Introductory (under $200)",
        additional_information: "",
        specialization_ids: [],
        specialized_demographic_ids: [],
        language_ids: [],
        specialization_other: "",
        specialized_demographic_other: "",
        language_other: "",
        profile_picture: null,
        intro_video: null,
    });

    const [specializations, setSpecializations] = useState([]);
    const [demographics, setDemographics] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [anamnesisCategories, setAnamnesisCategories] = useState([]);
    const [otherIds, setOtherIds] = useState({ specialization: null, demographic: null, language: null });

    useEffect(() => {
        fetchOptions();
        // eslint-disable-next-line
    }, []);

    const fetchOptions = async () => {
        const [specRes, demoRes, langRes, anaRes] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/specializations`),
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/specialized-demographics`),
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/languages`),
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/categories`),
        ]);
        setSpecializations(specRes.data);
        setDemographics(demoRes.data);
        setLanguages(langRes.data);
        setAnamnesisCategories(anaRes.data);

        // Capturar os IDs dos campos "Other"
        setOtherIds({
            specialization: specRes.data.find((s) => s.name.toLowerCase() === "other")?.id || null,
            demographic: demoRes.data.find((d) => d.name.toLowerCase() === "other")?.id || null,
            language: langRes.data.find((l) => l.name.toLowerCase() === "other")?.id || null,
        });
    };

    const handleChange = (e) => {
        const { name, type, value, checked, files } = e.target;
        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleMultiSelect = (e, field) => {
        const value = parseInt(e.target.value);
        if (formData[field].includes(value)) {
            setFormData({
                ...formData,
                [field]: formData[field].filter((v) => v !== value),
            });
        } else {
            setFormData({
                ...formData,
                [field]: [...formData[field], value],
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((item) => {
                    form.append(`${key}[]`, item);
                });
            } else if (typeof formData[key] === "boolean") {
                form.append(key, formData[key] ? 1 : 0); // <-- AQUI: transforma booleano em 1 ou 0
            } else if (key === "profile_picture" || key === "intro_video") {
                if (formData[key] instanceof File) {
                    form.append(key, formData[key]);
                }
            } else {
                form.append(key, formData[key]);
            }
        }

        // 🔥 Adiciona os campos fixos "status" e "plan"
        form.append("status", "inactive");
        form.append("plan", "standard");

        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/therapists`,
                form,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            navigate('/therapist/new/confirmation')
        } catch (error) {
            console.error("Erro ao salvar terapeuta:", error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#FFFFFF] flex flex-col items-start justify-center px-6 relative">
            {/* Logo no topo esquerdo */}
            <img src={glowLogo} alt="Glow Logo" className="w-[590px] absolute top-0 left-0" />

            {/* Card central */}
            <form onSubmit={handleSubmit} className="mx-auto w-full h-auto px-20 py-20">
                {currentStep == 1 && (
                    <div id="step1" className="mx-auto w-full h-auto rounded-2xl shadow-2xl px-14 py-16 text-left z-10 bg-[#F8F5F5]">
                        <h1 className="text-[32px] font-[400] font-gloock text-[#202020] mb-6">Glow Therapist Profile Questionnaire</h1>
                        <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] mb-16">Thank you for your interest in joining Glow's exclusive network of therapeutic<br />professionals. Please complete the following information to create your profile.
                        </h2>
                        <div className="w-3/5">
                            <div className="border-t-[4px] border-[#888888]-300 mb-6">
                                <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                    Basic Information
                                </h2>
                            </div>
                            <div className="flex flex-col space-y-1 w-1/2">
                                <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                    Full Name:
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                    Professional Title:
                                </label>
                                <input
                                    type="text"
                                    name="professional_title"
                                    value={formData.professional_title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                    Gender (for client matching purposes):
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-[14px] font-[400] font-inter text-[#453B2C] appearance-none"
                                    name="gender"
                                    required
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                    Contact Email:
                                </label>
                                <input
                                    type="text"
                                    name="contact_email"
                                    value={formData.contact_email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                    Professional Website
                                </label>
                                <input
                                    type="text"
                                    name="professional_website"
                                    value={formData.professional_website}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                />
                            </div>
                            <div className="border-t-[4px] border-[#888888]-300 mb-6 mt-20">
                                <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                    Professional Experience
                                </h2>
                            </div>
                            <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                    Years of professional practice experience:
                                </label>
                                <input
                                    type="number"
                                    name="years_experience"
                                    value={formData.years_experience}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                    Educational background (degrees, certifications, specialized training):
                                </label>
                                <input
                                    type="text"
                                    name="education_background"
                                    value={formData.education_background}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                    required
                                />
                            </div>
                            <div className="border-t-[4px] border-[#888888]-300 mb-6 mt-20">
                                <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                    Professional Bio
                                </h2>
                            </div>
                            <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                    Please provide a concise professional bio (100-150 words) highlighting your approach, philosophy, and what makes your practice unique. This will be displayed to potential clients.
                                </label>
                                <textarea
                                    name="professional_bio"
                                    value={formData.professional_bio}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white shadow-md text-sm
                        focus:outline-none focus:ring-2 focus:ring-yellow-400 block resize-none
                        placeholder:text-black placeholder:italic placeholder:font-medium font-inter"
                                    required
                                    rows={3}
                                />
                            </div>
                            <div className="border-t-[4px] border-[#888888]-300 mb-6 mt-20">
                                <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                    Primary Focus
                                </h2>
                            </div>
                            <div className="flex flex-col space-y-3">
                                {anamnesisCategories.map((cat) => (
                                    <div key={cat.id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={cat.id}
                                            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                            checked={formData.anamnesis_category_ids.includes(cat.id)}
                                            onChange={(e) =>
                                                handleMultiSelect(e, "anamnesis_category_ids")
                                            }
                                        />
                                        <label htmlFor="therapeutic_support" className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                            <span className="font-[700]">{cat.name}</span>
                                            <span className="font-[400]"> ({cat.subtitle})</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t-[4px] border-[#888888]-300 mb-6 mt-20">
                                <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                    Visual Assets
                                </h2>
                            </div>
                            <div className="flex flex-col space-y-6">
                                {/* Upload Photo */}
                                <div className="flex flex-col space-y-2 w-1/2 mt-4">
                                    <label className="block text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Professional Headshot: Please upload a high-resolution professional photo (guidelines: well-lit, neutral background, professional attire)
                                    </label>

                                    <input
                                        type="file"
                                        id="profile_picture"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    profile_picture: e.target.files[0],
                                                }));
                                            }
                                        }}
                                    />

                                    <label
                                        htmlFor="profile_picture"
                                        className="bg-white border border-gray-300 text-[#453B2C] font-bold font-inter text-[14px] px-6 py-2 rounded-md hover:bg-gray-50 transition text-center cursor-pointer"
                                    >
                                        {formData.profile_picture ? formData.profile_picture.name : "UPLOAD PHOTO"}
                                    </label>
                                </div>

                                {/* Upload Video */}
                                <div className="flex flex-col space-y-2 w-1/2 mt-4">
                                    <label className="block text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Introduction Video: Please upload a 30-60 second video introducing yourself and briefly explaining your approach to therapy/coaching (guidelines: good lighting, clear audio, professional setting)
                                    </label>

                                    <input
                                        type="file"
                                        id="intro_video"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    intro_video: e.target.files[0],
                                                }));
                                            }
                                        }}
                                    />

                                    <label
                                        htmlFor="intro_video"
                                        className="bg-white border border-gray-300 text-[#453B2C] font-bold font-inter text-[14px] px-6 py-2 rounded-md hover:bg-gray-50 transition text-center cursor-pointer"
                                    >
                                        {formData.intro_video ? formData.intro_video.name : "UPLOAD VIDEO"}
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Novo wrapper só pro botão */}
                        <div className="w-full flex justify-center mt-16">
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="bg-[#EB970C] text-white text-[16px] font-[700] font-inter py-4 px-12 rounded-3xl shadow-lg w-full max-w-md lg:text-[20px] lg:px-14 lg:py-5"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
                {currentStep == 2 && (
                    <div id="step2" className="mx-auto w-full h-auto rounded-2xl shadow-2xl px-14 py-16 text-left z-10 bg-[#F8F5F5]">
                        <div className="flex flex-col items-start w-full">
                            <h1 className="text-[32px] font-[400] font-gloock text-[#202020] mb-6">
                                Key Differentiators (IMPORTANT)
                            </h1>
                            <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] mb-16">
                                This section is critical for matching you with compatible clients.<br />
                                Please provide at least 5 specific, concise differentiators that make your practice unique<br />
                                (the more you can provide, the better we can match you with ideal clients):
                            </h2>
                            <div className="w-3/5">
                                <div className="border-t-[4px] border-[#888888]-300 mb-6">
                                    <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                        Specific Differentiators
                                    </h2>
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2">
                                    <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Specialized skill/expertise (e.g., "Specialized in executive burnout"):
                                    </label>
                                    <input
                                        type="text"
                                        name="specialized_skill_expertise"
                                        value={formData.specialized_skill_expertise}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                    <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Unique therapeutic approach (e.g., "EMDR trauma resolution expert"):
                                    </label>
                                    <input
                                        type="text"
                                        name="unique_therapeutic_approach"
                                        value={formData.unique_therapeutic_approach}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                    <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Demographic specialty (e.g., "Specialized in teenagers"):
                                    </label>
                                    <input
                                        type="text"
                                        name="demographic_specialty"
                                        value={formData.demographic_specialty}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                    <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Outcome expertise (e.g., "Rapid anxiety reduction techniques"):
                                    </label>
                                    <input
                                        type="text"
                                        name="outcome_expertise"
                                        value={formData.outcome_expertise}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                    <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Unique background/perspective (e.g., "Former CEO, understands executive pressure"):
                                    </label>
                                    <input
                                        type="text"
                                        name="unique_background_perspective"
                                        value={formData.unique_background_perspective}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                    <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Additional differentiator:
                                    </label>
                                    <input
                                        type="text"
                                        name="additional_differentiator_1"
                                        value={formData.additional_differentiator_1}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                    <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Additional differentiator:
                                    </label>
                                    <input
                                        type="text"
                                        name="additional_differentiator_2"
                                        value={formData.additional_differentiator_2}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                    <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Additional differentiator:
                                    </label>
                                    <input
                                        type="text"
                                        name="additional_differentiator_3"
                                        value={formData.additional_differentiator_3}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                    />
                                </div>
                                <div className="border-t-[4px] border-[#888888]-300 mb-6 mt-20">
                                    <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                        Specializations & Skills
                                    </h2>
                                </div>
                                <div className="flex flex-col space-y-3">
                                    <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Please select all areas that apply to your practice. This is not exhaustive, so please add any additional specialties in the "Other" fields:
                                    </label>
                                    {specializations.map((spec) => (
                                        <div key={spec.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={spec.id}
                                                className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                                checked={formData.specialization_ids.includes(spec.id)}
                                                onChange={(e) =>
                                                    handleMultiSelect(e, "specialization_ids")
                                                }
                                            />
                                            <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                                <span className="font-[700]">{spec.name}</span>
                                            </label>
                                        </div>
                                    ))}
                                    {/* Campo para digitar o "Other" */}
                                    {otherIds.specialization && formData.specialization_ids.includes(otherIds.specialization) && (
                                        <div className="flex flex-col space-y-3">
                                            <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                                (please specify any additional therapeutic methods you utilize):
                                            </label>
                                            <input
                                                type="text"
                                                name="specialization_other"
                                                value={formData.specialization_other}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="border-t-[4px] border-[#888888]-300 mb-6 mt-20">
                                    <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                        Specialized Demographics (select all that apply)
                                    </h2>
                                </div>
                                <div className="flex flex-col space-y-3">
                                    {demographics.map((demo) => (
                                        <div key={demo.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={demo.id}
                                                className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                                checked={formData.specialized_demographic_ids.includes(demo.id)}
                                                onChange={(e) =>
                                                    handleMultiSelect(e, "specialized_demographic_ids")
                                                }
                                            />
                                            <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                                <span className="font-[700]">{demo.name}</span>
                                            </label>
                                        </div>
                                    ))}
                                    {/* Campo para digitar o "Other" */}
                                    {otherIds.demographic && formData.specialized_demographic_ids.includes(otherIds.demographic) && (
                                        <div className="flex flex-col space-y-3">
                                            <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                                (please specify any additional therapeutic methods you utilize):
                                            </label>
                                            <input
                                                type="text"
                                                name="specialized_demographic_other"
                                                value={formData.specialized_demographic_other}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="border-t-[4px] border-[#888888]-300 mb-6 mt-20">
                                    <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                        Session Information
                                    </h2>
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name="remote_sessions"
                                            checked={formData.remote_sessions}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                        />
                                        <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                            <span className="font-[700]">Remote sessions?</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name="in_person_sessions"
                                            checked={formData.in_person_sessions}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                        />
                                        <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                            <span className="font-[700]">In-person sessions?</span>
                                        </label>
                                    </div>
                                </div>
                                {/* Condicional: mostrar o campo detalhes se usar in_person_sessions */}
                                {formData.in_person_sessions && (
                                    <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                        <label className="text-[14px] font-[700] font-inter text-[#453B2C]">
                                            Geographic location(s) for in-person sessions:
                                        </label>
                                        <textarea
                                            name="geographic_location"
                                            value={formData.geographic_location}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md bg-white shadow-md text-sm
                            focus:outline-none focus:ring-2 focus:ring-yellow-400 block resize-none
                            placeholder:text-black placeholder:italic placeholder:font-medium font-inter"
                                            rows={3}
                                        />
                                    </div>
                                )}
                                <div className="border-t-[4px] border-[#888888]-300 mb-6 mt-20">
                                    <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                        Session Details
                                    </h2>
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name="hands_on_approach"
                                            checked={formData.hands_on_approach}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                        />
                                        <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                            <span className="font-[700]">Are your therapeutic approaches hands-on/include appropriate physical touch?</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name="esoteric_frameworks"
                                            checked={formData.esoteric_frameworks}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                        />
                                        <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                            <span className="font-[700]">Do you incorporate esoteric or alternative frameworks?</span>
                                        </label>
                                    </div>
                                </div>
                                {/* Condicional: mostrar o campo detalhes se usar esoteric_frameworks */}
                                {formData.esoteric_frameworks && (
                                    <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                        <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                            If yes, please specify:
                                        </label>
                                        <textarea
                                            name="esoteric_frameworks_details"
                                            value={formData.esoteric_frameworks_details}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md bg-white shadow-md text-sm
                            focus:outline-none focus:ring-2 focus:ring-yellow-400 block resize-none
                            placeholder:text-black placeholder:italic placeholder:font-medium font-inter"
                                            rows={3}
                                        />
                                    </div>
                                )}

                                <div className="border-t-[4px] border-[#888888]-300 mb-6 mt-20">
                                    <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                        Session Structure
                                    </h2>
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2">
                                    <div className="flex flex-col space-y-3">
                                        <label className="text-[14px] font-[700] font-inter text-[#453B2C]">
                                            Typical session length (in minutes):
                                        </label>
                                        <input
                                            type="text"
                                            name="session_length_minutes"
                                            value={formData.session_length_minutes}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                    <div className="flex flex-col space-y-3">
                                        <label className="text-[14px] font-[700] font-inter text-[#453B2C]">
                                            Recommended session frequency:
                                        </label>
                                        <input
                                            type="text"
                                            name="recommended_frequency"
                                            value={formData.recommended_frequency}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2 mt-4">
                                    <div className="flex flex-col space-y-3">
                                        <label className="text-[14px] font-[700] font-inter text-[#453B2C]">
                                            Pricing tier (select one):
                                        </label>
                                        <select
                                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-[14px] font-[400] font-inter text-[#453B2C] appearance-none"
                                            name="pricing_tier"
                                            required
                                        >
                                            <option value="Premium ($500+)">Premium ($500+)</option>
                                            <option value="Advanced ($300-$499)">
                                                Advanced ($300-$499)
                                            </option>
                                            <option value="Standard ($200-$299)">
                                                Standard ($200-$299)
                                            </option>
                                            <option value="Introductory (under $200)">
                                                Introductory (under $200)
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="border-t-[4px] border-[#888888]-300 mb-6 mt-20">
                                    <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                        Languages
                                    </h2>
                                </div>
                                <div className="flex flex-col space-y-3">
                                    <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Please indicate all languages in which you are proficient enough to conduct full therapeutic sessions:
                                    </label>
                                    {languages.map((lang) => (
                                        <div key={lang.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={lang.id}
                                                className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                                checked={formData.language_ids.includes(lang.id)}
                                                onChange={(e) =>
                                                    handleMultiSelect(e, "language_ids")
                                                }
                                            />
                                            <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                                <span className="font-[700]">{lang.name}</span>
                                            </label>
                                        </div>
                                    ))}
                                    {/* Campo para digitar o "Other" */}
                                    {otherIds.language && formData.language_ids.includes(otherIds.language) && (
                                        <div className="flex flex-col space-y-3">
                                            <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                                please specify:
                                            </label>
                                            <input
                                                type="text"
                                                name="language_other"
                                                value={formData.language_other}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 text-sm"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="border-t-[4px] border-[#888888]-300 mb-6 mt-20">
                                    <h2 className="text-[20px] font-[400] font-gloock text-[#453B2C] inline-block">
                                        Additional Information
                                    </h2>
                                </div>
                                <div className="flex flex-col space-y-3">
                                    <label className="text-[14px] font-[400] font-inter text-[#453B2C]">
                                        Is there anything else you'd like potential clients to know about your practice?
                                    </label>
                                    <textarea
                                        name="additional_information"
                                        value={formData.additional_information}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md bg-white shadow-md text-sm
                            focus:outline-none focus:ring-2 focus:ring-yellow-400 block resize-none
                            placeholder:text-black placeholder:italic placeholder:font-medium font-inter"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Novo wrapper só pro botão */}
                        <div className="w-full flex justify-center mt-16 gap-8">
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="bg-white text-black text-[16px] font-[700] font-inter py-4 px-12 rounded-3xl shadow-lg w-full max-w-md lg:text-[20px] lg:px-14 lg:py-5"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="bg-[#EB970C] text-white text-[16px] font-[700] font-inter py-4 px-12 rounded-3xl shadow-lg w-full max-w-md lg:text-[20px] lg:px-14 lg:py-5"
                            >
                                Complete
                            </button>
                        </div>
                    </div>)
                }
            </form >
        </div >
    );
};

export default TherapistForm;
