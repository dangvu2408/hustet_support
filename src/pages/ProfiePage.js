import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileField from "../components/ProfileField";
import "./MainPage.css";
import "./AddCourse.css";
import "./ProfilePage.css";

export default function AddCourse() {
    const negative = useNavigate();

    return (
        <div className="page-container">
            <Header />
            <ProfileField/>
            <Footer />
        </div>
    );
}