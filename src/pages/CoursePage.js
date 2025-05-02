import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/CourseGallery"
import "./MainPage.css";
import "./CoursePage.css";

export default function MainPage() {
    const negative = useNavigate();

    return (
        <div className="page-container">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}