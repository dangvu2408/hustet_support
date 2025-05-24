import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import CoursePage from "./pages/CoursePage";
import AddCourse from "./pages/AddCourse";
import Profile from "./pages/ProfiePage";
import CourseDetails from "./pages/CourseDetails";
import Account from "./pages/UpdateUserInfo";

// 👉 import component menu chuột phải
import CustomContextMenu from "./components/CustomContextMenu";

function App() {
    return (
        <Router>
            {/* ✅ Menu context đặt ở đây để luôn hoạt động */}
            <CustomContextMenu />

            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/courses" element={<CoursePage />} />
                <Route path="/add-course" element={<AddCourse />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/update-info" element={<Account />} />
                <Route path="/courses/:course_id" element={<CourseDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
