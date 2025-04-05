import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css"; // Import file CSS
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </Router>
  );
}

export default App;
