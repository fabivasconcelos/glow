import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TherapistsList = () => {
    const [therapists, setTherapists] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/therapists")
            .then((response) => setTherapists(response.data))
            .catch((error) => console.error("Erro ao buscar terapeutas:", error));
    }, []);

    const deleteTherapist = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este terapeuta?")) {
            axios.delete(`http://localhost:8000/api/therapists/${id}`)
                .then(() => setTherapists(therapists.filter((t) => t.id !== id)))
                .catch((error) => console.error("Erro ao excluir terapeuta:", error));
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Therapists</h1>
            <Link to="/therapists/new" className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block">
                + Add Therapist
            </Link>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Specialization</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {therapists.map((therapist) => (
                        <tr key={therapist.id} className="border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">{therapist.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{therapist.specialization}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link to={`/therapists/edit/${therapist.id}`} className="text-blue-500 mr-2">
                                    Edit
                                </Link>
                                <button onClick={() => deleteTherapist(therapist.id)} className="text-red-500">
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

export default TherapistsList;