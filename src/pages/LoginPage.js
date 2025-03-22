import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    return(
        <div>
            <h1>Đây là trang đăng nhập</h1>
            <button onClick={() => navigate("/")}>Quay lại trang chủ</button>
        </div>
    );
}