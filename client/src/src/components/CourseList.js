import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseItemVerB from "./CourseItemVerB";
import Course1 from '../assets/images/dts_banner.png';
import Course2 from '../assets/images/dttt1_banner.png';
import Course3 from '../assets/images/dsa_banner.png';

function CourseList() {
    const navigate = useNavigate();

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
        <div className="about-page">
            <div className="mui-style">
                <div className="toplist-title" onClick={() => window.location.href = "/courses"}>
                    <span>Danh sách môn học</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                </div>
                <div className="columns-listcourse">
                    {courses.slice(0, 3).map(course => (
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
                            old_price="499.000"
                            thumbnail={course.thumbnail}
                            author={course.author}
                            progress="80"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseList;
