// Ajustes no AnamnesisQuestionForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AnamnesisQuestionForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        question: "",
        type: "single_choice",
        options: [""],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isEditing = !!id;

    useEffect(() => {
        if (isEditing) {
            axios.get(`http://localhost:8000/api/anamnesis/questions/${id}`)
                .then(response => {
                    const { question, type, options } = response.data;
                    setFormData({
                        question,
                        type,
                        options: options.length > 0 ? options.map(opt => opt.option) : [""]
                    });
                })
                .catch(error => {
                    console.error("Erro ao buscar a questão", error);
                    setError("Failed to load question.");
                });
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        setFormData({ ...formData, options: newOptions });
    };

    const addOption = () => {
        setFormData({ ...formData, options: [...formData.options, ""] });
    };

    const removeOption = (index) => {
        const newOptions = formData.options.filter((_, i) => i !== index);
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const payload = { ...formData, options: formData.options.filter(opt => opt.trim() !== "") };
            if (isEditing) {
                await axios.post(`http://localhost:8000/api/anamnesis/questions/${id}`, payload);
            } else {
                await axios.post("http://localhost:8000/api/anamnesis/questions", payload);
            }
            navigate("/anamnesis/questions");
        } catch (error) {
            console.error("Erro ao salvar questão", error);
            setError("Failed to save question.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Question" : "Add New Question"}</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Question</label>
                    <input 
                        type="text" 
                        name="question" 
                        value={formData.question} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="single_choice">Single Choice</option>
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="text">Text</option>
                    </select>
                </div>
                {(formData.type !== "text") && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Options</label>
                        {formData.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input 
                                    type="text" 
                                    value={option} 
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <button type="button" onClick={() => removeOption(index)} className="text-red-500">X</button>
                            </div>
                        ))}
                        <button type="button" onClick={addOption} className="bg-blue-500 text-white px-3 py-1 rounded">Add Option</button>
                    </div>
                )}
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default AnamnesisQuestionForm;
