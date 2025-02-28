import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const TherapistForm = ({ onSuccess }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        specialization: "",
        bio: "",
        profile_picture: null,
        gender: "No preference",
        interaction_style: "No preference",
        specialties: [],
        age_experience: "18-25",
        session_price: "",
        video_url: "",
        meeting_link: "",
    });
    const [successMessage, setSuccessMessage] = useState(""); // Estado para a mensagem de sucesso

    useEffect(() => {
        if (id) {
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/therapists/${id}`)
                .then(response => {
                    const therapistData = response.data;
                    setFormData({
                        ...therapistData,
                        specialties: Array.isArray(therapistData.specialties) ? therapistData.specialties : [],
                        profile_picture: null,
                    });
                })
                .catch(error => console.error("Erro ao carregar terapeuta:", error));
        }
    }, [id]);

    const availableGenders = ["Male", "Female", "No preference"];
    const interactionStyles = ["Structured", "Conversational", "No preference"];
    const specialtiesList = [
        "Anxiety", "Depression", "Mindfulness", "Holistic Therapy",
        "Stress Management", "Cognitive Behavioral Therapy", "Trauma", "CBT"
    ];
    const ageGroups = ["18-25", "26-35", "36-45", "46-55"];

    const handleChange = (e) => {
        if (e.target.name === "profile_picture") {
            setFormData({ ...formData, profile_picture: e.target.files[0] });
        } else if (e.target.name === "specialties") {
            const updatedSpecialties = formData.specialties.includes(e.target.value)
                ? formData.specialties.filter(s => s !== e.target.value)
                : [...formData.specialties, e.target.value];
            setFormData({ ...formData, specialties: updatedSpecialties });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === "specialties") {
                form.append(key + "[]", formData[key]);
            } else if (key === "profile_picture") {
                if (formData.profile_picture instanceof File) {
                    form.append("profile_picture", formData.profile_picture);
                }
            } else {
                form.append(key, formData[key]);
            }
        });

        try {
            if (id) {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/therapists/${id}`, form, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/therapists`, form, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
            setSuccessMessage("Therapist saved successfully! ✅"); // Define a mensagem de sucesso
            setTimeout(() => {
                setSuccessMessage(""); // Esconde a mensagem após 3s
                navigate("/therapists"); // Redireciona após salvar
            }, 3000);
        } catch (error) {
            console.error("Erro ao salvar terapeuta:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 p-6">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-center">{id ? "Edit Therapist" : "New Therapist"}</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Nome */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        {/* Specialization */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Specialization</label>
                            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        {/* Bio */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Bio</label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" rows="3" required />
                        </div>

                        {/* Gender */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                                {availableGenders.map((gender) => (
                                    <option key={gender} value={gender}>{gender}</option>
                                ))}
                            </select>
                        </div>

                        {/* Interaction Style */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Interaction Style</label>
                            <select name="interaction_style" value={formData.interaction_style} onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                                {interactionStyles.map((style) => (
                                    <option key={style} value={style}>{style}</option>
                                ))}
                            </select>
                        </div>

                        {/* Specialties */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Specialties</label>
                            <div className="grid grid-cols-2 gap-2">
                                {specialtiesList.map((spec) => (
                                    <label key={spec} className="flex items-center space-x-2">
                                        <input type="checkbox" name="specialties" value={spec}
                                            checked={formData.specialties.includes(spec)} onChange={handleChange} />
                                        <span>{spec}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Age Experience */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Age Experience</label>
                            <select name="age_experience" value={formData.age_experience} onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                                {ageGroups.map((age) => (
                                    <option key={age} value={age}>{age}</option>
                                ))}
                            </select>
                        </div>

                        {/* Profile Picture */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Profile Picture</label>
                            <input type="file" name="profile_picture" onChange={handleChange} className="w-full p-2 border rounded-lg" />
                        </div>

                        {/* Session Price */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Session Price ($)</label>
                            <input type="number" name="session_price" value={formData.session_price} onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        {/* Video URL */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Video URL</label>
                            <input type="url" name="video_url" value={formData.video_url} onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        {/* Meeting Link */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Meeting Link</label>
                            <input type="url" name="meeting_link" value={formData.meeting_link} onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        {/* Botão de Salvar */}
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                            Save Therapist
                        </button>

                        {/* Mensagem de sucesso abaixo do botão */}
                        {successMessage && (
                            <div className="bg-green-500 text-white text-center p-3 mt-4 rounded-lg">
                                {successMessage}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TherapistForm;