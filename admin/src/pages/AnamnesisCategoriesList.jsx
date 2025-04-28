import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AnamnesisCategoriesList = () => {
    const [anamnesisCategories, setAnamnesisCategories] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/categories`)
            .then((response) => setAnamnesisCategories(response.data))
            .catch((error) => console.error("Erro ao buscar categorias de anamnese:", error));
    }, []);

    const deleteAnamneseCategory = (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta categoria de anamnese?")) {
            axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/categories/${id}`)
                .then(() => setAnamnesisCategories(anamnesisCategories.filter((t) => t.id !== id)))
                .catch((error) => console.error("Erro ao excluir categoria de anamnese:", error));
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Anamnesis Categories</h1>
            <Link to="/anamnesis/categories/new" className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block">
                + Add Anamnesis Category
            </Link>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Subtitle</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {anamnesisCategories.map((anamnesisCategory) => (
                        <tr key={anamnesisCategory.id} className="border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">{anamnesisCategory.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{anamnesisCategory.subtitle}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link to={`/anamnesis/categories/edit/${anamnesisCategory.id}`} className="text-blue-500 mr-2">
                                    Edit
                                </Link>
                                <button onClick={() => deleteAnamneseCategory(anamnesisCategory.id)} className="text-red-500">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnamnesisCategoriesList;