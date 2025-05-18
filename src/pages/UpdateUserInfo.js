import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UpdateField from "../components/UpdateUserInfoField";

export default function UpdateUserInfo() {
    const negative = useNavigate();

    return (
        <div className="page-container">
            <Header />
            <UpdateField />
            <Footer />
        </div>
    );
}