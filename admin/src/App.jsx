import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import TherapistsList from "./pages/TherapistsList";
import TherapistForm from "./pages/TherapistForm";
import AnamnesisQuestionsList from "./pages/AnamnesisQuestionsList";
import AnamnesisQuestionForm from "./pages/AnamnesisQuestionForm";
import Login from "./pages/Login";
import AnamnesisCategoriesList from "./pages/AnamnesisCategoriesList";
import AnamnesisCategoriesForm from "./pages/AnamnesisCategoriesForm";
import AnamnesisSectionsList from "./pages/AnamnesisSectionsList";
import AnamnesisSectionsForm from "./pages/AnamnesisSectionsForm";

function App() {
  return (
    <Router basename="/admin">
      <Routes>
        {/* Rota pública para login */}
        <Route path="/" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/therapists" element={<Layout><TherapistsList /></Layout>} />
          <Route path="/therapists/new" element={<Layout><TherapistForm /></Layout>} />
          <Route path="/therapists/edit/:id" element={<Layout><TherapistForm /></Layout>} />
          <Route path="/anamnesis/questions" element={<Layout><AnamnesisQuestionsList /></Layout>} />
          <Route path="/anamnesis/questions/new" element={<Layout><AnamnesisQuestionForm /></Layout>} />
          <Route path="/anamnesis/questions/edit/:id" element={<Layout><AnamnesisQuestionForm /></Layout>} />
          <Route path="/anamnesis/categories" element={<Layout><AnamnesisCategoriesList /></Layout>} />
          <Route path="/anamnesis/categories/new" element={<Layout><AnamnesisCategoriesForm /></Layout>} />
          <Route path="/anamnesis/categories/edit/:id" element={<Layout><AnamnesisCategoriesForm /></Layout>} />
          <Route path="/anamnesis/sections" element={<Layout><AnamnesisSectionsList /></Layout>} />
          <Route path="/anamnesis/sections/new" element={<Layout><AnamnesisSectionsForm /></Layout>} />
          <Route path="/anamnesis/sections/edit/:id" element={<Layout><AnamnesisSectionsForm /></Layout>} />
        </Route>
      </Routes>
    </Router>
  );
}

// Componente para adicionar Sidebar e Header automaticamente às páginas protegidas
const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default App;