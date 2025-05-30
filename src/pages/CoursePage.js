import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/CourseGallery"
import "./MainPage.css";
import "./CoursePage.css";

export default function CoursePage() {
    const negative = useNavigate();
    useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    return (
        <div className="page-container">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}