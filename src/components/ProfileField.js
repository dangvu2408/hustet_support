
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/blank_avatar.jpg';
import Course1 from '../assets/images/dts_banner.png';
import Course2 from '../assets/images/dttt1_banner.png';
import Course3 from '../assets/images/dsa_banner.png';
import UserItem from "./UserListItem";
import CourseItemVerA from "./CourseItemVerA";
import CourseItemVerC from "./CourseItemVerC";
import Premium from './Premium';
import Plus from './Plus';
import Basic from './Basic';

function ProfileField() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/update-info`);
    }

    const [courses, setCourses] = useState([]);
    const [subCourses, setSubCourses] = useState([]);

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
        if (user && user.role === 1) {
            fetch("http://localhost:3001/users")
                .then(res => res.json())
                .then(data => {
                    setUsers(data);
                })
                .catch(err => {
                    console.error("ERR-5:", err);
                });
        }
    }, [user]);
      
    
    useEffect(() => {
        if (user?.username) {
            fetch(`http://localhost:3001/get-course-author?username=${encodeURIComponent(user.username)}`)
                .then(res => res.json())
                .then(data => setCourses(data))
                .catch(err => console.error("Lỗi khi load khóa học:", err));
        }
    }, [user]);

    useEffect(() => {
        if (user?.username) {
            fetch(`http://localhost:3001/get-course-subscriber?username=${encodeURIComponent(user.username)}`)
                .then(res => res.json())
                .then(data => {
                    console.log("DEBUG subCourses:", data);
                    setSubCourses(data);
                })

                .catch(err => console.error("Lỗi khi load khóa học:", err));
        }
    }, [user]);

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
                        <h1 class="course_name_heading">Thông tin tài khoản</h1>
                        {user && user.role === 1 ? ( <p className="admin_or_user" style={{marginTop: '15px', marginLeft: '10px'}}>ADMIN</p> ) : user && ( <p className="user_or_admin" style={{marginTop: '15px', marginLeft: '10px'}}>USER</p> )}
                    </div>
                    <div className="grid_layout_container">
                        <div className="grid_layout_left">
                            <div className="grid_card">
                                <div className="profile_field">
                                    <div className="avatar_field">
                                        <span className="avatar_span_field">
                                            <img className="main_avatar_img" src={user?.avatar ? user.avatar : Logo} width={'250px'} height={'250px'}></img>
                                        </span>
                                        <div className="user_status">
                                            <div className="user_status_context">
                                                <Plus/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="user_fullname_field">
                                        <span className="full_name_text">{user ? user.fullname : "Chưa đăng nhập"}</span>
                                        <span className="user_id_text">{user ? user.username : "Chưa đăng nhập"}</span>
                                    </div>

                                    <a className="update_data_info" onClick={handleClick}>Cập nhật thông tin cá nhân</a>
                                </div>
                            </div>
                        </div>
                        <div className="grid_layout_right">
                            <div>
                                <span className="main_a_title">Danh sách khóa học đã đăng ký</span>
                                <div className="list_subscribed_course">
                                    {subCourses.slice(0, 3).map(course => (
                                        <CourseItemVerC
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
                                            subtime={formatDateTimeCustom(course.registered_at)}
                                        />
                                    ))}

                                </div>
                                <div className="see_more_course">
                                    <div className="see_more">
                                        <span className="text_see_more">Xem thêm</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9457FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="main_a_title">Danh sách khóa học đã thêm</span>
                                <div className="list_subscribed_course">
                                    {courses.slice(0, 3).map(course => (
                                        <CourseItemVerA
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
                                <div className="see_more_course">
                                    <div className="see_more">
                                        <span className="text_see_more">Xem thêm</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9457FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </div>
                                </div>
                            </div>
                            
                            {user && user.role === 1 && (
                                <div>
                                    <span className="main_a_title">Danh sách người dùng</span>
                                    <div className="list_of_user">
                                        <table className="user_table">
                                            <thead className="user_headtable">
                                                <tr>
                                                    <th>Họ và tên</th>
                                                    <th>MSSV</th>
                                                    <th>Giới tính</th>
                                                    <th>Ngày sinh</th>
                                                    <th>Quyền</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody className="user_tbody">
                                                {users.map(u => (
                                                    <UserItem key={u.username} user={u} />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="see_more_course">
                                        <div className="see_more">
                                            <span className="text_see_more">Quản lý người dùng</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9457FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProfileField;