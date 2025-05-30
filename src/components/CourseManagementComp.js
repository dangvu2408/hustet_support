import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseListItem from "./CourseListItemVerA";

function CourseManagementComp() {
    const [user, setUser] = useState(null);
    const [coursesList, setCoursesList] = useState([]);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);  // dòng gây lỗi nếu storedUser là undefined hoặc chuỗi sai định dạng
                setUser(parsedUser);
            } catch (error) {
                console.error("ERR-4:", error);
            }
        }
    }, []);

    const formatDateTimeCustom = (datetimeString) => {
        const date = new Date(datetimeString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}, ${hh}:${min}:${ss}`;
    };

    return (
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
                        <h1 class="course_name_heading">Quản lý khóa học</h1>
                    </div>

                    <div className="table_course_container">
                        <div className="table__header">
                            <div className="header_left">
                                <div className="course_counter_head">STT</div>
                                <div className="course_basic_info_head">Khóa học</div>
                            </div>
                            <div className="header_right">
                                <div className="ahead_right_item">Trạng thái</div>
                                <div className="ahead_right_item">Chế độ hiển thị</div>
                                <div className="ahead_right_item">Số người đăng ký</div>
                                <div className="ahead_right_item">Số lượt thích</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CourseManagementComp;