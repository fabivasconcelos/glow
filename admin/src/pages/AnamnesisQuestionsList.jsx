import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const AnamnesisQuestionsList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/questions`);
      setQuestions(response.data);
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/questions/${id}`);
        fetchQuestions();
      } catch (error) {
        console.error("Erro ao excluir pergunta:", error);
      }
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedPayload = items.map((q, index) => ({
      id: q.id,
      order: index + 1,
    }));

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/anamnesis/questions/reorder`, { questions: reorderedPayload });

      // 🔁 Atualiza a grid com os dados corretos do backend
      await fetchQuestions();
    } catch (error) {
      console.error("Erro ao atualizar a ordem:", error);
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <table
              className="w-full border-collapse border border-gray-300 mt-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Order</th>
                  <th className="border border-gray-300 px-4 py-2">Question</th>
                  <th className="border border-gray-300 px-4 py-2">Type</th>
                  <th className="border border-gray-300 px-4 py-2">Section</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <Draggable key={question.id} draggableId={`${question.id}`} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border border-gray-300 bg-white"
                      >
                        <td className="border border-gray-300 px-4 py-2">{question.order}</td>
                        <td className="border border-gray-300 px-4 py-2">{question.question}</td>
                        <td className="border border-gray-300 px-4 py-2">{question.type}</td>
                        <td className="border border-gray-300 px-4 py-2">{question.section?.name || "-"}</td>
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default AnamnesisQuestionsList;