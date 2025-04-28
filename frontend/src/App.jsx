import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import AnamnesisForm from "./pages/AnamnesisForm";
import Recommendations from "./pages/Recommendations";
import TherapistProfile from "./pages/TherapistProfile";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import WelcomeScreen from "./pages/WelcomeScreen";
import AnamnesisCategorySelection from "./pages/AnamnesisCategorySelection";
import AnamnesisLoading from "./pages/AnamnesisLoading";
import TherapistForm from "./pages/TherapistForm";
import TherapistFormConfirmation from "./pages/TherapistFormConfirmation";

function App() {
    return (
        <Router basename="/app">
            <Routes>
                <Route path="/" element={<GetStarted />} />
                <Route path="/welcome" element={<WelcomeScreen />} />
                <Route path="/anamnesis/categories" element={<AnamnesisCategorySelection />} />
                <Route path="/anamnesis" element={<AnamnesisForm />} />
                <Route path="/anamnesis/loading" element={<AnamnesisLoading />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/therapist/new" element={<TherapistForm />} />
                <Route path="/therapist/new/confirmation" element={<TherapistFormConfirmation />} />
                <Route path="/therapist/:id" element={<TherapistProfile />} />
                <Route path="/schedule/:id" element={<ScheduleMeeting />} />
            </Routes>
        </Router>
    );
}

export default App;