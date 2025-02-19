import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AnamnesisQuestionsList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/anamnesis/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
      try {
        await axios.delete(`http://localhost:8000/api/anamnesis/questions/${id}`);
        fetchQuestions();
      } catch (error) {
        console.error("Erro ao excluir pergunta:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Anamnesis Questions</h1>
      <Link
        to="/anamnesis/questions/new"
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block"
      >
        Add Question
      </Link>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Question</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{question.id}</td>
              <td className="border border-gray-300 px-4 py-2">{question.question}</td>
              <td className="border border-gray-300 px-4 py-2">{question.type}</td>
              <td className="border border-gray-300 px-4 py-2">
                <Link to={`/anamnesis/questions/edit/${question.id}`} className="text-blue-500 mr-2">Edit</Link>
                <button
                  onClick={() => handleDelete(question.id)}
                  className="text-red-500"
                >
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

export default AnamnesisQuestionsList;