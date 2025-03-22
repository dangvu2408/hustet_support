import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css"; // Import file CSS
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
