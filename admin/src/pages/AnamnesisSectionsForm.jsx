import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AnamnesisSectionsForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        image: null,
        anamnesis_category_id: ""
    });
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Buscar todas as categorias para o dropdown
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/categories`)
            .then(res => setCategories(res.data))
            .catch(err => console.error("Erro ao carregar categorias:", err));

        // Carregar dados da seção se for edição
        if (id) {
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/sections/${id}`)
                .then(res => setFormData({
                    name: res.data.name,
                    image: null, // só envia nova se alterar
                    anamnesis_category_id: res.data.anamnesis_category_id
                }))
                .catch(err => console.error("Erro ao carregar seção:", err));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        form.append("name", formData.name);
        form.append("anamnesis_category_id", formData.anamnesis_category_id);
        if (formData.image instanceof File) {
            form.append("image", formData.image);
        }

        try {
            if (id) {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/sections/${id}`, form);
            } else {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/sections`, form);
            }

            setSuccessMessage("Anamnesis section saved successfully! ✅");
            setTimeout(() => {
                setSuccessMessage("");
                navigate("/anamnesis/sections");
            }, 2000);
        } catch (error) {
            console.error("Erro ao salvar seção:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 p-6">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-center">{id ? "Edit Section" : "New Section"}</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Nome */}
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

                        {/* Categoria */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Category</label>
                            <select
                                name="anamnesis_category_id"
                                value={formData.anamnesis_category_id}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Imagem */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>

                        {/* Botão */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Save Section
                        </button>

                        {/* Sucesso */}
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

export default AnamnesisSectionsForm;