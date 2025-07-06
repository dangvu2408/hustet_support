import React from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";


export default function SuggestItem({text, course_id}) {
    const navigate = useNavigate();

    const [course, setCourse] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/get-courseinfo?course_id=${course_id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Không thể lấy dữ liệu khóa học");
                }
                return res.json();
            })
            .then(data => {
                setCourse(data); // course là state dùng để lưu 1 khóa học
            })
            .catch(err => {
                console.error("ERR-COURSE-DETAIL:", err);
            });
    }, []);

    const handleClick = () => {
        if (!course || !course.course_id) {
            console.warn("Course chưa load xong");
            return;
        }

        navigate(`/courses/${course.course_id}`, {
            state: {
                ...course
            }
        });
    };


    return (
        <div onClick={handleClick}>
            <li  className="suggest_item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                <div className="trending_oneline">{text}</div>
            </li>
        </div>
    );
}