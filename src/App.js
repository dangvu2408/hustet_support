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
import SubsCourse from "./pages/SubscribedCourse";
import ManaCourse from "./pages/CourseManagementPage";
import ManaUser from "./pages/UserManagement";

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
                <Route path="/subscribed-course" element={<SubsCourse />} />
                <Route path="/manage-course" element={<ManaCourse />} />
                <Route path="/manage-user" element={<ManaUser />} />
                <Route path="/courses/:course_id" element={<CourseDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
