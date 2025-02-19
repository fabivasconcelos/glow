import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetStarted from "./components/GetStarted";
import AnamnesisForm from "./components/AnamnesisForm";
import Recommendations from "./components/Recommendations";
import TherapistProfile from "./components/TherapistProfile";
import ScheduleMeeting from "./components/ScheduleMeeting";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GetStarted />} />
                <Route path="/anamnesis" element={<AnamnesisForm />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/therapist/:id" element={<TherapistProfile />} />
                <Route path="/schedule/:id" element={<ScheduleMeeting />} />
            </Routes>
        </Router>
    );
}

export default App;