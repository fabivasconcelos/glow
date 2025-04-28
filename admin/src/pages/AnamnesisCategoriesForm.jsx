import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AnamnesisCategoriesForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", subtitle: "" });
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (id) {
            axios
                .get(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/categories/${id}`)
                .then(response =>
                    setFormData({
                        name: response.data.name,
                        subtitle: response.data.subtitle || "",
                    })
                )
                .catch(error => console.error("Erro ao carregar categoria:", error));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/categories/${id}`, formData);
            } else {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/categories`, formData);
            }

            setSuccessMessage("Anamnesis category saved successfully! ✅");
            setTimeout(() => {
                setSuccessMessage("");
                navigate("/anamnesis/categories");
            }, 2000);
        } catch (error) {
            console.error("Erro ao salvar categoria:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 p-6">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        {id ? "Edit Anamnesis category" : "New Anamnesis category"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {/* Nome da Categoria */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Subtítulo da Categoria */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Subtitle</label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Botão de Salvar */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Save Anamnesis Category
                        </button>

                        {/* Mensagem de sucesso */}
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

export default AnamnesisCategoriesForm;