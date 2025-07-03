import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import UserManagementComp from "../components/UserManagementComp";
import "./MainPage.css";
import "./AddCourse.css";
import "./UserManagement.css";

export default function UserManagement() {
    const negative = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-container">
            <Header />
            <UserManagementComp />
            <Footer />
        </div>
    );
}