// src/pages/AnamnesisCategorySelection.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import glowLogo from "/app/glow-logo-orange.png";
import { useNavigate } from "react-router-dom";

const AnamnesisCategorySelection = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/categories`)
            .then((response) => setCategories(response.data))
            .catch((error) => console.error("Erro ao buscar categorias:", error));
    }, []);

    const handleSelect = (id) => {
        navigate(`/anamnesis?category=${id}`);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center px-4 pt-6 pb-12 text-[#202131]"
            style={{ backgroundImage: "url('/app/anamnesis-category-bg.jpeg')" }}
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <img src={glowLogo} alt="Glow Logo" className="w-[590px] absolute top-0 left-0" />
                {/* <p className="text-sm md:text-base ml-auto mr-4">Part 1: Initial Assessment (2 minutes)</p> */}
            </div>

            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-gloock text-center mt-24 mb-8">
                Which service are you interested in?
            </h1>

            {/* Categorias */}
            <div className="flex flex-col items-center gap-6 max-w-xl mx-auto">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleSelect(category.id)}
                        className="w-full bg-white px-6 py-4 rounded-2xl shadow-md text-left"
                    >
                        <p className="font-bold">{category.name}</p>
                        <p className="text-sm text-gray-700">
                            {category.subtitle || ""}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AnamnesisCategorySelection;