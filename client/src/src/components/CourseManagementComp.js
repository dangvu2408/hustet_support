import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseListItemVerB from "./CourseListItemVerB";

function CourseManagementComp() {
    const [user, setUser] = useState(null);
    const [coursesList, setCoursesList] = useState([]);
    const [courseCounts, setCourseCounts] = useState({}); // object lưu count cho từng course_id
    const [likeCounts, setLikeCounts] = useState({});

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

    useEffect(() => {
        if (user?.username) {
            fetch(`http://localhost:3001/get-course-author?username=${encodeURIComponent(user.username)}`)
                .then(res => res.json())
                .then(data => setCoursesList(data))
                .catch(err => console.error("Lỗi khi load khóa học:", err));
        }
    }, [user]);

    useEffect(() => {
        const fetchCounts = async () => {
            const counts = {};
            for (const course of coursesList) {
                try {
                    const res = await fetch(`http://localhost:3001/count-course-registrations?course_id=${encodeURIComponent(course.course_id)}`);
                    const data = await res.json();
                    counts[course.course_id] = data.count;
                } catch (err) {
                    console.error(`Lỗi khi lấy số lượng đăng ký cho course ${course.course_id}:`, err);
                    counts[course.course_id] = 0;
                }
            }
            setCourseCounts(counts);
        };

        if (coursesList.length > 0) {
            fetchCounts();
        }
    }, [coursesList]);

    useEffect(() => {
        const fetchCounts = async () => {
            const counts = {};
            for (const course of coursesList) {
                try {
                    const res = await fetch(`http://localhost:3001/count-course-like?course_id=${encodeURIComponent(course.course_id)}`);
                    const data = await res.json();
                    counts[course.course_id] = data.count;
                } catch (err) {
                    console.error(`Lỗi khi lấy số lượng đăng ký cho course ${course.course_id}:`, err);
                    counts[course.course_id] = 0;
                }
            }
            setLikeCounts(counts);
        };

        if (coursesList.length > 0) {
            fetchCounts();
        }
    }, [coursesList]);


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

                        {coursesList.map((course, index) => (
                            <CourseListItemVerB
                                key={course.course_id}
                                index={index}
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
                                counter={courseCounts[course.course_id] ?? 'Đang tải...'}
                                like={likeCounts[course.course_id] ?? 'Đang tải...'}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CourseManagementComp;