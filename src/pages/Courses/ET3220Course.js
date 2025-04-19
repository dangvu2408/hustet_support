import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Content from "../../components/ET3220CourseMain"
import Footer from "../../components/Footer";
import "./ET3220Course.css";

export default function ET3220Course() {

    return (
        <div className="page-container">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}