import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/blank_avatar.jpg';
import Course1 from '../assets/images/dts_banner.png';
import Course2 from '../assets/images/dttt1_banner.png';
import Course3 from '../assets/images/dsa_banner.png';
import UserItem from "./UserListItem";
import CourseItemVerA from "./CourseItemVerA";
import Premium from './Premium';
import Plus from './Plus';
import Basic from './Basic';

function UpdateUserInfoField() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);  // dòng gây lỗi nếu storedUser là undefined hoặc chuỗi sai định dạng
                setUser(parsedUser);
                console.log("User loaded:", parsedUser);
            } catch (error) {
                console.error("Lỗi parse JSON:", error);
            }
        }
    }, []);


    return(
        <main id="main">
            <div className="container_et">
                <div className="container_heading">
                    <a href="#" className="back_home" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                        <span className="subtitle_back">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            <span>Quay lại</span>
                        </span>
                    </a>
                </div>

                <div className="wrapper_container">
                    <div className="user_heading_title">
                        <h1 class="course_name_heading">Cập nhật thông tin cá nhân</h1>
                        {user && user.role === 1 ? ( <p className="admin_or_user" style={{marginTop: '15px', marginLeft: '10px'}}>ADMIN</p> ) : user && ( <p className="user_or_admin" style={{marginTop: '15px', marginLeft: '10px'}}>USER</p> )}
                    </div>
                </div>
            </div>
        </main>
    );

}

export default UpdateUserInfoField;