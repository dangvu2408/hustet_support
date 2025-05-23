import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormAdder from "../components/AddCourseField";
import "./MainPage.css";
import "./AddCourse.css";

export default function AddCourse({user}) {
    const negative = useNavigate();

    return (
        <div className="page-container">
            <Header user={user} />
            <FormAdder />
            <Footer />
        </div>
    );
}