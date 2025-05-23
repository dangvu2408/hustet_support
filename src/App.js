import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css"; // Import file CSS
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import CoursePage from "./pages/CoursePage";
import AddCourse from "./pages/AddCourse";
import Profile from "./pages/ProfiePage";
import CourseDetails from "./pages/CourseDetails";
import Account from "./pages/UpdateUserInfo";

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage setUser={setUser} />} />
                <Route path="/" element={<MainPage user={user} />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/courses" element={<CoursePage user={user} />} />
                <Route path="/add-course" element={<AddCourse user={user} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/update-info" element={<Account user={user} />} />
                <Route path="/courses/:course_id" element={<CourseDetails user={user} />} />
            </Routes>
        </Router>
    );
}

export default App;
