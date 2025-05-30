import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CourseManagementComp from "../components/CourseManagementComp";
import "./MainPage.css";
import "./AddCourse.css";
import "./CourseManagementPage.css";

export default function CourseManagementPage() {
    const negative = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-container">
            <Header />
            <CourseManagementComp />
            <Footer />
        </div>
    );
}