import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetStarted from "./components/GetStarted";
import AnamnesisForm from "./components/AnamnesisForm";
import Recommendations from "./components/Recommendations";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GetStarted />} />
                <Route path="/anamnesis" element={<AnamnesisForm />} />
                <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
        </Router>
    );
}

export default App;