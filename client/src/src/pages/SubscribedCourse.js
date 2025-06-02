import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import SubsCourseManagement from "../components/SubsCourseManagement";
import "./MainPage.css";
import "./AddCourse.css";
import "./SubscribedCourse.css";

export default function SubscribedCourse() {
    const negative = useNavigate();
    useEffect(() => {
                    window.scrollTo(0, 0);
                }, []);
    return (
        <div className="page-container">
            <Header />
            <SubsCourseManagement />
            <Footer />
        </div>
    );
}