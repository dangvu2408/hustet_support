import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UpdateField from "../components/UpdateUserInfoField";
import "./UpdateUserInfo.css";

export default function UpdateUserInfo({user}) {
    const negative = useNavigate();

    return (
        <div className="page-container">
            <Header user={user} />
            <UpdateField />
            <Footer />
        </div>
    );
}