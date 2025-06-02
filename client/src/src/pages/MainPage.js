import { useNavigate } from "react-router-dom";
import React from 'react';

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import "./MainPage.css";

export default function MainPage() {
    const negative = useNavigate();
    useEffect(() => {
                window.scrollTo(0, 0);
            }, []);
    return (
        <div className="page-container">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}