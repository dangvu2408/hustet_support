import { colors } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseItemVerB from "./CourseItemVerB";
import Course1 from '../assets/images/dts_banner.png';
import Course2 from '../assets/images/dttt1_banner.png';
import Course3 from '../assets/images/dsa_banner.png';

function CourseGallery() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/courses")
            .then(res => res.json())
            .then(data => {
                setCourses(data);
            })
            .catch(err => {
                console.error("ERR-2:", err);
            });
    }, []);


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

                    <div className="columns-listcourse full_list_gallery">
                        {courses.map(course => (
                            <CourseItemVerB
                                key={course.course_id}
                                course_id={course.course_id}
                                course_name={course.course_name}
                                english_name={course.english_name}
                                child_management={course.child_management}
                                managing_department={course.managing_department}
                                weight={course.weight}
                                description={course.description}
                                price={course.price}
                                old_price="49.000"
                                thumbnail={course.thumbnail}
                                author={course.author}
                                progress="80"
                            />
                        ))}
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