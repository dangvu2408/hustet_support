import { colors } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CourseItemVerB from "./CourseItemVerB";
import Course1 from '../assets/images/dts_banner.png';
import Course2 from '../assets/images/dttt1_banner.png';
import Course3 from '../assets/images/dsa_banner.png';

function CourseGallery() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log(user);
    return (
        <main id="main">
            <div className="container_et">
                <div className="container_heading">
                    <a href="/" className="back_home">
                        <span className="subtitle_back">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            <span>Quay lại</span>
                        </span>
                    </a>
                </div>

                <div className="wrapper_container">
                    <h1 className="course_name_heading">Danh sách môn học</h1>

                    <div className="columns-listcourse">
                        <CourseItemVerB
                            course_id="ET3220"
                            course_name="Điện tử số"
                            english_name="Digital Electronics"
                            child_management="Khối Kỹ thuật"
                            managing_department="Bộ môn Điện tử"
                            weight="3"
                            description="Học phần về logic số, mạch số cơ bản."
                            price="299.000"
                            old_price="399.000"
                            thumbnail={Course1}
                            progress={80} />

                        <CourseItemVerB
                            course_id="ET3220"
                            course_name="Điện tử số"
                            english_name="Digital Electronics"
                            child_management="Khối Kỹ thuật"
                            managing_department="Bộ môn Điện tử"
                            weight="3"
                            description="Học phần về logic số, mạch số cơ bản."
                            price="299.000"
                            old_price="399.000"
                            thumbnail={Course2}
                            progress={80} />

                        <CourseItemVerB
                            course_id="ET3220"
                            course_name="Điện tử số"
                            english_name="Digital Electronics"
                            child_management="Khối Kỹ thuật"
                            managing_department="Bộ môn Điện tử"
                            weight="3"
                            description="Học phần về logic số, mạch số cơ bản."
                            price="299.000"
                            old_price="399.000"
                            thumbnail={Course3}
                            progress={80} />
                    </div>

                    {user && user.role === 1 && (
                        <div className="add_course_level">
                            <div className="add_course">
                                <a className="add_course_btn" target="_blank" onClick={() => window.location.href = "/add-course"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#003366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder-plus"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
                                    <span>Thêm môn học</span>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            
        </main>
    );
}

export default CourseGallery;