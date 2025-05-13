import React from "react";
import { useNavigate } from "react-router-dom";
import CourseItemVerB from "./CourseItemVerB";
import Course1 from '../assets/images/dts_banner.png';
import Course2 from '../assets/images/dttt1_banner.png';
import Course3 from '../assets/images/dsa_banner.png';

function CourseList() {
    const navigate = useNavigate();

    return (
        <div className="about-page">
            <div className="mui-style">
                <div className="toplist-title" onClick={() => window.location.href = "/courses"}>
                    <span>Danh sách môn học</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                </div>
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
            </div>
        </div>
    );
}

export default CourseList;
