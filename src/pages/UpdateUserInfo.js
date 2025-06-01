import { useNavigate } from "react-router-dom";
import React from 'react';

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UpdateField from "../components/UpdateUserInfoField";
import "./UpdateUserInfo.css";

export default function UpdateUserInfo() {
    const negative = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="page-container">
            <Header />
            <UpdateField />
            <Footer />
        </div>
    );
}