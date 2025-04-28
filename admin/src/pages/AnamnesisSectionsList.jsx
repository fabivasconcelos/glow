import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AnamnesisSectionsList = () => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/sections`)
            .then((response) => setSections(response.data))
            .catch((error) => console.error("Erro ao buscar seções de anamnese:", error));
    }, []);

    const deleteSection = (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta seção de anamnese?")) {
            axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/sections/${id}`)
                .then(() => setSections(sections.filter((s) => s.id !== id)))
                .catch((error) => console.error("Erro ao excluir seção de anamnese:", error));
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Anamnesis Sections</h1>
            <Link to="/anamnesis/sections/new" className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block">
                + Add Anamnesis Section
            </Link>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Image</th>
                        <th className="border border-gray-300 px-4 py-2">Category</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sections.map((section) => (
                        <tr key={section.id} className="border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">{section.name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <img src={section.image} alt={section.name} className="w-20 h-auto" />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {section.category?.name || '–'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link to={`/anamnesis/sections/edit/${section.id}`} className="text-blue-500 mr-2">
                                    Edit
                                </Link>
                                <button onClick={() => deleteSection(section.id)} className="text-red-500">
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

export default AnamnesisSectionsList;