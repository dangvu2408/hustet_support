import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import "./MainPage.css";

export default function MainPage() {
    const negative = useNavigate();

    return (
        <div className="page-container">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}