import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileField from "../components/ProfileField";
import "./MainPage.css";
import "./AddCourse.css";
import "./ProfilePage.css";

export default function ProfilePage() {
    const negative = useNavigate();
    useEffect(() => {
                window.scrollTo(0, 0);
            }, []);
    return (
        <div className="page-container">
            <Header />
            <ProfileField/>
            <Footer />
        </div>
    );
}